const jwt = require('jsonwebtoken')

const token = null

const decodedToken = jwt.verify(null, process.env.SECRET)
console.log(decodedToken)