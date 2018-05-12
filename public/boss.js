function Boss(x, y) {
    this.x = x; // position, once it arrives to the screen
    this.y = y; // vertical position on the window

    this.ttc = [3, 1, 4, 0.5, 2]; //time til collision in seconds
    this.tti = [0.5, 0.2, 0.3, 0.8]; //time til collision as a fraction of ttc

    this.display = function () {
        push();
        fill(0, 200, 10);
        rectMode(CENTER);
        rect(x, y, 150, 300);
        pop();

        push();
        fill(0);
        ellipse(x, y, 5, 5);
        pop();
    };


    this.shoot = function () {
        console.log("lala");
        shot = true;
        var bulletTTC = this.ttc[Math.floor(Math.random() * this.ttc.length)];
        var bulletTTI = this.tti[Math.floor(Math.random() * this.tti.length)];
        console.log("TTC: " + bulletTTC + " TTI: " + bulletTTI);
        bullet = new Bullet(this.x, this.y, bulletTTC, bulletTTI, millis(), 0, 0);
    };
}

function Bullet(ix, iy, ttc, tti, im, traj, acc) {
    //variables
    this.iMillis = im; //sets initial millis
    this.x = ix; //sets initial position
    this.y = iy; //sets initial position
    this.ttc = ttc; //time til collision
    this.tti = tti; // time til invisible
    this.traj = traj;
    this.acc = acc;
    this.speed = (dist) / ttc;

    //methods
    this.update = function (deltaTime) {
        this.x -= this.speed * deltaTime;
    };

    this.display = function () {
        push();
        fill(255);
        ellipse(this.x, this.y, 25, 25);
        pop();
    };

}

