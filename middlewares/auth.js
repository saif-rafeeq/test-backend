const jwt = require("jsonwebtoken")
const Errorhandler = require("../utils/errorHandler")
const { catchAsyncError } = require("../middlewares/catchAsyncError")

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    
    const { token } = req.cookies

    if (!token) return next(new Errorhandler("Please login to access the resources!"))

    const { id } = jwt.verify(token,"this is jwt secret")

    req.id = id

    next()
})