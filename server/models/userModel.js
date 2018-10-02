const mongoose = require('mongoose');

/* This is an example and incomplete */
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    phone: String,
    age: Number,
    bio: String,
});

module.exports = mongoose.model('User', userSchema);
