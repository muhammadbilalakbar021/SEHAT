// Node Packages
const config = require('config');
const Joi = require('joi')
const express = require('express');
const app = express();
// const patients = require('./routes/patients')
const home = require('./routes/home')

// Defing that json will be used for CRUD operations
app.use(express.json()) // req.body
app.use(express.urlencoded({ extended: true })) // data: key
app.use(express.static('public')) // for custom images/ css

require("./startup/api_routes")(app);
// app.use('/patient', patients)
app.use('/', home)

// Configuration
// console.log('Application Name ' + config.get('name'))
// console.log('Application Main File ' + config.get('main'))

// If port 3000 is free allocate it, else find the availbale port and allocate.
const port = process.env.PORT || 3000
app.listen(port, () =>
    // Server will run on the allocated port
    console.log(`Server Listening on port ${port}`));