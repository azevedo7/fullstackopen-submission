require("dotenv").config()
const express = require("express")
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

// make router
const router = express.Router()

// use as normal app.get
router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  res.json(blogs)
})

router.post("/", async (req, res) => {
  const body = req.body
  const user = req.user

  if (!user) {
    return res.status(400).json({ error: "invalid id of token" })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
  })

  let savedBlog = await blog.save()
  savedBlog = await savedBlog.populate("user", { username: 1, name: 1, id: 1 })
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.json(savedBlog)
})

router.delete("/:id", async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  const user = req.user

  console.log(user)
  if (blog.user.toString() == user._id.toString()) {
    await Blog.findByIdAndDelete(blog.id)
  }

  res.status(204).end()
})

router.put("/:id", async (req, res) => {
  const body = req.body
  console.log(body)

  const blog = {
    user: body.user.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes),
    comments: body.comments,
  }
  console.log(blog)

  const response = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  })
  res.json(response)
})

router.post("/:id/comments", async (req, res) => {
  const blogId = req.params.id
  const comment = req.body.comment
  console.log(blogId, comment)

  try {
    const blog = await Blog.findById(blogId)
    blog.comments = blog.comments.concat(comment)
    const response = await blog.save()
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
