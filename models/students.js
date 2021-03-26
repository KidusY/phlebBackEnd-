const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
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
    SSN:{
        type: String,
    },
    phoneNumber:{
        type: String,
    },
    emergencyContact:{
        type:[],

    },

    streetAddress: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    }
    ,
    country: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false

    },
    dateOfSubmission:{
        type: String,
        required: false
    }

})

module.exports = mongoose.model('UsersSchema', usersSchema)