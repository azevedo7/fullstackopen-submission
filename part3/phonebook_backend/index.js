// Setup express
const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')
app.use(cors);


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
    res.json(persons)
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id == id)

    if(person){
        res.json(person)
    } else {
        res.statusMessage = `Person with id ${id} not found`
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.statusMessage = (`Person with id ${id} deleted`);
    res.status(204).end();  
})

const generateId = () => {
    // const maxId = persons.length > 0
    // ? Math.max(...persons.map(p => p.id))
    // : 0
    // return maxId + 1

    return Math.floor(Math.random() * 10000)
}

app.post('/api/persons/', (req, res) => {
    const body = req.body

    if(!body || !body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'     
        })
    }
    if(persons.find(p => p.name.toLowerCase() === body.name.toLowerCase()) != null){
        return res.status(409).json({
            error:'name already exists'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    
    res.json(person);
})

app.get('/info', (req, res) => {
    const date = new Date()
    const count = persons.length
    res.write(`<p>Phonebook has info for ${count} people</p>`)    
    res.write(`<p>${date.toString()}</p>`)
    res.end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)