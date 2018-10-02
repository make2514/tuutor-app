const mongoose = require('mongoose');

/* This is an example and incomplete */
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: String
});

module.exports = mongoose.model('User', userSchema);
