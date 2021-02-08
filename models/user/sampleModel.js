const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const mongooseSequesnce = require("mongoose-sequence");
const AutoIncrement = mongooseSequesnce(mongoose);
const locationSchema = require("./schemas/locationSchema");
const Google = require("./Google");
const FleetType = require("./fleet_type");
const _ = require("lodash");
const BookingHistory = require("./booking_history");
const { informRequestLapsed } = require("../bin/ws");
const moment = require("moment");
const Setting = require("./setting");
const Company = require("./company");
const { binUpdated, rideRequested, rideAccepted } = require("../bin/ws");
const offerSchema = new mongoose.Schema({
  offer: Number,
  created_at: Date,
  updated_at: Date,
  company_id: String,
});
const getQuotation = require("./quotation_calculations/getQuotation");
const bookingDistances = require("./calculations/bookingDistances");
const { reject } = require("lodash");
const Invoice = require("./invoice");
// const { binUpdated } = require("../bin/ws");
const notifications = require("../notifications");
const modelSchema = new mongoose.Schema(
  {
    reference: Number,
    from: {},
    to: {},
    from_desc: String,
    from_place_id: String,
    to_desc: String,
    to_place_id: String,
    startTime: { type: Date, default: Date.now() },
    startTimeReturn: Date,
    endTime: String,
    from_location: locationSchema,
    to_location: locationSchema,
    company_id: String,
    directions: {},
    staticmap: String,
    distance: Number,
    distanceText: String,
    duration: Number,
    durationText: String,
    carSize: String,
    quotations: [],
    quotation_retrieved_at: { type: Date, default: Date.now() },
    toPostCode: String,
    fromPostCode: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    quotation: {},
    status: { type: String, default: "quoted" },
    booked_at: Date,
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    notes: [],
    user_id: String,
    accepted_at: Date,
    bid_started: Date,
    bid_started_price: Number,
    bid_ended_price: Number,
    bid_ended: Date,
    bid_increases: [{}],
    bids: [offerSchema],
    bid_max_price: Number,
    luggage: {},
    oneWay: Boolean,
    passangers: Number,
    passanger: {},
    vehicle_types: [],
    via: [],
    viareturn: [],
    distances: [],
    waypoints: [],
    payment: {},
    isPaid: { type: Boolean, default: false },
    isRated: { type: Boolean, default: false },
    rating: { type: mongoose.Schema.Types.ObjectId, ref: "Rating" },
    forwardDistance: Number,
    returnDistance: Number,
    isConfirmed: Boolean,
    paymentMethod: { type: String, default: "card" },
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
    cancelReason: { type: String, default: "nocar" },
  },
  { timestamps: true }
);
modelSchema.plugin(AutoIncrement, { inc_field: "reference" });

