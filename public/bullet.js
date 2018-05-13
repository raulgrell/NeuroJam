var bulletRadius = 25;
var lineWidth = 4;
var activeRadius = 50;
var explosionDuration = 0.1;

function Bullet(ix, iy) {
    this.iMillis = millis(); //sets initial millis
    this.x = ix; //sets initial position
    this.y = iy; //sets initial position
    this.ttc = defaultBullet.ttc; //time til collision
    this.tti = defaultBullet.tti; // time til invisible
    this.speed = (ship.x - ix) / defaultBullet.ttc;
    this.active = false;
    this.activeTime = 0;
    this.alive = true;
    this.rebound = false;

    this.update = function(deltaTime) {
        if (this.x < ship.x) {
            this.active = true;
            if (this.active) {
                this.activeTime += deltaTime;
                if (this.activeTime > explosionDuration) {
                    this.active = false;
                }
            }
        }
        
        this.x += this.speed * deltaTime;
        if (!this.rebound && this.x < 0) {
            this.alive = false;
            advance();
        } else if (this.x > width) {
            advance();
            this.alive = false;
        }
    }

    this.display = displayLine;
}

function displayBullet() {
    if (this.rebound || (millis() - this.iMillis) < (this.ttc * this.tti) * 1000) {
        push();
        fill(255);
        ellipse(this.x, this.y, bulletRadius, bulletRadius);
        pop();
    }
    if (this.active) {
        push();
        fill(255, 10, 2);
        ellipse(ship.x, ship.y, activeRadius + this.activeTime * 10, activeRadius + this.activeTime * 10);
        pop();
    }
}

function displayLine() {
    if (this.rebound || (millis() - this.iMillis) < (this.ttc * this.tti) * 1000) {
        push();
        stroke(255);
        line(this.x, 0, this.x, height);
        pop();
    }
    if (this.active) {
        push();
        stroke(255, 255, 0);
        strokeWeight(lineWidth);
        line(ship.x, 0, ship.x, height);
        pop();
    }
}
