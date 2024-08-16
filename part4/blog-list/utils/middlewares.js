const errorHandler = (error, req, res, next) => {
    if(error.name == 'ValidationError') {
        res.status(400).send({ error: error.message })
    }
}

module.exports = { errorHandler }