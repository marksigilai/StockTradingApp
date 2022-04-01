// This scene is where players are added to the databattle and then select where they want to put their programs to start

class CreateBattle extends Phaser.Scene {
 
    constructor() {
        super("CreateBattle");
    }

    preload() {
        
    }
 
    create() {
        var self = this;
        this.socket = io();

        this.socket.emit('getRooms');
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

    update() {
        this.socket.on('placedPrograms', (databattle) => {
            this.scene.start('startBattle'); // Start the databattle
        });
    }
}