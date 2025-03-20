const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let clients = [];
io.on('connection', (socket) => {
    console.log('A user connected');
    clients.push(socket);
    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        clients = clients.filter(client => client !== socket);
    });
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
