// import test
const { test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  // remove all in the database
  await Blog.deleteMany({})

  // add every blog in initialBlogs
  for(let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returns the right number of blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier id id not _id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  assert(blog.hasOwnProperty('id'))
  assert(!blog.hasOwnProperty('_id'))
}) 

test('sending post adds a new blog', async () => {
  const initialBlogs = helper.initialBlogs
  const newBlog = new Blog({
    title: "Animal Farm",
    author: "george orwell",
    url: "www.animalfarmblog.com",
    likes: 0
  })

  await newBlog.save()
  
  const finalBlogs = await helper.blogsInDb()
  const titles  = finalBlogs.map(b => b.title)

  assert(titles.includes("Animal Farm"))
  assert.strictEqual(finalBlogs.length - 1, initialBlogs.length)
})

test('blog added without likes will be 0', async () => {
  const newBlog = new Blog({
    title: "Animal Farm",
    author: "george orwell",
    url: "www.animalfarmblog.com",
  })

  const result = await newBlog.save()
  assert.strictEqual(result.likes, 0)
})


after(async () => {
  await mongoose.connection.close()
})