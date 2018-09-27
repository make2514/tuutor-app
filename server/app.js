const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

//Connect mongodb
mongoose.connect('mongodb://localhost/myproject')
    .then(console.log('connected'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connection open to database');
});

const app = express();

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

//Routing
const usersRouter = require('./routes/userRoute');
app.use('/users', usersRouter);

module.exports = app;
