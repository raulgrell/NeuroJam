//InitialValues;

var gui;
var phase = 2;
var button;

var starField = [];

var makeStarField = function (starcount) {
    var out = [];
    for (var i = 0; i < starcount; i++) {
        out.push(new Star());
    }
    return out;
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    setFrameRate(60);
    noStroke();

    // GUI
    sliderRange(0, 90, 1);
    gui = createGui('Label');
    gui.addGlobals('scroll', 'maxParralax');

    // Stars
    starField = makeStarField(maxNumberofStars);

    // Ship
    ship = new Ship(50, height / 2, 50);

    // Boss
    boss = new Boss(
        ship,
        width - 100,
        height / 2,
        0.1 * height
    );

    currentMillis = millis();
    button = createButton('Confirm Parameters').id('confirm');
    button.position(window.innerWidth / 2, window.innerHeight / 2);
    button.mousePressed(startConditioning);
};

function startConditioning() {
    button.addClass("active");
    phase = '1';
}

function draw() {
    var newMillis = millis();
    var deltaTime = (newMillis - currentMillis) / 1000;
    currentMillis = newMillis;

    background(0);

    switch (phase) {
        case '0':
            // Sliders
            break;
        case '1':
            //Conditioning
            starField.forEach(function (x, i) {
                x.display()
                    .update()
                    .repeat();
            });
            break;
        case '2':
            //Test
            push();
            stroke(255);
            line(50, 0, 50, 1000);
            pop();

            boss.display();

            if (bullet) {
                bullet.update(deltaTime);
                bullet.display();
            }

            starField.forEach(function (x, i) {
                x.display()
                    .update()
                    .repeat();
            });

            ship.update(deltaTime);
            ship.display();
            break;
    }
};

function mousePressed() {
    if (mouseButton == LEFT) {
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