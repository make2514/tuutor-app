const mongoose = require('mongoose');
const Notification = require('../models/notificationModel');

module.exports = {
    findAll() {
        return Notification.find()
            .exec()
            .then(obj => { return obj });
    },

    findById(id) {
        return Notification.findById(id)
            .exec()
            .then(user => {return user})
    },

    create(note) {
       return Notification.create({
            _id: mongoose.Types.ObjectId(),
            ...note
        })
            .then(createdNote => { return createdNote })
    },

    edit(note) {
        return Notification.findByIdAndUpdate(note._id, note, {new: true})
            .then(doc => { return doc })
    },

    delete(id) {
        Notification.findByIdAndDelete(id)
            .then(result => { return result })
    }
};