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
        res.status(500).json(err);
    }



})

router.post('/', async(req, res) => {
    const { name, email, password,accountType, profileImage } = req.body
    let user;
    for (const field of ['name', 'email', 'password']) {
        if (!req.body[field])
            return res.status(400).json({
                error: `Missing '${field}' in request body`
            });

    }


    try{
        const user = await Users.find({email:email});
        if(user.length > 0){
            res.status(409).json({errorMessage:"Email already Exists"})
        }
    }
    catch(err){
      //  res.status(500).json(err);
    }


    //creates a user 
    CommonServices.hashPassword(password).then(async (hashedPassword) => {
        user = new Users({
            name: name,
            email: email,
            password: hashedPassword,
            accountType
            profileImage: profileImage
        })

        try {
            const newUser = await user.save();
            res.json(newUser)
        }
        catch (err) {
            res.status(500).json(err)
        }


    })








})


module.exports = router;
