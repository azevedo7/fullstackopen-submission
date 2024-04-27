const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

// env files
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number
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