import openSocket from 'socket.io-client';

const socket = openSocket();

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscibeToTimer', 1000);
}

export { subscribeToTimer };
