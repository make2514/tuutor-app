const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const usersRouter = require('./userRoute');
const notificationRouter = require('./notificationRoute');

//secure routes
router.use('/notification', checkAuth, notificationRouter);
//partly secure routes
router.use('/users', usersRouter);

//open routes

module.exports = router;
