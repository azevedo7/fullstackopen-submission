const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
<<<<<<< HEAD
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
=======
>>>>>>> parent of 9c9c0f5 (Note part 4.7)
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
<<<<<<< HEAD
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
=======
>>>>>>> parent of 9c9c0f5 (Note part 4.7)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app