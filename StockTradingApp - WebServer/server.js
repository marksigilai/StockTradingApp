var { v4: uuidv4 } = require('uuid');
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var http = require('http').Server(app);
var io = require('socket.io')(http);


var mongoose = require('mongoose');
var authRoutes = require("./routes/authRoutes");
var cookieParser = require('cookie-parser');
var path = require('path');

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//middleware
app.use(express.json());
app.use(cookieParser());

//get and post requests for the database
const db = 'mongodb+srv://sigilai:123qwa@spybot.fu5ki.mongodb.net/spybot-auth';

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => app.listen(7000))
.catch((err) => console.log(err));

app.use(authRoutes);

var rooms = {};

io.on('connection', function (socket) {
    socket.id = uuidv4();

    socket.on('createRoom', function(roomName) {
        const room = {
            id: uuidv4(), // generate a unique id for the new room.
            name: roomName,
            sockets: [],
            turn: socket.id,
            wait: ''
        };
        rooms[room.id] = room;
        console.log('Created room: %s', room.id);

        joinRoom(socket, room);
    });

    socket.on('joinRoom', function(roomId) {
        rooms[roomId].wait = socket.id;
        const room = rooms[roomId];

        joinRoom(socket, room);
    });
    
    socket.on('quickGame', function() {
        const roomList = [];
        var isFull = true;

        for (const id in rooms) {
            if(rooms[id].sockets.length==1) {
                rooms[id].wait = socket.id;
                const room = rooms[id];
                joinRoom(socket, room);
                isFull = false;
            }
        }

        if(isFull == true) {
            const room = {
                id: uuidv4(), // generate a unique id for the new room.
                name: socket.id,
                sockets: [],
                turn: socket.id,
                wait: ''
            };
            rooms[room.id] = room;
            console.log('Created room: %s', room.id);
    
            joinRoom(socket, room);
        }
    });

    socket.on('getRooms', function() {
        const roomList = [];
        for (const id in rooms) {
            if(rooms[id].sockets.length==1) {
                const {name} = rooms[id];
                const room = {name, id};
                roomList.push(room);
            }
        }
        socket.emit('returnRooms', roomList);
    });

    socket.on('startGame', function(room) {
        
    });
});

function joinRoom(socket, room) {
    room.sockets.push(socket);
    socket.join(room.id, function() {
        socket.roomId = room.id;
        console.log('Joined room: %s', room.id);
    });
}

http.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on ' + http.address().port);
});