const express = require('express');
const router = express.Router();
const StudentDataSchema = require('../models/students');
const Users = require('../models/users')
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

router.post('/', async (req, res) => {
    const { name, email, password, address, SSN, phoneNumber, emergencyContact, profileImage, accountType } = req.body
    const { streetAddress, state, zipCode, city } = address;
    let student;
    //creates a students 

    for (const field of ['name', 'email', 'password', 'phoneNumber']) {
        if (!req.body[field])
            return res.status(400).json({
                error: `Missing '${field}' in request body`
            });

    }

    try {
        const user = await Users.find({ email: email });
        if (user.length > 0) {
            res.status(409).json({ errorMessage: "Email already Exists" })
        }
    }
    catch (err) {
        res.status(500).json(err);
    }


    CommonServices.hashPassword(password).then(async (hashedPassword) => {
        let user = new Users({
            name: name,
            email: email,
            password: hashedPassword,
            accountType,
            profileImage: profileImage
        })

        try {
            let newUser = await user.save();
            console.log(newUser._id);

            let student = new StudentDataSchema({
                userId: newUser._id,
                SSN, 
                email,               
                phoneNumber,
                emergencyContact,
                streetAddress,
                state,
                zipCode,
                city,
                dateOfSubmission: new Date().toDateString(),
                profileImage,

            })

            try {
                const newStudent = await student.save();
                res.json(newStudent)
            }
            catch (err) {
                res.status(500).json(err)
            }

        }
        catch (err) {
            res.json("error while creating a user")
        }


    })
















})


module.exports = router;