const mongoose = require("mongoose")

exports.connectDatabase = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/testtest")
        console.log("Database Connecttion Established")
    }
    catch (error) {
        console.log(error)
    }
}