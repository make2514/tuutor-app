const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* This is an example and incomplete */
module.exports = {
    findAll() {
        return User.find()
            .select('-password')
            .exec()
            .then(obj => { return obj });
    },
    create(user) {
        return User.create({
            _id: mongoose.Types.ObjectId(),
            ...user
        })
            .then(createdUser => { return createdUser });
    },
    signUp({email, password}) {
        if (!email) throw "Email not given";

        return User.findOne({ email: email })
            .exec()
            .then(user => {
                if (user) throw "User already exists";
            })
            .then(() => {
                return bcrypt.hash(password, 10);
            })
            .then(hashedPassword => {
                return this.create({
                    email: email,
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
