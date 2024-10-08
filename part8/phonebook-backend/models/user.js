const mongoose = require('mongoose')

const schema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        }
    ]
})

module.exports = mongoose.model('User', schema)