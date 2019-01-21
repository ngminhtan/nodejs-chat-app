const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

let users = [];
let connections = [];

server.listen(process.env.PORT || 5000);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected : %s sockets connected', connections.length);

    // on disconnect
    socket.on('disconnect', function () {
        if(!socket.username) return;
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnect: %s sockets disconnected', connections.length);
    });
    
    socket.on('send message', function (data) {
        io.sockets.emit('new message', {msg: data, username: socket.username});
    });

    socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    function updateUsernames(){
        io.sockets.emit('get users', users)
    }
});

