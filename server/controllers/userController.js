const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    findAll() {
        return User.find()
            .select('-password')
            .exec()
            .then(obj => { return obj });
    },

    findById(id) {
        return User.findById(id)
            .select('-password')
            .populate('notifications')
            .exec()
            .then(user => {return user})
    },

    create(user) {
        return User.create({
            _id: mongoose.Types.ObjectId(),
            ...user
        })
            .then(createdUser => { return createdUser })
    },

    edit(user) {
        return User.findByIdAndUpdate(user._id, user, {new: true})
            .then(doc => { return doc })
    },

    signUp(userInfo) {
        if (!userInfo.email) throw "Email not given";

        return User.findOne({ email: userInfo.email })
            .exec()
            .then(user => {
                if (user) throw "User already exists";
            })
            .then(() => {
                return bcrypt.hash(userInfo.password, 10);
            })
            .then(hashedPassword => {
                return this.create({
                    ...userInfo,
                    password: hashedPassword
                })
            })
            .then(user => { return user });
    },

    login({ email, password }) {
        let userInfo;
        return User.findOne({ email: email })
            .exec()
            .then(user => {
                if (!user) throw "Auth failed";
                userInfo = user;
                return bcrypt.compare(password, user.password);
            })
            .then(result => {
                if (result) {
                    const token = jwt.sign(
                        {
                            email: userInfo.email,
                            _id: userInfo._id
                        },
                        'key',
                        { expiresIn: '1h' }
                        );
                    return { token: token };
                } else {
                    throw "Auth failed"
                }
            })
    }
};
