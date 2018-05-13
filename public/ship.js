function Ship(x, y, radius) {
    this.x = initialShipX;
    this.y = y;
    this.lifetime = 0;
    this.reboundTimer = 0;
    this.shield = false;
    this.rate = 0;

    this.initTrial = function () {
        this.trial = {
            ...trialConditions[currentTrial],
            conditioningTime,
            //Background Starfield
            directionX,
            directionY,
            scrollX,
            scrollY,
            maxNumberofStars,
            // Each Star Values
            starSizeMin,
            starSizeMax,
            parralaxMin,
            parralaxMax,
            ppf: (this.x - boss.x) / trialConditions[currentTrial].ttc * 1 / 60,
            rounds: []
        }
    }

    this.display = function () {
        var r = radius * (Math.sin(this.lifetime * this.rate) / 10 + 0.5);
        push();
        fill(0, 0, 127);
        polygon(this.x, this.y, r, 3, 0);
        pop();
        push();
        fill(127, 0, 0);
        polygon(this.x + 20, this.y, r / 3, 3, 0);
        pop();
        push();
        fill(0, 0, 127);
        ellipse(this.x + 5, this.y, r / 2.5, r / 2);
        pop();
        push();
        fill(255, 255, 0);
        polygon(this.x - (r / 2 + 30), this.y + r - 10, 15, 3, Math.PI / 3)
        polygon(this.x - (r / 2 + 30), this.y - r + 10, 15, 3, Math.PI / 3)
        pop();
        push();
        fill(255, 127, 0);
        polygon(this.x - (r / 2 + 23), this.y + r - 10, 15, 3, Math.PI / 3)
        polygon(this.x - (r / 2 + 23), this.y - r + 10, 15, 3, Math.PI / 3)
        pop();
        push();
        fill(255, 0, 0);
        polygon(this.x - (r / 2 + 20), this.y + r - 10, 10, 3, Math.PI / 3)
        polygon(this.x - (r / 2 + 20), this.y - r + 10, 10, 3, Math.PI / 3)
        pop();
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        rect(this.x - (r / 2 + 5), this.y + r - 10, 35, 25);
        rect(this.x - (r / 2 + 5), this.y - r + 10, 35, 25);
        pop();
        if (this.shield) {
            ellipse(this.x, this.y, radius * 1.2, radius * 1.2);
            this.shield = false;
        }
    }

    this.update = function (delta_time) {
        this.lifetime += delta_time;
        if (this.rebound) {
            this.reboundTimer += delta_time;
            if (reboundTimer > 1000) {
                bullets[0].alive = false;
                advance();
            }
        }
    }

    this.useShield = function () {
        if (bullets.length == 0) return;

        var distance = this.x - bullets[0].x;
        var x = bullets[0].x
        var result = { x, distance }

        this.shield = true;

        if (bullets[0].x > this.x) {
            bullets[0].speed = -bullets[0].speed;
            bullets[0].rebound = true;
        } else {
            bullets[0].alive = false;
        }

        this.trial.rounds.push(result);

        currentRound++;
        if (bullets[0].rebound) {
        } else {
            advance();
        }
    }
}

function advance() {
    boss.exploding = false;
    boss.explosionTimer = 0;
    if (currentRound < RoundsPerBlock) {
        nextRound();
    }
    else {
        nextTrial();
    }
}