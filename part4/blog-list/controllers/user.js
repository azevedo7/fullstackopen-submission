const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res) => {
    // add the user
    const { username, name, password } = req.body

    // validation
    // unique username -- username and password 3 chars
    if(await User.findOne({ username: username })){
        res.status(409).json({error: 'name already exists'})
    }

    if(username.length < 3 || password.length < 3){
        res.status(402).json({error: 'username or password too short'})
    }

    // hash the password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
})

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

module.exports = userRouter