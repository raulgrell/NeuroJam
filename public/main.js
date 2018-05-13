function startConditioning() {
    if (locked) {
        startButton.addClass("active");
        lockButton.addClass("active");
        roundTimer = 0;
        phase = 1;
    }else
    {
        toggleGUI();
    }
        
}

function setup() {
    createCanvas(windowWidth, windowHeight - 100);
    setFrameRate(60);
    noStroke();

    
    

    // Ship
    ship = new Ship(100, height / 2, 120);

    // Boss
    boss = new Boss(
        width - 100,
        height / 2,
        0.1 * height
    );

    ship.initTrial();


    // GUI
    starGui = createGui('Stars', 600, 40);
    starGui.addGlobals('directionX', 'directionY', 'scrollX', 'scrollY', 'parralaxMax', 'parralaxMin', 'starSizeMax', 'starSizeMin', 'maxNumberofStars');

    shipGui = createGui('Ship', 320, 180);
    shipGui.addGlobals('showHistory');
    sliderRange(50, width, 1);
    shipGui.addObject(ship, 'x');
    sliderRange(1, 10, 1);
    shipGui.addObject(ship, 'rate');

    testGui = createGui('Bullet', 320, 40);
    sliderRange(1, 5, 0.5);
    testGui.addObject(defaultBullet, 'ttc');
    sliderRange(0.1, 0.7, 0.05);
    testGui.addObject(defaultBullet, 'tti');

    structureGui = createGui('Structure', 60, 40);
    structureGui.addGlobals('RoundsPerBlock', 'conditioningTime');

    startButton = createButton('Start Testing').id('confirm');
    startButton.position(window.innerWidth - 300, window.innerHeight - 300);
    startButton.mousePressed(startConditioning);

    lockButton = createButton('Lock/Hide Parameters').id('lock');
    lockButton.position(window.innerWidth - 500, window.innerHeight - 300);
    lockButton.mousePressed(toggleGUI);

    currentMillis = millis();
};

var roundTimer = 0;

function draw() {
    var newMillis = millis();
    deltaTime = (newMillis - currentMillis) / 1000;
    currentMillis = newMillis;

    if (phase == 1 && roundTimer > conditioningTime) {
        phase = 2;
    }

    switch (phase) {
        case 0:
            createDescription();
            background(0,15,0)
            drawStarField();
            break;
        case 1:
            //Conditioning            
            background(0, 15, 0);
            drawStarField();
            roundTimer += deltaTime;
            break;
        case 2:
            //Test
            background(0, 15, 0);
            push();
            stroke(255);
            line(ship.x, 0, ship.x, height);
            pop();

            boss.update(deltaTime);
            boss.display();

            for (var i = bullets.length - 1; i >= 0; i--) {
                bullets[i].update(deltaTime);
                bullets[i].display();
                if (bullets[i].x < 0 || bullets[i].alive == false) {
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

function createDescription() {
    if (!textCreated) {
        var div = document.createElement('div');
        div.setAttribute('id', 'description');
        div.style.position = "absolute";
        div.style.bottom = 'window.innerHeight - height';
        div.style.color = 'white';
        div.style.padding = '10px';
        div.innerHTML = `
        In this game you play as an intergalactic bounty hunter pursuing a MOST WANTED Criminal.
        <br> <br>
        In this pursuit you'll fly through space until you reach you enemy. He will try to shake you off by emitting an EMP wave, but little does he know you can send it back.
        <br> <br>
        Press the mouse button right as the wave hits you to maximize your damage and capture him.
        `;
        document.body.appendChild(div);
        textCreated = true;
    }
}

function toggleGUI() {
    if (!hide) {
        starGui.hide();
        shipGui.hide();
        testGui.hide();
        structureGui.hide();
    }
    if (hide) {
        starGui.show();
        shipGui.show();
        testGui.show();
        structureGui.show();
    }
    hide = !hide;
    locked = !locked;
}

function nextRound() {
    phase = 1;
    boss.shot = false;
    roundTimer = 0;    
}

function nextTrial() {
    startButton.removeClass('active');
    lockButton.removeClass('active');
    currentRound = 0;
    roundTimer = 0;
    phase = 0;
    toggleGUI();
    boss.shot = false;
    currentTrial += 1;
    if (currentTrial == trialConditions.length) {
        currentTrial = 0;
    }
    dataService.create(ship.trial).then(response => {
        console.log(response);
        ship.initTrial();
    });
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

function showTrials() {
    for (var i = 0; i < ship.trial.rounds.length; i++) {
        push();
        stroke(255);
        line(ship.trial.rounds[i].x, 0, ship.trial.rounds[i].x, height);
        pop();
    }
}

function polygon(x, y, radius, npoints, rotation) {
    var angle = TWO_PI / npoints;
    beginShape();
    for (var a = rotation; a < TWO_PI + rotation; a += angle) {
        var sx = x + cos(a) * radius;
        var sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}


function windowResized() {
   resizeCanvas(windowWidth, windowHeight - 100);
}

function drawStarField(){
    if(!loaded){
        starField = makeStarField(maxNumberofStars);
        loaded = true;
    }
    starField.forEach(function (x, i) {
            x.display().update().repeat();
    });
}