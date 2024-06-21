const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "student name is required"],
        minLength: [2, "student name should be atleast 2 character long"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email Is Required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, 'Password should not exceed more than 15 characters'],
        minLength: [6, 'Password should have atleast 6 characters'],
        // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, 'Please fill special, Number/Capital in password']
    },
   
}, { timestamps: true })


userSchema.pre("save", function () {

    if (!this.isModified("password")) return

    let salt = bcrypt.genSaltSync(15)
    this.password = bcrypt.hashSync(this.password, salt)

})


userSchema.methods.comparepass = function (password) {
    return bcrypt.compareSync(password, this.password);
}


userSchema.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, "this is jwt secret", { expiresIn: "1d" })
}



module.exports = mongoose.model("student", userSchema)

