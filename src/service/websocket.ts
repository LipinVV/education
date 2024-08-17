const initWebsocket = async (io) => {
    io.on('connection', (socket) => {
        console.log(`A user with id: ${socket.id} connected`);

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('chat message', (msg) => {
            io.emit('chat message', { id: socket.id, msg: msg });
        });
    });
};

module.exports = initWebsocket;
