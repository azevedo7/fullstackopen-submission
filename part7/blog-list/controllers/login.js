require('dotenv').config()
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async(req, res) => {
    const { username, password } = req.body
    
    const user = await User.findOne({ username })

    // verify user is not null and that password combines
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)


    if(!(user && passwordCorrect)){
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    let token = jwt.sign(userForToken, process.env.SECRET)

    res
        .status(200)
        .json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter