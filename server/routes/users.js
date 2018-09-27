const express = require('express');
const router = express.Router();
const userController = new require('../controllers/userController');
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send(userController.findAll());
});
router.post('/', (req, res, next) => {
  userController.create(req.body.name)
      .then(obj => res.send(obj));
});

module.exports = router;
