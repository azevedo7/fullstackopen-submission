const express = require('express')
const Blog = require('../models/blog')

// make router
const router = express.Router()

// use as normal app.get
router.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

router.post('/', (req, res) => {
    const blog = new Blog(req.body)
    blog
        .save()
        .then(result => {
            res.status(201).json(result)
        })
})


module.exports = router