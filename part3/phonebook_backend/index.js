// Setup express
require('dotenv').config()
const express = require('express')
const app = express()
const Phone = require('./models/phone')

const morgan = require('morgan')
const cors = require('cors')
app.use(cors());
app.use(express.static('dist'))

morgan.token('content', (req, res) =>
req.method === 'POST' 
? JSON.stringify(req.body)
: null)

app.use(express.json())
//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    Phone.find({}).then(person => {
        res.json(person)
    })
})

app.get('/api/persons/:id', (req,res, next) => {
    Phone.findById(req.params.id)
        .then(person => {
            res.json(person)
        })
        .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res) => {
    Phone.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

app.post('/api/persons/', (req, res) => {
    const body = req.body

    if(body.name === undefined || body.number === undefined) {
        return res.status(400).json({
            error: 'content missing'     
        })
    }
    // if(persons.find(p => p.name.toLowerCase() === body.name.toLowerCase()) != null){
    //     return res.status(409).json({
    //         error:'name already exists'
    //     })
    // }

    const phone = new Phone({
        name: body.name,
        number: body.number,
    })

    phone.save().then(savedPerson => {
        res.json(savedPerson)
    })    
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Phone.findByIdAndUpdate(req.params.id, person, { new: true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(err => next(err))
})


app.get('/info', (req, res) => {
    const date = new Date()
    const count = persons.length
    res.write(`<p>Phonebook has info for ${count} people</p>`)    
    res.write(`<p>${date.toString()}</p>`)
    res.end()
})

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    return res.status(400).send({ error: error.name })
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)