
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('message', (message) => {
            console.log('info', message.value);
        });
    });
};
