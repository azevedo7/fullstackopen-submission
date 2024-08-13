const mongoose = require('mongoose')

// check for arguments
if (process.env.lenght < 5) {
    console.log('Usage: node monngo.js <password> <name> <number>')
}

//get password
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.bkmlhag.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

// connect to mongodb
mongoose.connect(url)

// create schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// create model (works like a class constructor) 
const Person = mongoose.model('Person', personSchema)

// get data from envs
const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
    name: name,
    number: number
})

// person.save() returns a promisse
person.save()

// display every entry of phonebook
Person
    .find({})
    .then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })