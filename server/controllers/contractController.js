const mongoose = require('mongoose');
const Contract = require('../models/contractModel');
const ticketController = require('../controllers/ticketController');

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

    addMessage(message) {
        return Contract.findById(message.contractId)
            .then(contract => {
                contract.messages.push({
                    time: Date.now(),
                    ...message.message
                });
                return contract.save();
            })
            .then(response => { return response.messages });
    },

    getMessages(contractId) {
        return Contract.findById(contractId, 'messages')
            .then(messages => { return messages })
    },

    getCurrentTicketContract(ticketId, userId) {
        let contractOwnerId;
        return ticketController.findById(ticketId)
            .then(ticket => {
                contractOwnerId = ticket.owner._id;
                return Contract.find({
                    ticket: ticket._id
                });
            })
            .then(contracts => {
                console.log('found', contracts, contracts.applicant, typeof contractOwnerId, userId);
                const currentTicketApplicantContract = contracts.filter(function(contract) {
                    return contract.applicant.toString() === userId;
                });
                const isCurrentUserTicketOwner = contractOwnerId.toString() === userId;

                if (currentTicketApplicantContract.length > 0) {
                    return {
                        isUserTicketOwner: false,
                        contract: currentTicketApplicantContract[0]
                    }
                }
                if (isCurrentUserTicketOwner) {
                    return {
                        isUserTicketOwner: true,
                        contract: contracts[0]
                    }
                }
                // if (contract.applicant === userId || contractOwnerId === userId) {
                //     return contract;
                // }
                throw 'No contract found'
            })
    }
};