var app = require('express')();
//var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

//app.use(express.static('/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/index.css', function (req, res) {
    res.sendFile(__dirname + "/" + "index.css");
});

app.get('/index.js', function (req, res) {
    res.sendFile(__dirname + "/" + "index.js");
});

io.on('connection', function (socket) {
    socket.on('message', function () { });
    socket.on('disconnect', function () { });
});

io.on('connection', function(socket) {
	console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
