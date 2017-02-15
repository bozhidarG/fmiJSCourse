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