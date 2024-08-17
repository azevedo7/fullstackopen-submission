const errorHandler = (error, req, res, next) => {
    if(error.name == 'ValidationError') {
        res.status(400).send({ error: error.message })
    } else if (error.message.includes('duplicate key error')) {
        res.status(400).send({ error: 'expected `username` to be unique'})
    }
}

module.exports = { errorHandler }