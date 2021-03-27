const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const CommonServices = require('../services/commonServices');
router.post('/',async(req,res)=>{
    const {email,password} = req.body
  

    try {
        const users = await Users.find({"email":email});
       
        if(users.length > 0){
            console.log(password, users.password);
             CommonServices.comparePasswords(password,users[0].password)
             .then(compareMatch=>{
                 
                 if(!compareMatch){
                     res.status(400).json({
                         error:"Incorrect user name or password"
                     })
                 }
                
            res.status(201).json( {
             token:CommonServices.createJwt(users[0].email,{user_id:users[0]._id}),
                email: users[0].email,
                name: users[0].name
            
            })

             })
             .catch(err=>console.log(err))



            
        }
        else{
            res.status(401).json({errorMessage:"Incorrect User name or password"})
        }
        
    }
    catch (err) {
        console.log(err)
    }




})


module.exports= router