/* ***** Conexion con el socket ***** */
var socket = io.connect('http://localhost:4000');
/* ***** ---------- ***** */

/* ***** Funcion Sockets ***** */

var NombreUsuario = document.getElementById('Usuario'),
    MensajePrincipal = document.getElementById('Mensaje'),
    MensajeSecundario = document.getElementById('Mensaje2'),
    BotonEnviarPrincipal = document.getElementById('Enviar'),
    BotonEnviarSecundario = document.getElementById('Enviar2'),
    SalidaPrincipal = document.getElementById('output'),
    SalidaSecundario = document.getElementById('output2'),
    feedback = document.getElementById('feedback'),
    feedback2 = document.getElementById('feedback2');

BotonEnviarPrincipal.addEventListener('click', function () {
    console.log("Lo que envia de Usuario: " + NombreUsuario.value);
    console.log("Lo que envia de Mensaje: " + MensajePrincipal.value);

    socket.emit('ChatPrincipal', {
        Usuario: NombreUsuario.value,
        Mensaje: MensajePrincipal.value
    });
    MensajePrincipal.value = "";
});

BotonEnviarSecundario.addEventListener('click', function () {
    console.log("Lo que envia de Mensaje: " + MensajeSecundario.value);

    socket.emit('ChatSecundario', {
        Usuario: NombreUsuario.value,
        Mensaje: MensajeSecundario.value
    });
    MensajeSecundario.value = "";
});

MensajePrincipal.addEventListener('keypress', function () {
    socket.emit('Escribiendo', NombreUsuario.value);
})

// Lo que llega del socket del ChatPrincipal
socket.on('ChatPrincipal', function (data) {
    feedback.innerHTML = '';
    console.log("Lo que llega ");
    console.log("Usuario: " + data.Usuario);
    console.log("Mensaje: " + data.Mensaje);
    SalidaPrincipal.innerHTML += '<p><strong>' + data.Usuario + ': </strong>' + data.Mensaje + '</p>';
    SalidaSecundario.innerHTML += '<p>' + data.Mensaje + '</p>';
});

// Lo que llega del socket del ChatSecundario
socket.on('ChatSecundario', function (data) {
    feedback.innerHTML = '';
    console.log("Lo que llega ");
    console.log("Usuario: " + data.Usuario);
    console.log("Mensaje: " + data.Mensaje);
    SalidaPrincipal.innerHTML += '<p><strong>' + data.Usuario + ': </strong>' + data.Mensaje + '</p>';
    SalidaSecundario.innerHTML += '<p>' + data.Mensaje + '</p>';
});

socket.on('Escribiendo', function (data) {
    feedback.innerHTML = '<p><em>' + data + ' Esta escribiendo un mensaje...</em></p>';
});


/* ***** ---------- ***** */

/* ***** Funcion minimizar ***** */

function MinimizeFunction() {

    var x = document.getElementById('chat-list');
    var y = document.getElementById('chat');
    var z = document.getElementById('Mensaje2');
    var q = document.getElementById('user-name');
    if (x.style.visibility === 'hidden') {
        x.style.visibility = 'visible';
        z.style.visibility = 'visible';
        y.style.height = '300px';
        q.style.height = '7%';

    } else {
        x.style.visibility = 'hidden';
        x.style.height = '267px;';
        y.style.height = '0%';
        z.style.visibility = 'hidden';
        y.style.padding = '0% 0% 0% 0%;';
        q.style.height = '50%';

    }
}
/* *************** */