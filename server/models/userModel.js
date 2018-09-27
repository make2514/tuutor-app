const mongoose = require('mongoose');

/* This is an example and incomplete */
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});

module.exports = mongoose.model('User', userSchema);
