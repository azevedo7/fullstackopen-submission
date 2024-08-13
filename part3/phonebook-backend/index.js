require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/Person')
morgan.token('body', function(req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorMiddleware = (error, req, res, next) => {
    console.log(error.message)

    res.status(404).end()
}

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(phones => {
            res.json(phones)
        })
})

//3.2
app.get('/info', (req,res) => {
    const numberPeople = persons.length
    const date = Date()
    res.send(`<p>Phonebook has info for ${numberPeople} people</p>
        <p>${date.toString()}</p>`)
})


//3.3 and 3.18
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(result => {
            res.json(result)
        })
        .catch(error => next(error))
})

//3.4 and 3.15
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    // name is missing
    if(!body.name){
        return res.status(400).json({
            error: 'name missing'
        })
    }
    // phone is missing
    if(!body.number){
        return res.status(400).json({
            error: 'phone missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(data => {
            res.json(data)
        })
})

// 3.17
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const newPerson = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, newPerson, { new: true } )
        .then(response => {
            res.status(200).end()
        })
        .catch(error => next(error))
})

app.use(errorMiddleware)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})