
var SocketID = [];
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

    // ***** --- ***** // 

    // Escuchando el usuario escogido
    socket.on('Nombre de usuario', function (Usuario) {

        var Existe = false;
        var indice = 0;

        for (var recorrido = 0; recorrido < NombreUsado.length; recorrido++) {
            if (NombreUsado[recorrido] == Usuario.Usuario) {
                indice = recorrido;
                Existe = true;
            }
        }

        if (Existe) {
            console.log("El usuario ya existe");
        } else {
            console.log("Usuario creado con el nombre de: " + Usuario.Usuario);
            NombreUsado.push(Usuario.Usuario);
            SocketID.push(socket.id);
            console.log("Usuario creado con el nombre de: " + NombreUsado[(Usuario.length) - 1] + "Con el ID: " + SocketID[(SocketID.length) - 1]);
        }

    });

    // Desconxion del usuario
    socket.on('disconnect', function () {

        var Existe = false;
        var indice = 0;

        for (var recorrido = 0; recorrido < SocketID.length; recorrido++) {
            if (SocketID[recorrido] == socket.id) {
                indice = recorrido;
                Existe = true;
            }
        }

        if (Existe) {
            console.log("El usuario ya no existe existe y estaba en el indice: " + indice);
            delete NombreUsado[indice];
            delete SocketID[indice];

        }

    });

    // Escuchando al Mensaje Privado
    socket.on('Mensaje Privado', function (data) {
        console.log("MP NodeJS: " + JSON.stringify(data));
        console.log("Usuario : " + data.UsuarioPM);

        var Existe = false;
        var indice = 0;

        for (var recorrido = 0; recorrido < NombreUsado.length; recorrido++) {
            if (NombreUsado[recorrido] == data.UsuarioPM) {
                indice = recorrido;
                Existe = true;
            }
        }

        console.log("SocketID : " + SocketID[indice]);

        io.to(SocketID[indice]).emit('Mensaje Privado', data);
    });


});