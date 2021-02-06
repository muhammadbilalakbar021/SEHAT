// Node Packages
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");
const morgan = require("morgan");
const express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(morgan("dev"))

// const patients = require('./routes/patients')
const home = require("./routes/home");

// Defing that json will be used for CRUD operations
app.use(express.json({ limit: "50mb" })); // req.body
app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
); // data: key
app.use(express.static("public")); // for custom images/ css

require("./startup/patient_routes")(app);
require("./startup/doctor_routes")(app);
require("./startup/userInformation_routes")(app);
// app.use('/patient', patients)
app.use("/", home);

// Configuration
// console.log('Application Name ' + config.get('name'))
// console.log('Application Main File ' + config.get('main'))

// If port 3000 is free allocate it, else find the availbale port and allocate.
const port = process.env.PORT || 3000;
app.listen(port, () =>
    // Server will run on the allocated port
    console.log(`Server Listening on port ${port}`)
);

mongoose
    .connect(config.get("db"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Mongoose"))
    .catch(() => console.log("Could not connected to mongoDB.."));