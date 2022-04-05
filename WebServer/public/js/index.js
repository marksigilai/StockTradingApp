import Databattle from './databattle.js';

const config = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: 1280,
    height: 780,
    scene: {
        preload: preload,
        create: create, 
    }
};

const game = new Phaser.Game(config);
const rooms = [];

$('#quick-game').click(function() {
    game.scene.scenes[0].socket.emit('quickGame');
    $('#menu-container').css({'display':'none','visibility':'hidden'});
    $('#waiting-container').css({'display':'block','visibility':'visible'});
});

$('#create-game').click(function() {
    $('#menu-container').css({'display':'none','visibility':'hidden'});
    $('#create-container').css({'display':'block','visibility':'visible'});
});

$('#create-form').submit(function(e) {
    e.preventDefault();
    var roomName = $('#create-form > #gameName').val();
    console.log(roomName);
    if(roomName != '') {
        game.scene.scenes[0].socket.emit('createRoom', roomName);
        $('#waiting-container').css({'display':'block','visibility':'visible'});
        $('#create-container').css({'display':'none','visibility':'hidden'});
    }
});

$('#find-game').click(function() {
    game.scene.scenes[0].socket.emit('getRooms');
    game.scene.scenes[0].socket.on('returnRooms', (rooms) => {
        console.log(rooms[0]);
        for(var i=0; i<rooms.length; i++) {
            $('#rooms-list').append('<div class="button room-btn" id="' + rooms[i].id + '">' + rooms[i].name + '</div>');
        }
    });
    $('#menu-container').css({'display':'none','visibility':'hidden'});
    $('#rooms-container').css({'display':'block','visibility':'visible'});
});


$('#rooms-list').click(function(e) {
    if (e.target) {
        var roomId = e.target.id;
        console.log(roomId);
        game.scene.scenes[0].socket.emit('joinRoom', roomId);
        $('#rooms-container').css({'display':'none','visibility':'hidden'});
        $('#waiting-container').css({'display':'block','visibility':'visible'});
    }
});

function preload() {

}

function create() {
    var self = this;
    this.socket = io();
    console.log(this.socket);

    this.databattle = new Databattle(this);
    // this.socket.on('returnRooms', (rooms) => {
    //     if(rooms.length==0) {
    //         console.log('creating game');
    //         this.socket.emit('createRoom', this.socket.id);
    //     } else {
    //         console.log('found game');
    //         this.socket.emit('joinRoom', rooms[rooms.length-1].id);
    //     }
    // });
}

