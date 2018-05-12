function Ship(x, y, radius) {
    this.x = x;
    this.y = y;
    this.lifetime = 0;
    this.shield = false;
    this.rate = 10;

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
        var distance = this.x - bullet.x;
        dataService.create({
            tti: bullet.tti,
            ttc: bullet.ttc,
            distance
        }).then()
    }
}