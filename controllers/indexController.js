const { catchAsyncError } = require("../middlewares/catchAsyncError")
const userModel = require("../models/studentModel")
const { sendToken } = require("../utils/SendToken")
const Errorhandler = require("../utils/errorHandler")

exports.homepage = catchAsyncError((req, res, next) => {
    res.json({ message: "Secure homepage !" })
})


exports.currentuser = catchAsyncError(async (req, res, next) => {
    const student = await userModel.findById(req.id).exec()
    res.json({ student })
})

exports.userSignup = catchAsyncError(async (req, res, next) => {
    const student = await new userModel(req.body).save()
    sendToken(student, 201, res)
})


exports.userSignin = catchAsyncError(async (req, res, next) => {
    const student = await userModel.findOne({ email: req.body.email }).select("+password").exec()

    if (!student) {
        return next(new Errorhandler("student Not Found With This Email", 404))
    }

    const isMatch = student.comparepass(req.body.password)

    if (!isMatch) return next(new Errorhandler("Wrong Credentials", 500))

    sendToken(student, 200, res)


})

exports.userSignOut = catchAsyncError(async (req, res, next) => {
    res.clearCookie("token")
    res.status(201).json({ message: "Successfully Signout!" })
})


