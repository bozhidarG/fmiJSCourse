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