const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

let users = [];
connections = [];

server.listen(process.env.PORT || 5000);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

