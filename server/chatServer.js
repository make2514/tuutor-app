const ContractController = require('./controllers/contractController');
const UserController = require('./controllers/userController');
const verifyToken = require('./middleware/checkAuth').verifyToken;

module.exports = (io) => {
    io.use((socket, next) => {
        if (socket.request.headers.authorization) return next();
        next(new Error('Authentication error'));
    });
    io.on('connection', (client) => {
        let contractId = null;
        let userId = null;
        let userFullName = null;

        client.on('subscribeToChat', (id, token) => {
            contractId = id;
            userId = verifyToken(token)._id;
            client.join(contractId);
            ContractController.getMessages(contractId)
                .then(messages => {
                    client.emit('chatHistory', messages);
                    return UserController.findById(userId);
                })
                .then(user => {
                    userFullName = `${user.firstName} ${user.lastName}`;
                })
                .catch(err => console.error(err));
        });

        client.on('message', (message) => {
            ContractController.addMessage({
                "contractId": contractId,
                "message": {
                    "content": message,
                    "userId": userId,
                    "fullName": userFullName
                }
            })
                .then((response) => {
                    io.to(contractId).emit('message', response[response.length-1]);
                })
                .catch(err => {

                });
        });

    });
};
