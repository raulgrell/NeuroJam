const bossWidth = 150;
const bossHeight = 200;

function Boss(x, y, ship) {
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
        var bulletTTC = this.ttc[Math.floor(Math.random() * this.ttc.length)];
        var bulletTTI = this.tti[Math.floor(Math.random() * this.tti.length)];
        bullet = new Bullet(this.x, this.y, bulletTTC, bulletTTI, millis());
    };
}

function Bullet(ix, iy, ttc, tti, im) {
    //variables
    this.iMillis = im; //sets initial millis
    this.x = ix; //sets initial position
    this.y = iy; //sets initial position
    this.ttc = ttc; //time til collision
    this.tti = tti; // time til invisible
    this.speed = (ship.x - ix) / ttc;

    //methods
    this.update = function (deltaTime) {
        this.x -= this.speed * deltaTime;
    };

    this.display = function () {
        if ((millis() - this.iMillis) < (this.ttc * this.tti) * 1000) {
            push();
            fill(255);
            ellipse(this.x, this.y, 25, 25);
            pop();
        }
    };

}
