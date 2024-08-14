const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()
const blogs = require('./controllers/blogs')
const config = require('./utils/config')

const url = config.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
mongoose.set('strictQuery', false)

app.use(express.json())
app.use(cors())

app.use('/api/blogs', blogs)

module.exports = app