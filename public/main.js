
function startConditioning() {
    button.addClass("active");
    roundTimer = 0;
    phase = 1;
}

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
    starGui = createGui('Stars', 60, 250);
    starGui.addGlobals('comets','rain','scrollX', 'scrollY', 'parralaxMax', 'parralaxMin', 'starSizeMax', 'starSizeMin');

    shipGui = createGui('Ship', 600, 60);
    sliderRange(50, width, 1);
    shipGui.addObject(ship, 'x');
    sliderRange(1, 10, 1);
    shipGui.addObject(ship, 'rate');

    testGui = createGui('Bullet', 320, 60);
    sliderRange(1, 5, 0.5);
    testGui.addObject(defaultBullet, 'ttc');
    sliderRange(0.1, 0.7, 0.05);
    testGui.addObject(defaultBullet, 'tti');

    structureGui = createGui('Structure', 60, 60);
    sliderRange(0, 120, 5);
    structureGui.addGlobals('RoundsPerBlock', 'conditioningTime');
    
    button = createButton('Confirm Parameters').id('confirm');
    button.position(window.innerWidth / 2, window.innerHeight / 2);
    button.mousePressed(startConditioning);

    currentMillis = millis();
};

var roundTimer = 0;

function draw() {
    var newMillis = millis();
    deltaTime = (newMillis - currentMillis) / 1000;
    currentMillis = newMillis;

    if (phase == 1 && roundTimer > conditioningTime)
    {
        phase = 2;
    }

    switch (phase) {
        case 0:
            // Sliders
     
            background(15, 0, 0);
            break;
        case 1:
            //Conditioning
            hide = true;
            GUI();
            background(0, 15, 0);
            if (!loaded) {
                starField = makeStarField(maxNumberofStars);
                loaded = true;
            }
            starField.forEach(function (x, i) {
                x.display().update().repeat();
            });
            roundTimer += deltaTime;
            break;
        case 2:
            //Test
            background(0, 15, 0);
            push();
            stroke(255);
            line(ship.x, 0, ship.x, height);
            pop();

            boss.display();

            for (var i = bullets.length - 1; i >= 0; i--) {
                bullets[i].update(deltaTime);
                bullets[i].display();
                if (!bullets[i].alive) {
                    bullets.splice(i, 1);
                }
            }
            roundTimer += deltaTime;            
            break;
    }

    if (showHistory) showTrials();

    ship.update(deltaTime);
    ship.display();
};

function GUI(){
    if(hide){
        starGui.hide();
        shipGui.hide();
        testGui.hide();
        structureGui.hide();
    }
    if(!hide){
        starGui.show();
        shipGui.show();
        testGui.show();
        structureGui.show();
    }
}

function mousePressed() {
    if (phase == 2) {
        if (mouseButton == LEFT) {
            if (bullets.length > 0) {
                ship.useShield();
            }
        }
    }
}

function keyPressed() {
    if (key == ' ') {
        boss.shoot();
    } else if (keyCode == CONTROL) {
        shot = false;
    } else if (key >= '0' && key <= '9') {
        phase = parseInt(key, 10);
        console.log("phase: " + phase);
    }
}

function showTrials() {
    for (var i = 0; i < trials.length; i++) {
        push();
        stroke(255);
        line(trials[i].x, 0, trials[i].x, height);
        pop();
    }
}