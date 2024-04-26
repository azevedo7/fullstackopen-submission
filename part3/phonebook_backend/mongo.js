const mongoose = require('mongoose')

const argvLength = process.argv.length

if(argvLength < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.bkmlhag.mongodb.net/PhoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Phone = mongoose.model('Phone', phoneSchema)



if(argvLength == 3){
    Phone
        .find({})
        .then(result => {
        console.log('phonebook: ')
        result.forEach(phone => {
            console.log(`${phone.name} ${phone.number}`)
        })
        mongoose.connection.close()
    })
} else if(argvLength == 5){
    const phone = new Phone({
        name: process.argv[3],
        number: process.argv[4],
    })
    phone.save().then(result => {
        console.log(`Added ${phone.name} number ${phone.number}`)
        mongoose.connection.close()
    })
}