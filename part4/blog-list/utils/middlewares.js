const errorHandler = (error, req, res, next) => {
    if(error.name == 'ValidationError') {
        res.status(400).send({ error: error.message })
    } else if (error.message.includes('duplicate key error')) {
        res.status(400).send({ error: 'expected `username` to be unique'})
    } else if (error.name == 'JsonWebTokenError') {
        res.status(401).send({ error: 'invalid token' })
    } else if(error.name == 'TypeError') {
        res.status(400).send({error: 'invalid note or user'})
    }
    console.log(error)
    next(error)
}

const tokenExtractor = (req, res, next) => {

    const authorization = req.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        req.token = authorization.replace('Bearer ', '') 
    } else {
        req.token = null
    }
    
    next()
}

module.exports = {
    errorHandler,
    tokenExtractor
}