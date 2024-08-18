require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()
const blogs = require('./controllers/blogs')
const users = require('./controllers/user')
const login = require('./controllers/login')
const config = require('./utils/config')
const middlewares = require('./utils/middlewares')

const url = config.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
mongoose.set('strictQuery', false)

app.use(express.json())
app.use(cors())

app.use(middlewares.tokenExtractor)

app.use('/api/blogs', blogs)
app.use('/api/users', users)
app.use('/api/login', login)


app.use(middlewares.errorHandler)

module.exports = app