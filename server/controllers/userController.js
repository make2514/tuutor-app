const User = require('../models/userModel');
const mongoose = require('mongoose');

class UserController {
    static findAll() {
        User.find()
            .exec((result) => { return result });
    }
    static create(name) {
        return User.create({
                _id: mongoose.Types.ObjectId(),
                name: name
            })
            .then(obj => { return obj });
    }
}

module.exports = UserController;