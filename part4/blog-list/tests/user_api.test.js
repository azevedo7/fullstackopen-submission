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

    const passwordHash = await helper.hashedPassword("password")
    const newUser = new User({
        username: "inicial",
        name: "user inicial",
        passwordHash
    })

    await newUser.save()
})

test('User adds correct with encryption', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
        username: "azevedo",
        name: "joao azeveo",
        password: "password"
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

test('User gives error when username already exists', async () => {
    const usersBefore = await helper.usersInDb()
    
    const newUser = {
        username: "inicial",
        password: "password",
        name: "joao azeveo"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(409)
        .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()

    assert.strictEqual(usersBefore.length, usersAfter.length)
})

test('User gives error when username is too short', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
        username: "az",
        password: "password",
        name: "joao azeveo"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(402)
        .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()

    assert.strictEqual(usersBefore.length, usersAfter.length)
})

test('Login with correct credentials', async () => {
    const user = {
        username: "inicial",
        password: "password",
    }

    await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
})