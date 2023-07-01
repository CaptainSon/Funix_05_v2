const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new mongoose.Schema({

    address: {
        type: String,
        required: true,
        default: '0x0000000000000000000000000000000000000000'
    },

    fullName : {
        type: String, 
        default: 'name_default'
    },

    email : {
        type: String, 
        default: 'email@gmail.com'
    },

    numberOfJoinedSession: {
        type: Number,
        default: 0,
    },

    deviation: {
        type: Number,
        default: 0,
    },
}) 

const User = mongoose.model('User', userSchema);
module.exports = User;