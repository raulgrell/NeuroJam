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

    createCanvas(window.innerWidth, window.innerHeight);
    setFrameRate(60);
    sliderRange(0, 90, 1);
    gui = createGui('Label');
    gui.addGlobals('scroll', 'maxParralax');

    starField = makeStarField(maxNumberofStars);
    noStroke();
    boss = new Boss(
        window.innerWidth - 100,
        window.innerHeight - 200,
        0.1 * window.innerHeight,
        10.0,
        60.0
    );
    dist = boss.x - 50;

    button = createButton('Confirm Parameters').id('confirm');
    button.position(window.innerWidth/2, window.innerHeight/2);
    button.mousePressed(startConditioning);
}

function startConditioning() {
    button.addClass("active");
    phase = '1';
}

function draw() {
    background(0);
    var deltaTime = 1 / getFrameRate();

    switch (phase) {
        case '0':
            // Setup Phase
            //sliders and shit
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
            if (shot) {
                bullet.update(deltaTime);
                if ((millis() - bullet.iMillis) < (bullet.ttc * bullet.tti) * 1000)
                    bullet.display();
            }
            break;

            // default:
            //     alert('Default case');
    }
};

function keyPressed() {
    if (key == ' ') {
        boss.shoot();
    } else if (keyCode == CONTROL) {
        shot = false;
    } else {
        phase = key;
        console.log("phase: " + phase);
    }
}