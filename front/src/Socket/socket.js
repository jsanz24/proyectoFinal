let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', function(socket){
    socket.on('chat message1', function(msg){
        console.log(socket.id)
        io.emit('chat message1', msg);
    });
});

