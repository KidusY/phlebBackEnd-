const mongoose = require('mongoose');

const StudentDataSchema = new mongoose.Schema({
    studentId: {
        type: String,
        
    },
    userId:{
        type:String,
       // require:true
    }, 
    email:{
        type:String
    }  ,
   
    SSN:{
        type: String,
       
    },
    phoneNumber:{
        type: String,
    },
    emergencyContact:{
        type:[],

    },
    courses:{
        type:[]
    },

    streetAddress: {
        type: String,
       // required: true
    },
    state: {
        type: String,
       // required: true
    },
    zipCode: {
        type: String,
        //required: true
    }
    ,
    city: {
        type: String,
        //required: true
    },
    profileImage: {
        type: String,
       // required: false

    },
    dateOfSubmission:{
        type: String,
        //required: true
    }

})

module.exports = mongoose.model('StudentSchema', StudentDataSchema)