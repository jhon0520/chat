var Nombre = {};
var Cliente = [];
var NombreUsado = [];


var express = require('express');
var bodyParser = require('body-parser');
var socket = require('socket.io');

// App setup
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(4000, function () {
    console.log('Escuchando peticiones en el puerto 4000.');
});

// Static files
app.use(express.static('public'));
app.use(express.static('public/pruebapost'));


// routes will go here
app.get('/pruebapost.html', function (req, res) {
    var user_id = req.param('something');
    console.log(user_id);
    res.send(user_id);
});

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Escucha al chat Principal
    socket.on('ChatPrincipal', function (data) {
        console.log("Los datos que llegan a NodeJS");
        console.log(data);
        io.sockets.emit('ChatPrincipal', data);
    });

    // Escucha al chat Secundario
    socket.on('ChatSecundario', function (data) {
        console.log("Los datos que llegan a NodeJS");
        console.log(data);
        io.sockets.emit('ChatSecundario', data);
    });

    // Escucha si esta escribiendo.
    socket.on('Escribiendo', function (data) {
        socket.broadcast.emit('Escribiendo', data);
    });


    // Nose que haces!!!
    var activeNames = [];
    var usersInRoom = io.sockets.clients();
    for (var index in usersInRoom) {
        var userSocketId = (usersInRoom[index].id);
        if (userSocketId !== socket.id && Nombre[userSocketId]) {
            var name = Nombre[userSocketId];
            activeNames.push({ id: NombreUsado.indexOf(name), nick: name });
        }
    }


    // Escuchando el usuario escogido
    socket.on('Nombre de usuario', function (Usuario, Respuesta) {

        console.log("Indice: " + NombreUsado.indexOf(Usuario));
        if (NombreUsado.indexOf(Usuario) !== -1) {
            Respuesta('El Nombre de usuario no esta disponible.');
            return;
        }
        var Indice = NombreUsado.push(Usuario) - 1;
        Cliente[Indice] = socket;
        console.log("socket:" + socket);
        console.log("Cliente[Indice] :" + Cliente[Indice]);
        Nombre[socket.id] = Usuario;
        console.log("Nombre[socket.id] :" + Usuario);
    });

    // Escuchando al Mensaje Privado
    socket.on('Mensaje Privado', function (data) {
        console.log("MP NodeJS: " + data);

        var from = Nombre[socket.id];
        Cliente[data.userToPM].emit('Mensaje Privado', { from: from, msg: data.msg });
    });



});