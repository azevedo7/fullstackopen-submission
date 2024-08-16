require('express-async-errors')
const express = require('express')
const Blog = require('../models/blog')

// make router
const router = express.Router()

// use as normal app.get
router.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

router.post('/', async (req, res) => {
    const blog = new Blog(req.body)

    const result = await blog.save()
    res.status(201).json(result)
})

router.delete('/:id', async (req, res) => {
    Blog.findOneAndDelete(req.params.id)
    res.status(204)
})

module.exports = router