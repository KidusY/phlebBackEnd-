const express = require('express');
const router = express.Router();
const StudentDataSchema = require('../models/students');
const Users = require('../models/users')
const CommonServices = require('../services/commonServices');

const sendMail = require('../nodeMailer/nodMailer')


router.get('/', async (req, res) => {

    try {
        const students = await Students.find({});
        res.json(students)
    }
    catch (err) {
        res.json(err)
    }



})
router.get('/sendmail', async (req, res) => {

    sendMail('kidusyilma@gmail.com').then((confirmation) => res.json(confirmation)).catch(err => err.message)



})

router.post('/', async (req, res) => {
    const { name, email, password, address, SSN, phoneNumber, emergencyContact, profileImage, accountType } = req.body
    const { streetAddress, state, zipCode, city } = address;

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

                sendMail(email).then((emailConf) => {
                    if (!emailConf.accepted) {
                        res.status(404).json("Oops something went wrong. Please Check Email address")
                    }
                    res.json(newStudent);

                }).catch(err => res.status(500).json(err))


            }
            catch (err) {
                res.status(500).json(err)
            }

        }
        catch (err) {
            res.status(500).json("Error while creating a User")
        }


    })


})


router.patch('/address/:id', async (req, res) => {
    const { address } = req.body

    const id = req.params.id;
   

    try {
        const Student = await StudentDataSchema.find({ _id: id });

        if (Student.length === 0) {
            res.status(404).json({ errorMessage: "Student Does Not Exist" })
        }


        StudentDataSchema.updateOne({ _id: id }, { $set: address }).then(() => res.json("update completed"));


    }
    catch (err) {
        res.status(500).json(err);
    }




})


module.exports = router;