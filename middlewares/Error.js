exports.generatederror = (err, req, res, next) => {
    const statusCode = err.statusCode || 500    

    res.status(statusCode).json({
        message: err.message,
        errorName: err.name,
        // stack:err.stack
    })
}

