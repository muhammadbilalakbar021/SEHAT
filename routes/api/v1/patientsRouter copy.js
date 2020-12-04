const express = require('express');
const router = express.Router();
const Joi = require('joi')

// Hard core created list for testing purpose
patients = [
    { id: 1, name: 'Yasir' },
    { id: 2, name: 'Bilal' },
    { id: 3, name: 'FAhad' },
    { id: 4, name: 'Sajjad' },
    { id: 5, name: 'Ahmed' },
]
router.get("/:page?/:perPage?", async(req, res) => {
    const page = req.params.page ? Number(req.params.page) : 1;
    const perPage = req.params.perPage ? Number(req.params.perPage) : 1;
    //Bad Way
    //const patients = await Patient.find().limit(perPage).skip((page - 1) * perPage);

    //Good Way
    const patients = await Patient.getPage(page, perPage);
    res.send(patients);
});

// Post request for adding paatient
router.post('/', (req, res) => {

    //  Validating
    const { error } = validatePatient(req.body);
    // If any error, return 400 - Bad request
    if (error) {
        res.status(400).send(result.error.details[0].message)
    }

    // Add patient
    const patient = {
        id: patients.length + 1,
        name: req.body.name
    }
    patients.push(patient)

    // Return Patient list
    res.send(patients)
})


// Post request for adding paatient with validation without Node Package Module
router.post('/add-with-Detail', (req, res) => {
    if (!req.body.name || req.body.name.length <= 3 ||
        !req.body.id || parseInt(req.body.name.id) <= 0) {
        res.status(404).send('Name and Id i required')
        return;
    }

    // Add patient
    const patient = {
        id: patients.length + 1,
        name: req.body.name
    }
    patients.push(patient)

    // Return Patient list
    res.send(patients)
})


// Get request for returning all patient's list
router.get('/', (req, res) => {
    res.send(patients);
})

// Get request for returning specific patient
router.get('/patient/:id', (req, res) => {

    // Validating if given user is in our List
    const patient = patients.find(p => p.id === parseInt(req.params.id));
    // If not existing, return 404
    if (!patient) return res.status(404).send('No patient with the given id in the record');
    // If Patient exist, return patient record
    res.send(patient)

})

// Put reuest for updating Patient
router.put('/:id', (req, res) => {

    // Look up the course
    const patient = patients.find(p => p.id === parseInt(req.params.id));
    // If not existing, return 404
    if (!patient) return res.status(404).send('No patient with the given id in the record')

    //  Validating
    const { error } = validatePatient(req.body)

    // If any error, return 400 - Bad request
    if (error) return res.status(400).send(error.details[0].message)

    // Update course
    // Return the updated course
    patient.name = req.body.name;
    res.send(patient)

})

// Delete request for deleting record
router.delete('/:id', (req, res) => {

    // Look up the course
    const patient = patients.find(p => p.id === parseInt(req.params.id));
    // If not existing, return 404
    if (!patient) return res.status(404).send('No patient with the given id in the record')

    // Delete course
    // Return the updated course
    const patientToDelete = patients.find(patient);
    patients.splice(patientToDelete, 1)
    res.send(patient)

})

function validatePatient(patient) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    // Returniing the resuslt
    return schema.validate(patient);
}

module.exports = router