const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    phone: {
        type: String,
        minlength: 5
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
        minlength: 3
    }
})

module.exports = mongoose.model('Person', schema)