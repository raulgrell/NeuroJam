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
};

function draw() {
    background(0);


    var deltaTime = 1 / getFrameRate();
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
};


