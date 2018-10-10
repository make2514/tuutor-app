const express = require('express');
const noteController = require('../controllers/ticketController');

const router = express.Router();

router.get('/', (req, res, next) => {
    noteController.findAll()
        .then(obj => res.send(obj))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.get('/mytickets', (req, res, next) => {
    console.log('req.userData', req.userData);
    noteController.findByOwnerId(req.userData._id)
    .then(obj => res.send(obj));
});

router.get('/:id', (req, res, next) => {
    noteController.findById(req.params.id)
        .then(doc => res.send(doc))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    noteController.create(req.body)
        .then(created => res.send(created))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.put('/', (req, res, next) => {
    noteController.edit(req.body)
        .then(result => res.send(result))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;