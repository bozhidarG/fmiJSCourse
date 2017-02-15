"use strict";

class Ball {
    constructor(p, xPos, yPos) {
        this.p = p;
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = 5;
        this.xSpeedFactor = 3;
        this.ySpeedFactor = 0;
        this.xDirection = -1;
    }

    show() {
        this.p.noStroke();
        this.p.fill(150, 0, 255);
        this.p.ellipse(this.xPos, this.yPos, this.radius * 2, this.radius * 2);
    }

    move() {
        this.xPos += (this.xDirection * this.xSpeedFactor);
        var hitUp = ((this.yPos + this.ySpeedFactor) - this.radius < 0);
        var hitBottom = (this.yPos + this.ySpeedFactor + this.radius > this.p.height);

        if (hitUp || hitBottom) {
            this.ySpeedFactor *= -1;
        }

        this.yPos += this.ySpeedFactor;
    }

    hit(paddle) {
        var horizontalZone = false;
        if (paddle.isLeft()) {
            var ballXHitBox =  this.xPos - this.radius;
            horizontalZone = (paddle.xPos <= ballXHitBox) && (paddle.hitXPos >= ballXHitBox);
        } else {
            var ballXHitBox =  this.xPos + this.radius;
            horizontalZone = paddle.hitXPos <= ballXHitBox && paddle.xPos >= ballXHitBox;
        }

        if (horizontalZone) {

            var verticalZone = ( (paddle.yPos - paddle.height / 2) <= (this.yPos + this.radius) ) &&
                            ( (paddle.yPos + paddle.height / 2) >= (this.yPos - this.radius) )

            if (verticalZone) {
                return true;
            }
        }    

        return false;                    
    }

    change(positions) {
        this.xPos = positions.xPos;
        this.yPos = positions.yPos;
        this.xDirection = positions.dir;
        this.ySpeedFactor = positions.ySpeedFactor;
    }

    changeDirection(paddleHit) {
        if (this.yPos < paddleHit.yPos - 3) {
            this.ySpeedFactor = - (1 + Math.abs(paddleHit.yPos - this.yPos) / 8);
        } else if ( this.yPos > paddleHit.yPos + 3) {
            this.ySpeedFactor = 1 + Math.abs(paddleHit.yPos - this.yPos) / 8; 
        }
        // this.xSpeedFactor += 0.2;
        this.xDirection *= -1;
    }   
}
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
"use strict";

class Paddle {
    constructor(p, xPos, yPos, bordPosition) {
        this.p = p;
        this.xPos = xPos;
        this.yPos = yPos;
        this.height = 50;
        this.width = 16;
        this.speedFactor = 2;
        this.hitXPos = xPos + (this.width / 2) * bordPosition;
        this.bordPosition = bordPosition;
    }

    show() {
        this.p.fill(0, 255, 255);
        this.p.rectMode(this.p.CENTER);
        this.p.rect(this.xPos, this.yPos, this.width, this.height);
    }

    move(dir) {
        var canMoveUp = (this.yPos - this.height / 2 > 0);
        var canMoveDown = (this.yPos + this.height / 2 < this.p.height);

        if (canMoveUp && dir == -1) {
            this.yPos += (dir * this.speedFactor);
        } else if (canMoveDown && dir == 1) {
            this.yPos += (dir * this.speedFactor);
        }
    }

    change(yPos) {
        this.yPos = yPos;
    }

    isLeft() {
        if (this.bordPosition == 1) {
            return true;
        } else {
            return false;
        }
    }

}
"use strict";
var sketch = function(p) {

    var p1;
    var p2;
    var ball;
    var me;
    var enemy;
debugger;
     p.setup = function(){
        var canvas = p.createCanvas(800, 400);
        canvas.parent('game-area');
        p1 = new Paddle(p, 20, p.height/2, 1);
        p2 = new Paddle(p, p.width - 20, p.height/2, -1);
        
        me = p1;
        if (playerType == 'p2') {
            me = p2;
        }

        enemy = p2;
        if (playerType == 'p2') {
            enemy = p1;
        }

        ball = new Ball(p, p.width/2, p.height/2);
        network.setUpHandlers(enemy);
    };

    p.draw = function() {
        p.background(51);
        p1.show();
        p2.show();
        ball.show();
        ball.move();
        p.movement();

        if (ball.hit(p1)) {
            ball.changeDirection(p1);
        } else if (ball.hit(p2)) {
            ball.changeDirection(p2);
        }
    }

    p.movement = function() {
        if (p.keyIsDown(p.UP_ARROW)) {
            me.move(-1);
            network.emit(me);   
        } else if (p.keyIsDown(p.DOWN_ARROW)) {
            me.move(1);
            network.emit(me);   
        }
    }
}