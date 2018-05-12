//InitialValues;

var gui, gui2, guiTest;
var phase = 2;
var button;
var loaded = false;

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

    // Ship
    ship = new Ship(50, height / 2, 120);

    // Boss
    boss = new Boss(
        width - 100,
        height / 2,
        0.1 * height
    );

    // GUI
    gui2 = createGui('Stars', 60, 60);
    gui2.addGlobals('scroll', 'parralaxMax', 'parralaxMin', 'starSizeMax','starSizeMin');


    gui = createGui('Ship', 600, 60);
    
    sliderRange(50, width, 1);
    gui.addObject(ship, 'x');

    sliderRange(1, 10, 1);
    gui.addObject(ship, 'rate');


    guiTest = createGui('Bullet', 60, 400);
    sliderRange(1, 5, 0.5);
    guiTest.addObject(defaultBullet, 'ttc');
    sliderRange(0.1, 0.7, 0.05);    
    guiTest.addObject(defaultBullet, 'tti');

    button = createButton('Confirm Parameters').id('confirm');
    button.position(window.innerWidth / 2, window.innerHeight / 2);
    button.mousePressed(startConditioning);

    currentMillis = millis();

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
            if(!loaded){
                starField = makeStarField(maxNumberofStars);
                loaded = true;
            }
            starField.forEach(function (x, i) {
                x.display().update().repeat();
            });
            break;
        case '2':
            //Test
            push();
            stroke(255);
            line(ship.x, 0, ship.x, height);
            pop();

            boss.display();

            for (var i = bullets.length - 1; i >= 0; i--) {
                bullets[i].update(deltaTime);
                bullets[i].display();
            }

            for (var i = bullets.length - 1; i >= 0; i--) {
                if(!bullets[i].alive) {
                    bullets.splice(i, 1);
                }
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
    } else if (key >= '0' && key <= '9') {
        phase = key;
        console.log("phase: " + phase);
    }
}