const express = require('express');
const contractController = require('../controllers/contractController');

const router = express.Router();

router.get('/', (req, res, next) => {
    contractController.findAll()
        .then(obj => res.send(obj))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.get('/:id', (req, res, next) => {
    contractController.findById(req.params.id)
        .then(doc => res.send(doc))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    console.log('req.body', req.body);
    contractController.create(req.body)
        .then(created => res.send(created))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.put('/', (req, res, next) => {
    contractController.edit(req.body)
        .then(edited => res.send(edited))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.get('/message/:contractId', (req, res, next) => {
    contractController.getMessages(req.params.contractId)
        .then(messages => res.send(messages))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.post('/message', (req, res, next) => {
    contractController.addMessage(req.body)
        .then(response => res.send(response))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

router.get('/mycontract/:ticketId', (req, res, next) => {
    console.log(req, res);
    contractController.getCurrentTicketContract(req.params.ticketId, req.userData._id)
        .then(contract => res.send(contract))
        .catch(err => {
            console.error(err);
            res.status(510).json({ error: err });
        });
});

module.exports = router;
