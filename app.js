var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('Escuchando peticiones en el puerto 4000.');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Escucha al chat Principal
    socket.on('ChatPrincipal', function(data){
        console.log("Los datos que llegan a NodeJS");
        console.log(data);
        io.sockets.emit('ChatPrincipal', data);
    });

    // Escucha al chat Secundario
    socket.on('ChatSecundario', function(data){
        console.log("Los datos que llegan a NodeJS");
        console.log(data);
        io.sockets.emit('ChatSecundario', data);
    });

    // Handle typing event
    socket.on('Escribiendo', function(data){
        socket.broadcast.emit('Escribiendo', data);
    });

});