const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

// env files
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: [
            {
                validator: function(v) {
                    return /\d{2}-\d{7}/.test(v);
                },
                message: 'Phone number must folow the format: 09-1234556 or 040-22334455'
            },
            {
                validator: function(v) {
                    return /\d{3}-\d{8}/.test(v)
                },
                message: 'Phone number must folow the format: 09-1234556 or 040-22334455' 
            }
        ]
    }
})

// Clear up data
phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phone', phoneSchema)