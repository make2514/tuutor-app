const mongoose = require('mongoose');
const Contract = require('../models/contractModel');

module.exports = {
    findAll() {
        return Contract.find()
            .exec()
            .then(obj => { return obj });
    },

    findById(id) {
        return Contract.findById(id)
            .exec()
            .then(user => {return user})
    },

    create(contract) {
        return Contract.create({
            _id: mongoose.Types.ObjectId(),
            created: Date.now(),
            ...contract
        })
            .then(createdNote => { return createdNote })
    },

    edit(contract) {
        if (contract.created) delete contract.created;
        if (contract.messages) delete contract.messages;
        return Contract.findByIdAndUpdate(contract._id, contract, {new: true})
            .then(doc => { return doc })
    },

    addMessage(contractId, message) {
        return Contract.findById(contractId)
            .then(contract => {
                contract.messages.push({
                    time: Date.now(),
                    ...message
                });
                return contract.save();
            })
            .then(res => { return res });
    },

    getMessages(contractId) {
        return Contract.findById(contractId, 'messages')
            .then(messages => { return messages })
    }
};