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