const mongoose = require('mongoose');
const User = require('../models/userModel');

/* This is an example and incomplete */
module.exports = {
    findAll() {
        return User.find().exec()
            .then(obj => { return obj });
    },
    create(name) {
        return User.create({
                _id: mongoose.Types.ObjectId(),
                name: name
            })
            .then(obj => { return obj });
    }
};
