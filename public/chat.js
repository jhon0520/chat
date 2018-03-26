// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var handle = document.getElementById('Usuario'),
    message = document.getElementById('Mensaje'),
    btn = document.getElementById('Enviar'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function () {
        socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function () {
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function (data) {
    feedback.innerHTML = '';
    console.log("Usuario: " + data.handle);
    console.log("Mensaje: " + data.message);

    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
