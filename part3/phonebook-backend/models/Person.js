//import mongoose
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.set('strictQuery', false)

//Connect to mongodb
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error =>{
        console.log('error connecting to MongoDB: ', error.message)
    })

// create schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: '3',
        required:true
    },
    number: String
}) 

// Refactor schema to json
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//export model
module.exports = mongoose.model('Person', personSchema)