const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subject: { type: String, required: true },
    info: { type: String, required: true },
    payment: String,
    location: String,
    tutor: Boolean
});

module.exports = mongoose.model('Notification', notificationSchema);
