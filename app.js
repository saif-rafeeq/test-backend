require("dotenv").config({path:"./.env"})
const express = require("express")
const app = express()
const logger = require("morgan")
const Errorhandler = require("./utils/errorHandler")
const { generatederror } = require("./middlewares/Error")
const session = require("express-session")
const cookieparser = require("cookie-parser")
const cors = require("cors")
const programRoutes = require('./routes/programe');
const paymentRoutes = require('./routes/payment');


// app.use(cors({credentials:true,origin:true}))
app.use(cors({credentials:true,origin:"http://localhost:5173"}))


// body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())


// session and cookie

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"this is secret"
}))


app.use(cookieparser())


//dbconnection 
// const { connectDatabase } = require("./models/dataBase")
// connectDatabase()
require("./models/dataBase").connectDatabase()

//logger
app.use(logger("tiny"))


// routes
app.use('/', require("./routes/indexRoutes"))
app.use('/api/programs', programRoutes);
app.use('/process', paymentRoutes);




// wildcard route
app.all("*",(req,res,next)=>{
next(new Errorhandler(`Requested URL not found ${req.url}`,404))
})

//custom error handlermiddleware
app.use(generatederror)

app.listen(3000, console.log(`server connected on port ${3000}`))