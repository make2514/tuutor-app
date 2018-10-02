const express = require('express');
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

/* This is an example and incomplete */
router.get('/', checkAuth, (req, res, next) => {
  userController.findAll()
      .then(obj => res.send(obj))
      //this error handling is not complete yet
      .catch(err => next(err) );
});
router.post('/', (req, res, next) => {
  userController.create({
      username: req.body.username,
      password: req.body.password
  })
      .then(obj => res.send(obj))
      //this error handling is not complete yet
      .catch(err => next(err) );
});

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
