var mongoose = require('mongoose');

// connection to database
mongoose.connect('mongodb://localhost/studentdb');
var db = mongoose.connection;

// Student Schema
var studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String
    },

    mobile:{
        type: String
    },
    dob: {
        type: Date,
        default: Date.now
    },
    school: {
        type: String
    },
    department:{
        type: String
    },
    course: {
        type: String
    },
    nationality:{
        type: String
    },
    state: {
        type: String
    }
    
}); 

module.exports = mongoose.model('Student', studentSchema);