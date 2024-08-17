const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})

test('User adds correct with encryption', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
        username: "azevedo",
        password: "password",
        name: "joao azeveo"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const user = await User.findOne({ username: newUser.username })
    const usersAfter = await helper.usersInDb()

    assert.strictEqual(usersBefore.length, usersAfter.length - 1)   
    assert(!(user.passwordHash===newUser.password))
})


after(async () => {
    mongoose.connection.close()
})