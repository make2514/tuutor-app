const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* This is an example and incomplete */
router.get('/', (req, res, next) => {
  userController.findAll()
      .then(obj => res.send(obj))
      //this error handling is not complete yet
      .catch(err => next(err) );
});
router.post('/', (req, res, next) => {
  userController.create(req.body.name)
      .then(obj => res.send(obj))
      //this error handling is not complete yet
      .catch(err => next(err) );
});

module.exports = router;
