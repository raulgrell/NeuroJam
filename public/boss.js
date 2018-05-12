var bossWidth = 150;
var bossHeight = 200;

function Boss(x, y) {
    this.x = x; // position, once it arrives to the screen
    this.y = y; // vertical position on the window

    this.ttc = [3, 1, 4, 0.5, 2]; //time til collision in seconds
    this.tti = [0.5, 0.2, 0.3, 0.8]; //time til collision as a fraction of ttc

    this.display = function () {
        push();
        fill(0, 200, 10);
        rectMode(CENTER);
        rect(x, y, bossWidth, bossHeight);
        pop();

        push();
        fill(0);
        ellipse(x, y, 5, 5);
        pop();
    };

    this.shoot = function () {
        // var bulletTTC = this.ttc[Math.floor(Math.random() * this.ttc.length)];
        // var bulletTTI = this.tti[Math.floor(Math.random() * this.tti.length)];
        bullets.push(new Bullet(this.x, this.y, millis()));
    };
}

var bulletRadius = 25;
var explosionRadius = 50;
var explosionDuration = 2;

class Bullet {
    constructor(ix, iy, im) {
        //variables
        this.iMillis = im; //sets initial millis
        this.x = ix; //sets initial position
        this.y = iy; //sets initial position
        this.ttc = defaultBullet.ttc; //time til collision
        this.tti = defaultBullet.tti; // time til invisible
        this.speed = (ix - ship.x) / defaultBullet.ttc;
        this.exploded = false;
        this.explosionTime = 0;
        this.alive = true;
    }

    update(deltaTime) {
        if (this.x <= ship.x) {
            this.x = ship.x;
            this.exploded = true;
            if (this.exploded) {
                this.explosionTime += deltaTime;
                if (this.explosionTime > explosionDuration) {
                    this.alive = false;
                }
            }
        }
        else {
            this.x -= this.speed * deltaTime;
        }
    }

    display() {
        if ((millis() - this.iMillis) < (this.ttc * this.tti) * 1000) {
            push();
            fill(255);
            ellipse(this.x, this.y, bulletRadius, bulletRadius);
            pop();
        }
        if (this.exploded) {
            push();
            fill(255, 10, 2);
            ellipse(this.x, this.y, explosionRadius + this.explosionTime * 10, explosionRadius + this.explosionTime * 10);
            pop();
        }
    };
}

