import { Server, Socket } from 'socket.io';

const initWebsocket = async (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`A user with id: ${socket.id} connected`);

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('chat message', (msg: string) => {
            io.emit('chat message', { id: socket.id, msg: msg } as any); // сложный момент
        });
    });
};

module.exports = initWebsocket;
