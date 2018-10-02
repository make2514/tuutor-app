const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/* This is an example and incomplete */
router.get('/', (req, res, next) => {
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
    userController.signUp({
          username: req.body.username,
          password: req.body.password
      })
        .then(createdUser => res.send(createdUser))
        .catch(err => {
            console.error(err);
            res.staus(500).body(err);
        });
});

module.exports = router;
