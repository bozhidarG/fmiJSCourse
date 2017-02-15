"use strict";

class Network {
    constructor() {
        console.log('const');
        this.socket = io();
    }

    emit(paddle) {
        this.socket.emit('positions', {
            yPos: paddle.yPos,
        });
    }

    setUpHandlers(paddle) {
        this.socket.on('positions', (data) => {
            paddle.change(data);
        }) 
    }

    setUpGameStart(ball, p1, p2) {
        this.socket.on('gameStart', (data) => {
            let playerType = data.playerType;
            p1.change({
                yPos: height/2
            });
            p2.change({
                yPos: height/2
            });
            ball.change({
                yPos: height/2,
                xPos: width/2,
                dir: -1,
                ySpeedFactor: 0
            });


            p = p1;
            p1 = p2;
            p2 = p;
        })
    }
}