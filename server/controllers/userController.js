const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

/* This is an example and incomplete */
module.exports = {
    findAll() {
        return User.find().exec()
            .then(obj => { return obj });
    },
    create({username, password}) {
        return User.create({
            _id: mongoose.Types.ObjectId(),
            username: username,
            password: password
            })
            .then(obj => { return obj });
    },
    signUp({username, password}) {
        return User.findOne({ username: username })
            .exec()
            .then(user => {
                console.log(user);
                if (user) { throw "User already exists"}
            })
            .then(() => {
                return bcrypt.hash(password, 10, (err,hash) => {
                    if (err) throw err;
                    return hash;
                })
            })
            .then(hashedPassword => console.log(hashedPassword))
            .catch(err => console.error(err));
    }
};
