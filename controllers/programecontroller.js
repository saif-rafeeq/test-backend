const { catchAsyncError } = require("../middlewares/catchAsyncError");
const programe = require("../models/programe");



exports.programecreate = catchAsyncError(async (req, res) => {
    const { title, description, amount } = req.body;
    const newProgram = new programe({ title, description, amount });
    await newProgram.save();
    res.status(201).json('Program created successfully');
})


exports.allprograme = catchAsyncError(async (req, res) => {
    const programs = await programe.find();
    res.json(programs);
})