const express = require('express');
const Program = require('../models/programe');
const { isAuthenticated } = require('../middlewares/auth');
const { catchAsyncError } = require('../middlewares/catchAsyncError');
const { programecreate, allprograme } = require('../controllers/programecontroller');
const router = express.Router();

router.post('/', isAuthenticated, programecreate);

router.get('/', isAuthenticated, allprograme);

module.exports = router;
