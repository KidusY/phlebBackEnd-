const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const CommonServices = require('../services/commonServices');
const StudentsSchema = require('../models/students');
router.post('/', async (req, res) => {
    const { email, password } = req.body


    try {
        const users = await Users.find({ "email": email });

        if (users.length > 0) {          
            CommonServices.comparePasswords(password, users[0].password)
                .then( (compareMatch) => {

                    if (!compareMatch) {
                        res.status(401).json({ errorMessage: "Incorrect User name or password" })
                    }

                    return {
                        token: CommonServices.createJwt(users[0].email, { user_id: users[0]._id }),
                        userId: users[0]._id,
                        email: users[0].email,
                        name: users[0].name,             

                    }
                   

                })
                .then( async(users)=>{
                    const usersInfo = await StudentsSchema.find({ "userId": users.userId });
                   
                    const alluserInfo = {...users,usersInfo}

                    res.status(201).json(alluserInfo);
                })
                .catch(err => console.log(err))




        }
        else {
            res.status(401).json({ errorMessage: "Incorrect User name or password" })
        }

    }
    catch (err) {
        console.log(err)
    }




})


module.exports = router