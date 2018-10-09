const mongoose = require('mongoose');
const Ticket = require('../models/ticketModel');

module.exports = {
    findAll() {
        return Ticket.find()
            .exec()
            .then(obj => { return obj });
    },

    findById(id) {
        return Ticket.findById(id)
            .populate({ path: 'owner', select: 'firstName lastName'})
            .exec()
            .then(user => {return user})
    },

    create(note) {
        console.log(note);
       return Ticket.create({
            _id: mongoose.Types.ObjectId(),
            ...note
        })
            .then(createdNote => { return createdNote })
    },

    edit(note) {
        return Ticket.findByIdAndUpdate(note._id, note, {new: true})
            .then(doc => { return doc })
    },

    delete(id) {
        Ticket.findByIdAndDelete(id)
            .then(result => { return result })
    }
};