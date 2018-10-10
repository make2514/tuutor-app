import openSocket from 'socket.io-client';

const socket = openSocket({
    transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: localStorage.getItem('authToken')
            }
        }
    }
});

function subscribeToChat(id,cb) {
    socket.on('chatHistory', history => cb(null, history));
    socket.emit('subscribeToChat', id, localStorage.getItem('authToken'));
}

function sendMessage(message, cb) {
    socket.emit('message', message);
}

function receiveMessage(cb) {
    socket.on('message', messageWrap => cb(null, messageWrap));
}

export { subscribeToChat, sendMessage, receiveMessage };