modelSchema.statics.formatBooking = async function (data, record) {
  let promisesToWait = []; // add all promises here to wait at end
  record.from_desc = data.from_desc;
  record.from_place_id = data.from_place_id;
  record.to_desc = data.to_desc;
  record.to_place_id = data.to_place_id;
  record.startTime = data.startTime;
  record.startTimeReturn = data.startTimeReturn;
  record.oneWay = data.oneWay;
  record.luggage = data.luggage;
  record.passangers = data.passangers;
  let vtPromise = Company.findVehicleTypeByLuggageAndPassangers(
    record.passangers,
    record.luggage
  );
  vtPromise.then((vt) => {
    record.vehicle_types = vt;
  });
  promisesToWait.push(vtPromise);
  // record.vehicle_types = await Company.findVehicleTypeByLuggageAndPassangers();
  record.via = data.via ? data.via : [];
  record.viareturn = data.viareturn ? data.viareturn : [];
  record.from = {
    place_id: data.from_place_id,
    place_desc: data.from_desc,
  };
  record.to = {
    place_id: data.to_place_id,
    place_desc: data.to_desc,
  };
  let fromP = Google.getGeometryAndPostCodeFromPlace_id(
    record.from.place_id
  ).then((d) => {
    record.from.postcode = d.postcode;
    record.from.location = d.geometry.location;
  });
  promisesToWait.push(fromP);
  let toP = Google.getGeometryAndPostCodeFromPlace_id(record.to.place_id).then(
    (d) => {
      record.to.postcode = d.postcode;
      record.to.location = d.geometry.location;
      // record.to.details = d;
    }
  );
  promisesToWait.push(fromP);
  promisesToWait.push(toP);

  for (let i = 0; i < record.via.length; i++) {
    let vp = Google.getGeometryAndPostCodeFromPlace_id(
      record.via[i].place_id
    ).then((d) => {
      record.via[i].postcode = d.postcode;
      record.via[i].location = d.geometry.location;
    });
    promisesToWait.push(vp);
  }
  for (let i = 0; i < record.viareturn.length; i++) {
    let vp = Google.getGeometryAndPostCodeFromPlace_id(
      record.viareturn[i].place_id
    ).then((d) => {
      record.viareturn[i].postcode = d.postcode;
      record.viareturn[i].location = d.geometry.location;
    });
    promisesToWait.push(vp);
  }
  await Promise.all(promisesToWait);
  promisesToWait = [];
  record.waypoints = [record.from, ...record.via, record.to];
  if (!record.oneWay)
    record.waypoints = [...record.waypoints, ...record.viareturn, record.from];
  let directionPromise = bookingDistances(record).then(async (d) => {
    record.directions = d;
    // await Promise.all([fromP, toP]);
    record.staticmap = await Google.staticMapFromDirections(
      d,
      record.waypoints
    );
    record.distance = d.routes[0].legs
      .map((l) => l.distance.value)
      .reduce((total, num) => total + num);
    record.forwardDistance = d.routes[0].legs
      .slice(0, record.via.length + 1)
      .map((l) => l.distance.value)
      .reduce((total, num) => total + num);

    record.returnDistance = record.distance - record.forwardDistance;
    record.distancekm = record.distance / 1000;
    record.durationText = `${Number(record.distance / 1000).toFixed(2)} km`;
    record.duration = d.routes[0].legs
      .map((l) => l.duration.value)
      .reduce((total, num) => total + num);
    record.durationText = moment
      .utc(record.duration * 1000)
      .format("HH [hours] [and] mm [minutes]");
  });
  await Promise.all([directionPromise]);

  return record;
};
modelSchema.methods.getQuotationByCompany = function (company) {
  let booking = this;
  return getQuotation(company, booking);
};
modelSchema.methods.getInvoice = async function () {
  let invoice = await Invoice.findOne({ company: this.company });
  if (!invoice) {
    invoice = new Invoice();
    invoice.company = this.company;
    await invoice.save();
  }
  return invoice;
};

