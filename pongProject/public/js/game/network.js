"use strict";

class Network {
    constructor() {
        console.log('const');
        this.socket = io();
    }

    emit(paddle) {
        this.socket.emit('positions',paddle.yPos);
    }

    setUpHandlers(paddle) {
        this.socket.on('positions', (data) => {
            paddle.change(data);
        }) 
    }

    setUpGameStart() {
        this.socket.on('gameStart', (data) => {
            if (! playerType ) {
                playerType = data.player;
            }
            var renderer = new p5(sketch);

            this.socket.on('gameEnd', (data) => {
                renderer.remove();
            })
        })
    }
}