const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    created: { type: Date, required: true },
    terms: { type: String, required: true },
    payment: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
    ticket: {
        type: mongoose.Schema.ObjectId,
        ref: 'Ticket',
        required: true
    },
    applicant: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [{
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        time: Date,
        content: String,
        fullName: String
    }]
});

module.exports = mongoose.model('Contract', contractSchema);
