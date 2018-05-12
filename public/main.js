//InitialValues;

var gui;

var starField = [];

var makeStarField = function (starcount) {
    var out = [];
    for (var i = 0; i < starcount; i++) {
        out.push(new Star());
    }
    return out;
};

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    setFrameRate(60);
    noStroke();

    // GUI
    sliderRange(0, 90, 1);
    gui = createGui('Label');
    gui.addGlobals('scroll', 'maxParralax');

    // Stars
    starField = makeStarField(maxNumberofStars);

    // Ship
    ship = new Ship(50, height/2, 50);

    // Boss
    boss = new Boss(
        window.innerWidth - 100,
        window.innerHeight - 200,
        0.1 * window.innerHeight,
        10.0,
        60.0
    );
    dist = boss.x - 50;

    currentMillis = millis();
};

function draw() {
    var newMillis = millis();
    var deltaTime = (newMillis - currentMillis) / 1000;
    currentMillis = newMillis;
    
    background(0);

    push();
    stroke(255);
    line(50, 0, 50, 1000);
    pop();
    
    boss.display();

    if (shot) {
        bullet.update(deltaTime);
        if ((millis() - bullet.iMillis) < (bullet.ttc * bullet.tti) * 1000)
            bullet.display();
    }

    starField.forEach(function (x, i) {
        x.display()
            .update()
            .repeat();
    });

    ship.update(deltaTime);
    ship.display();
};

function mousePressed() {
    if(mouseButton == LEFT) {
        if (bullet) {
            ship.useShield();
        }
    }
}

function keyPressed() {
    if (key == ' ') {
        boss.shoot();
    } else if (keyCode == CONTROL) {
        shot = false;
    }
}