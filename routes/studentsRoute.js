const express = require('express');
const router = express.Router();
const Students = require('../models/students');
const CommonServices = require('../services/commonServices');

router.get('/', async (req, res) => {

    try {
        const students = await Students.find({});
        res.json(students)
    }
    catch (err) {
        res.json(err)
    }


    
})

router.post('/', async(req, res) => {
    const { name, email, address, SSN, phoneNumber, emergencyContact, profileImage } = req.body
    const { streetAddress, state, zipCode, country } = address;
    let student;
    //creates a students 
    
    student = new Students({
        name,
        email,
        SSN,
        phoneNumber,
        emergencyContact,
        streetAddress,
        state,
        zipCode,
        country,
        dateOfSubmission: new Date().toDateString(),
        profileImage,

    })

    try {
        const newStudent = await student.save();
        res.json(newStudent)
    }
    catch (err) {
        res.json(err)
    }











})


module.exports = router;