function Ship(x, y, radius) {
    this.x = x;
    this.y = y;
    this.lifetime = 0;
    this.shield = false;
    this.rate = 2;

    this.display = function() {
        var r = radius * Math.sin(this.lifetime * this.rate);
        push();
        fill(0, 0, 127);
        ellipse(this.x, this.y, r, r);
        pop();
        
        if (this.shield) {
            ellipse(this.x, this.y, radius * 1.2, radius * 1.2);
        }
    }

    this.update = function(delta_time) {
        this.lifetime += delta_time;
    }

    this.useShield = function() {
        if (bullets.length == 0) return;
        var distance = this.x - bullets[0].x;
        var trial = {
            x: bullets[0].x,
            ppf: bullets[0].speed * deltaTime,
            tti: bullets[0].tti,
            ttc: bullets[0].ttc,
            distance
        }
        trials.push(trial);
        dataService.create(trial).then(response => {
            console.log(response);
        });
        bullets[0].alive = false;
        currentRound++;
        if(currentRound < RoundsPerBlock)
        {
            phase = 1;
            roundTimer = 0;
        } 
        else
        {
            button.class(' ');
            currentRound = 0;
            phase = 0;
        }
    }
}