const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true, 
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required:false

    }

})

module.exports = mongoose.model('UsersSchema', usersSchema)