modelSchema.methods.calculateQuotations = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let companies = await Company.getCompaniesForBooking(this);
      // console.clear();
      // console.log("Companies Found: " + companies.length);
      let quotes = [];
      let quotePromises = [];
      for (let i = 0; i < companies.length; i++) {
        let p = getQuotation(companies[i], this);
        p.then((qs) => {
          quotes = [...quotes, ...qs];
        }).catch((err) => {
          console.log(
            companies[i].details
              ? companies[i].details.name
              : companies[i]._id + " Got Error"
          );
        });
        quotePromises.push(p);
      }
      await Promise.all(quotePromises);
      for (let k = 0; k < quotes.length; k++) {
        quotes[k].index = k;
      }
      resolve(quotes);
    } catch (err) {
      console.log(err);
      resolve([]);
    }
  });
};
modelSchema.statics.getRejectedBookings = async function (data, record) {
  let Booking = this.model("Booking");
  let bookings = await Booking.find({ status: "rejected" }).sort({
    startTime: -1,
  });
  return bookings;
};
modelSchema.statics.validate = function (record) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  }).options({ abortEarly: false });
  return schema.validate(record);
};
modelSchema.methods.getQuotationsSummary = async function () {
  let quotations = this.quotations;
  let companies = await Company.find().lean();
  let fleetTypes = await FleetType.find().lean();
  for (let k = 0; k < quotations.length; k++) {
    let company = companies.find(
      (co) => co._id.toString() == quotations[k].company.toString()
    );
    quotations[k].company = { details: { name: company.details.name } };
    quotations[k].fleet_type = fleetTypes.find(
      (ft) => ft._id.toString() == quotations[k].vehicle_type
    );
  }
  quotations.sort((a, b) => (a.totalPrice > b.totalPrice ? 1 : -1));
  return quotations;
};
modelSchema.methods.setQuotation = async function (quotation) {
  this.quotation = quotation;
  this.status = "created";
  this.company = quotation.company;
  this.booked_at = Date.now();
  await this.save();
  await BookingHistory.create(
    "created",
    this._id,
    this.company,
    "Booking quotation is created"
  );
};
modelSchema.methods.reject = async function () {
  // this.status = "rejected";
  let startTime = moment(this.startTime);

  let timeToBooking = startTime.diff(moment(), "hours", true);
  let globalCutOffTime = await Setting.getCutOffTime();
  if (timeToBooking < globalCutOffTime) {
    this.status = "urgent";
    await BookingHistory.create("rejected_urgent", this._id, this.company);
  } else {
    this.status = "rejected";
    await BookingHistory.create("rejected", this._id, this.company);
    binUpdated();
    let history = await BookingHistory.create(
      "bid_started",
      this._id,
      this.company
    );
    this.bid_started = history.createdAt;
    this.bid_ended = moment(this.startTime).subtract(
      Number(await Setting.getCutOffTime()),
      "hours"
    );
    this.bid_started_price = this.quotation.price;
    this.bid_max_price = this.quotation.price;
    this.bid_ended_price = this.quotation.price + this.quotation.ourCut;
  }

  await this.save();
};
modelSchema.methods.accept = async function () {
  this.status = "booked";
  this.accepted_at = new Date();
  await this.save();
  rideAccepted(this.company);
  notifications.rideAcceptedEmail(this);
  await BookingHistory.create(
    "accept",
    this._id,
    this.company,
    "A New Ride is accpeted"
  );
};
modelSchema.methods.cancel = async function (reason) {
  this.status = "canceled";
  // this.isConfirmed = false;
  this.cancelReason = reason;
  await this.save();
  await BookingHistory.create(
    "canceled",
    this._id,
    this.company,
    "Booking Is Canceled"
  );
  rideRequested(this.company);
};
modelSchema.methods.getCompany = async function () {
  let c = await Company.findById(this.company);
  return c;
};
modelSchema.methods.urgent = async function () {
  this.status = "urgent";

  await this.save();
  await BookingHistory.create(
    "urgent",
    this._id,
    this.company,
    "Booking Need Urgent Attention"
  );
};
// comment is a string
//to is a string from one of following
// 1. customer
// 2. driver
// 3. company
modelSchema.methods.addNote = async function (comment, to) {
  let note = {
    note: comment,
    at: Date.now(),
    to,
  };
  this.notes = [...this.notes, note];
  await this.save();
};
modelSchema.methods.confirm = async function () {
  let minConfirmationTime = await Setting.getMinConfirmTime();
  let cutOffTime = await Setting.getCutOffTime();
  if (
    moment(this.startTime).diff(moment(), "hours", true) < minConfirmationTime
  ) {
    this.status = "confirm_rejected";
    await this.save();
    BookingHistory.confirm_reject(this._id);
    throw (
      "We cannot confirm the booking. We need atleast " +
      minConfirmationTime +
      " hours to get ourself prepared"
    );
  }
  this.accepted_at = new Date();
  this.isConfirmed = true;
  await this.save();
  await BookingHistory.confirm(this._id);
  if (moment(this.startTime).diff(moment(), "hours", true) < cutOffTime) {
    await this.urgent();
  } else {
    await this.requestBooking();
  }
  this.sendConfirmationEmail();
};
modelSchema.methods.sendConfirmationEmail = function () {
  notifications.sendConfirmationEmail(this);
};
modelSchema.methods.setInvoiceEmail = function () {
  notifications.setInvoiceEmail(this);
};
modelSchema.methods.requestBooking = async function () {
  this.status = "requested";
  this.accepted_at = new Date();
  await this.save();
  await BookingHistory.create(
    "requested",
    this._id,
    this.company,
    "Booking is being requested"
  );
  rideRequested(this.company);
};
modelSchema.methods.cancelOffer = async function (company_id) {
  let index = [...this.bids].findIndex((b) => {
    return b.company_id == company_id;
  });
  console.log([...this.bids].splice(0, 1));
  console.log(company_id);
  console.log(index);
  this.bids = [...this.bids].splice(0, 1);

  await this.save();
  console.log(this.bids);
};
modelSchema.methods.offer = async function (offer, company_id) {
  if (!this.bids) this.bids = [];
  // console.log(this.bids);
  let index = this.bids.findIndex((b) => b.company_id == company_id);
  if (index >= 0) {
    let old = [...this.bids];
    old[index].offer = offer;
    old[index].updated_at = new Date();
    this.bids = old;
    // console.log(old);
  } else
    this.bids.push({
      offer,
      created_at: new Date(),
      updated_at: null,
      company_id: company_id,
    });
  // console.log(this.bids);
  await this.save();
  // console.log("this.bids");
  // console.log(this.bids);
};
modelSchema.methods.lapseRequest = async function () {
  this.status = "urgent";
  this.bid_started_price = this.quotation.price;
  this.bid_max_price = this.quotation.price;
  this.bid_ended_price = this.quotation.price + this.quotation.ourCut;
  await this.save();
  await BookingHistory.create("request_lapsed", this._id, this.company);
  informRequestLapsed(this);
};
modelSchema.methods.increaseBidPrice = async function () {
  const percentage = await Setting.getBidIncreasePercentage();
  if (!this.bid_max_price) this.bid_max_price = this.quotation.price;
  let maxBidAmount =
    this.bid_max_price + (this.quotation.price * percentage) / 100;
  if (maxBidAmount < this.quotation.price + this.quotation.ourCut) {
    let history = await BookingHistory.create(
      "bid_increased",
      this._id,
      this.company
    );
    history.bid_price_from = this.bid_max_price;
    history.bid_price_to = maxBidAmount;
    this.bid_max_price = maxBidAmount;
    await this.save();
    await history.save();
    binUpdated();
  }
};
modelSchema.methods.expireBidding = async function () {
  this.status = "urgent";
  await BookingHistory.create("bidding_expired", this._id, this.company);
  await this.save();
  binUpdated();
};
modelSchema.methods.driverNoShow = async function () {
  this.status = "driver-no-show";
  await this.save();
  notifications.driverNoShowEmail(this);
  await BookingHistory.create(
    "driver-no-show",
    this._id,
    this.company,
    "Driver Did Not Show for a ride"
  );
};
modelSchema.methods.customerNoShow = async function () {
  this.status = "customer-no-show";
  await this.save();
  notifications.customerNoShowEmail(this);
  await BookingHistory.create(
    "customer-no-show",
    this._id,
    this.company,
    "Customer Did Not Show for a ride"
  );
};
modelSchema.methods.superAdminCreated = async function () {
  this.status = "super-admin-created";
  await BookingHistory.create(
    "super-admin-created",
    this._id,
    this.company,
    "Booking Saved By Super Admin"
  );
  await this.save();
};
const Model = mongoose.model("Booking", modelSchema);
module.exports = Model;
