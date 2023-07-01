const mongoose = require('mongoose');

const MainSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },

    addressAdmin: {
        type: String,
        required: true,
    },
})

const Main = mongoose.model('Main',MainSchema);
module.exports = Main;