// import test
const { test, after } = require('node:test')
const assert = require('node:assert')

const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const Blog = require('../models/blog')

// supertest takes care of listening to the app
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returns the right number of blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('unique identifier id id not _id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  assert(blog.hasOwnProperty('id'))
  assert(!blog.hasOwnProperty('_id'))
}) 


after(async () => {
  await mongoose.connection.close()
})