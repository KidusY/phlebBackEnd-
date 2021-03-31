const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userId:{
        type: String,        
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
  
     
        
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        
    },
    accountType:{
        type:String,
        required:true
    },
    profileImage: {
        type: String,
        required:false

    }

})

module.exports = mongoose.model('UsersSchema', usersSchema)