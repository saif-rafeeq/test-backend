const express = require("express")
const router = express.Router()
const {homepage,currentuser,userSignup,userSignin,userSignOut} = require("../controllers/indexController")
const { isAuthenticated } = require("../middlewares/auth")

// get /
router.get('/',isAuthenticated,homepage)

//get /student
router.get('/student',isAuthenticated,currentuser)

// post /student/signup
router.post('/student/register',userSignup)


// post /student/signin
router.post('/student/login',userSignin)


// get /student/signOut
router.get('/student/signout',isAuthenticated,userSignOut)


module.exports = router