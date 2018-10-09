const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth').checkAuth;

const router = express.Router();

router.get('/', checkAuth, (req, res, next) => {
    userController.findAll()
        .then(obj => res.send(obj))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.get('/currentUser', checkAuth, (req, res, next) => {
    console.log('/currentUser', req.headers.authorization);
    try {
        const token = req.headers.authorization;
        const userData = jwt.verify(token, 'key');
        console.log('userData', userData._id);
        userController
            .findById(userData._id)
            .then(function(info) {
                res.send(info);
            })
    } catch (e) {
        return res.status(401).json({
            message: 'Failed to fetch user info'
        });
    }
    // userController.findAll()
    //     .then(obj => res.send(obj))
    //     .catch(err => {
    //         console.error(err);
    //         res.status(500).json({ error: err });
    //     });
});

router.get('/:id', checkAuth, (req, res, next) => {
    userController.findById(req.params.id)
        .then(doc => res.send(doc))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.put('/', (req, res, next) => {
    userController.edit(req.body)
        .then(result => res.send(result))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

//open routes

router.post('/signup', (req, res, next) => {
    userController.signUp(req.body)
        .then(createdUser => {
            res.send(createdUser);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.post('/login', (req, res, next) => {
    userController.login(req.body)
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;
