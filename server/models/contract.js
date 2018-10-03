const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    created: Date,
    terms: String,
    payment: String,
    applicant: { type: mongoose.Schema.ObjectId,
        ref: 'user' }
});

module.exports = mongoose.model('Notification', contractSchema);
