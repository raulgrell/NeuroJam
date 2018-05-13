var bossRadius = 100;
var bossRotationSpeed = 1;

var explosionDuration = 1;

function Boss(x, y) {
    this.x = x; // position, once it arrives to the screen
    this.y = y; // vertical position on the window
    this.rotation = 0;
    this.shot = false;
    this.shotTimer = 0;
    this.explosionTimer = 0;
    this.exploding = false;

    this.update = function (delta_time) {
        this.rotation += bossRotationSpeed * delta_time;
        this.shotTimer += delta_time;
        if (!this.shot && this.shotTimer > trialConditions[currentTrial].shotDelay) {
            this.shoot();
        }
        if (bullets.length != 0) {
            if (bullets[0].x > this.x) {
                exploding = true;
            }
            if (this.exploding) {
                this.explosionTimer += delta_time;
            }
        }
    }


    this.display = function () {
        push();
        fill(0, 160, 10);
        rectMode(CENTER);
        translate(x, y);
        rotate(this.rotation);
        polygon(0, 0, bossRadius, 8, 0);

        fill(0, 120, 30);
        translate(-16, -16);
        rotate(-this.rotation * 2);
        polygon(0, 0, bossRadius / 4, 8, 0);

        rotate(-this.rotation);
        translate(32, 32);
        fill(0, 15, 0);
        ellipse(0, 0, 5, 5)

        if (this.exploding) {
            var factor = Math.sin(Math.PI() * this.explosionTimer / this.explosionDuration);
            translate(-16, -16);
            fill(255, 255, 0);
            ellipse(0, 0, 40 * factor, 40 * factor);
            fill(255, 127, 0);
            ellipse(0, 0, 30 * factor, 30 * factor);
            fill(255, 0, 0);
            ellipse(0, 0, 20 * factor, 20 * factor);
        }
        pop();
    };

    this.shoot = shootBullet;
}


function shootBullet() {
    bullets.push(new Bullet(this.x, this.y, millis()));
    this.shotTimer = 0;
    this.shot = true;
};

function shootLine() {
    lines.push(new Line(this.x, this.y));
    this.shotTimer = 0;
    this.shot = true;
}
