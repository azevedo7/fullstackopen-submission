require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

// Middleware
const requestLogger = (req, res, next) => {
  console.log('Method: ', req.method)
  console.log('Paht: ', req.path)
  console.log('Body: ', req.body)
  console.log('---')
  next()
}

// show static pages
app.use(express.static('build'))

// transform request body into an object
// express.json() is also a middleware that has to be bofere
// our request logger because express.json() takes the body
// of the request and turns it into an object
app.use(express.json())

// use requestLogger middleware
app.use(requestLogger)


// catch request to non-existing route
const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

// get notes

// using our json server
//app.get('/api/notes', (req, res) => {
//  res.json(notes)
//})

// using MongoDB
app.get('/api/notes', (req, res) => {
  Note
    .find({})
    .then(notes =>{
      res.json(notes)
    })
})

// app.get('/api/notes/:id', (req, res) => {
//   // id is a string, so use Number()
//   // const id = Number(req.params.id);
//   // // console.log(note.id, typeof note.id, typeof id, note.id == id)
//   // // use typeof to debug 
//   // const note = notes.find(note => note.id === id)
  
  
//   // if(note){
//   //     res.json(note)
//   //   } else{
//   //     res.statusMessage = `Note with id ${id} not found`;
//   //     res.status(404).end()
//   //   }
//   Note.findById(req.params.id).then(note => {
//   })
// })

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if(note){
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Deleting a note
app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// generate id
const generateId = () => {
  // get max id of notes, otherwise if there are no notes, use 0
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1;
}

// POST
app.post('/api/notes', (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  })

  note.save()
    .then(savedNote => {
      res.json(savedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const { content, important } = req.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important } , 
    {new: true, runValidators: true, context: 'query'}
  )
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})


app.use(unknownEndpoint);

// error handler
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if(error.name === 'CastError'){
    return res.status(400).send({ error: 'malformatted id'})
  } else if(error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  
  next(error);

}

app.use(errorHandler)


// const app = http.createServer((requeste, response) => {
//     response.writeHead(200, {'Content-Type': 'text/plain'})
//     response.end(JSON.stringify(notes))
// })

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)