const mongoose = require('mongoose')

// create schema
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

// export model
module.exports = mongoose.model('Blog', blogSchema)