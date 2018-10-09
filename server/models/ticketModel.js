const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subject: { type: String, required: true },
    info: { type: String, required: true },
    payment: String,
    location: String,
    tutor: Boolean,
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);
