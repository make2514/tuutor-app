const express = require("express");
const checkAuth = require('../middleware/checkAuth').checkAuth;

const usersRouter = require('./userRoute');
const notificationRouter = require('./notificationRoute');
const contractRoute = require('./contractRoute');

const router = express.Router();

//secure routes
router.use('/notification', checkAuth, notificationRouter);
router.use('/contract', checkAuth, contractRoute);
//partly secure routes. the secured routes are defined inside the router
router.use('/users', usersRouter);
//open routes

module.exports = router;
