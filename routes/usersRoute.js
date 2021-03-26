const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const CommonServices = require('../services/commonServices')
router.get('/', async (req, res) => {

    try {
        const users = await Users.find({});
        res.json(users)
    }
    catch (err) {
        res.json(err)
    }


    res.send();
})

router.post('/', (req, res) => {
    const { name, email, password, profileImage } = req.body
    let user;
    //creates a user 
    CommonServices.hashPassword(password).then(async (hashedPassword) => {
        user = new Users({
            name: name,
            email: email,
            password: hashedPassword,
            profileImage: profileImage
        })

        try {
            const newUser = await user.save();
            res.json(newUser)
        }
        catch (err) {
            res.json(err)
        }


    })








})


module.exports = router;