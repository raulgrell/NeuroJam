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

    this.shoot = shootBullet;
}

function shootBullet() {
    bullets.push(new Bullet(this.x, this.y, millis()));
};

function shootLine() {
    lines.push(new Line(this.x, this.y));
}
