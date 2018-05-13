function Hazards() {
    this.active = false;
    this.frequency = 0.5;
    this.accumulator = 0.5;
    this.timer = 0;
    this.items = []

    this.activate = function(duration) {
        this.active = true;
        this.duration = duration;
    }

    this.update = function(deltaTime) {
        if (this.active) {
            timer += deltaTime;
            if (this.timer > )
            if (this.timer > this.duration) {
                this.active = false;
            }
        }
    }

    this.display = function() {

    }
}