const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    phone: String,
    age: Number,
    bio: String,
    notifications: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Notification'
    }]
});

module.exports = mongoose.model('User', userSchema);
