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
    feedback2 = document.getElementById('feedback2'),
    BotonMinimiza = document.getElementById('BotonMinimiza');


// Variables 2
var start = document.getElementById("Mensaje2"),
    MensajePrivado = document.getElementById('MensajePrivado'),
    UsuarioPM = document.getElementById('UsuarioPM');
// *****

// Enviar Usuario para que sea guardado del lado del servidor
NombreUsuario.addEventListener('keypress', function (e) {

    var key = e.which || e.keyCode;

    if (key === 13) {
        console.log("Lo que envia de Usuario: " + NombreUsuario.value);
        socket.emit('Nombre de usuario', {
            Usuario: NombreUsuario.value,
        });
        MensajeSecundario.value = "";
    }

});


start.addEventListener('keypress', function (e) {

    var key = e.which || e.keyCode;

    if (key === 13) {

        socket.emit('ChatSecundario', {
            Usuario: NombreUsuario.value,
            Mensaje: MensajeSecundario.value
        });
        MensajeSecundario.value = "";
    }

});

// Enviar mensaje privado
MensajePrivado.addEventListener('keypress', function (e) {

    var key = e.which || e.keyCode;

    if (key === 13) {

        if (UsuarioPM.value != null && UsuarioPM.value != "" && MensajePrivado.value != null && MensajePrivado.value != "") {
            socket.emit('Mensaje Privado', {
                Usuario: NombreUsuario.value,
                UsuarioPM: UsuarioPM.value,
                MensajePrivado: MensajePrivado.value
            });
            SalidaPrincipal.innerHTML += '<p><strong>' + NombreUsuario.value + ': </strong>' + MensajePrivado.value + '</p>';
            MensajePrivado.value = "";
        }else{
            alert("No ingresaste Usuario o un Mensaje (Privado)");
        }
    }

});

// Lo que llega del socket del Mensaje privado
socket.on('Mensaje Privado', function (data) {
    feedback.innerHTML = '';
    console.log("Lo que llega: " + JSON.stringify(data));
    console.log("Usuario: " + data.Usuario);
    console.log("UsuarioPM: " + data.UsuarioPM);
    console.log("Mensaje: " + data.MensajePrivado);
    SalidaPrincipal.innerHTML += '<p><strong>' + data.Usuario + ': </strong>' + data.MensajePrivado + '</p>';
    SalidaSecundario.innerHTML += '<p>' + data.MensajePrivado + '</p>';
});


BotonEnviarPrincipal.addEventListener('click', function () {
    console.log("Lo que envia de Usuario: " + NombreUsuario.value);
    console.log("Lo que envia de Mensaje: " + MensajePrincipal.value);

    if (NombreUsuario.value != null && NombreUsuario.value != "" && MensajePrincipal.value != null && MensajePrincipal.value != "") {

        NombreUsuario.readOnly = true;

        socket.emit('ChatPrincipal', {
            Usuario: NombreUsuario.value,
            Mensaje: MensajePrincipal.value
        });
    }
    else {
        alert("No ingresaste usuario o un mensaje ");
    }

    MensajePrincipal.value = "";
    MensajePrincipal.placeholder = "Mensaje"
});

BotonEnviarSecundario.addEventListener('click', function () {
    console.log("Lo que envia de Mensaje: " + MensajeSecundario.value);

    socket.emit('ChatSecundario', {
        Usuario: NombreUsuario.value,
        Mensaje: MensajeSecundario.value
    });
    MensajeSecundario.value = "";
    MensajeSecundario.placeholder = "Mensaje"
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

BotonMinimiza.addEventListener('click', function () {

    var VentanaPrincipal = document.getElementById('chat-window2')
    VentanaUsuario = document.getElementById('Chat2'),
        InputTextChat = document.getElementById('Mensaje2');

    if (VentanaPrincipal.style.visibility === 'hidden') {
        VentanaPrincipal.style.visibility = 'visible';
        InputTextChat.style.visibility = 'visible';
        BotonEnviarSecundario.style.visibility = 'visible';
        VentanaUsuario.style.height = '400px';
    } else {
        VentanaPrincipal.style.visibility = 'hidden';
        InputTextChat.style.visibility = 'hidden';
        BotonEnviarSecundario.style.visibility = 'hidden';
        VentanaUsuario.style.height = '40px';
    }

});

/* *************** */