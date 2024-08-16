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

router.put('/:id', async (req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes : Number(body.likes)
    }

    const response = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(response)
})

module.exports = router