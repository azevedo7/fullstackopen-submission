const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

describe('Blog API tests', () => {
  beforeEach(async () => {
    // remove all in the database
    await Blog.deleteMany({})

    // add every blog in initialBlogs
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  describe('GET /api/blogs', () => {
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

    test('unique identifier is id not _id', async () => {
      const response = await api.get('/api/blogs')
      const blog = response.body[0]
      assert(blog.hasOwnProperty('id'))
      assert(!blog.hasOwnProperty('_id'))
    })
  })

  describe('POST /api/blogs', () => {
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
      const titles = finalBlogs.map(b => b.title)

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

    test('dont accept blog without title or url', async () => {
      const newBlog = new Blog({
        author: "george orwell",
        url: "www.animalfarmblog.com",
      })

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  // describe('DELETE /api/blogs/:id', () => {
  //   test('successfully deletes a blog', async () => {
  //     const blogsAtStart = await helper.blogsInDb()
  //     const blogToDelete = blogsAtStart[0]

  //     await api
  //       .delete(`/api/blogs/${blogToDelete.id}`)
  //       .expect(204)

  //     const blogsAfter = await helper.blogsInDb()
  //     const titles = blogsAfter.map(b => b.title)

  //     assert(!titles.includes(blogToDelete.title))
  //     assert.strictEqual(blogsAfter.length, blogsAtStart.length - 1)
  //   })
  // })

  // describe('PUT /api/blogs/:id', () => {
  //   test('updates a blog', async () => {
  //     const blogsAtStart = await helper.blogsInDb()
  //     const blogToUpdate = blogsAtStart[0]

  //     const updatedBlog = {
  //       title: "Animal Farm",
  //       author: "George Orwell",
  //       url: "www.animalfarmblog.com",
  //       likes: 10
  //     }  

  //     await api
  //       .put(`/api/blogs/${blogToUpdate.id}`)
  //       .send(updatedBlog)
  //       .expect(200)
  //       .expect('Content-Type', /application\/json/)

  //     const blogsAfter = await helper.blogsInDb()
  //     const updatedBlogInDb = blogsAfter.find(b => b.id === blogToUpdate.id)

  //     assert.strictEqual(updatedBlogInDb.title, updatedBlog.title)
  //     assert.strictEqual(updatedBlogInDb.author, updatedBlog.author)
  //     assert.strictEqual(updatedBlogInDb.url, updatedBlog.url)
  //     assert.strictEqual(updatedBlogInDb.likes, updatedBlog.likes)
  //   })
  // })
})

describe('User API tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.usersToAdd) 
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart= await helper.usersInDb() 

    const user = {
      username: 'teste',
      user: 'teste',
      password: '123'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    assert.strictEqual(usersAfter.length, usersAtStart.length + 1)

    const usernames = usersAfter.map(u => u.username)
    assert(usernames.includes(user.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'johndoe',
      name: 'teste',
      password: 'teste',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(409)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()

    assert(usersAfter.length === usersAtStart.length)

    const usernames = usersAfter.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jo',
      name: 'teste',
      password: 'te',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(402)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()

    assert.strictEqual(usersAfter.length, usersAtStart.length)

    const usernames = usersAfter.map(u => u.username)
    assert(!usernames.includes(newUser.username))
  })
  
})

after(async () => {
  await mongoose.connection.close()
})