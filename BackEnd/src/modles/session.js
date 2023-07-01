
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const SessionSchema = new mongoose.Schema({

    addressSession: {
        type: String,
        required:true,
    },

    productName: {
        type: String,
        default: 'name_default',
    },

    productDescription: {
        type: String,
        default: 'descrtiption_default',
    },

    productImage: {
        type: String,
        default: 'no_img',
    },
    
    proposePrice: {
        type: Number,
        default: 0,
    },

    finalPrice: {
        type: Number,
        default: 0,
    },

    state: {
        type: Number,
        default: 0,
    },

    
})

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;