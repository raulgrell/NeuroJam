var currentMillis;

var gui, starGui, testGUI, structureGUI;
var hide = false;
var phase = 0;
var textCreated = false;
var locked = false; 

var RoundsPerBlock = 3; //number of rounds the game will repeat until it returns to the parameter screen
var RoundsPerBlockMin = 1; 
var RoundsPerBlockMax = 30; 
var RoundsPerBlockStep = 1;
var currentRound = 0;

var initialMillisCond = 0;
var conditioningTime = 5;
var conditioningTimeMin = 1;
var conditioningTimeMax = 60;
var conditioningTimeStep = 1;

var startButton, lockButton;
var loaded = false;

//Background Starfield

var directionX = true;
var directionY = false;

var scrollX = 2;
var scrollXMin = -10;
var scrollXMax = 20;
var scrollXStep = 0.1;


var scrollY = 2;
var scrollYMin = -10;
var scrollYMax = 20;
var scrollYStep = 0.1;

var maxNumberofStars = 500;

// Each Star Values
var up, down, left, right;
var starSizeMin = 2;
var starSizeMinMin = 0;
var starSizeMinMax = 3;
var starSizeMinStep = 0.1;

var starSizeMax = 5;
var starSizeMaxMin = 4;
var starSizeMaxMax = 10;
var starSizeMaxStep = 0.1;

var parralaxMin = 3;
var parralaxMinMin = 1;
var parralaxMinMax = 6;
var parralaxMinStep = 0.1;

var parralaxMax = 10;
var parralaxMaxMin = 8;
var parralaxMaxMax = 30;
var parralaxMaxStep = 0.1;

var initialShipX = 100;

// Boss
var boss;

// Bullet
var defaultBullet = {
    ttc: 3,
    tti: 0.5
}
var bullets = [];
var lines = [];

var projectileIndex = 0;
var projectileFunctions = [
    function() { return shootBullet },
    function() { return shootLine }
];

// Ship
var ship;

// Data
var deltaTime;

var showHistory = true;
var trials = [];

var currentTrial = 0;
var trialConditions = [
    makeTrial(0.5, 3, 1),
    makeTrial(0.2, 1, 2),
    makeTrial(0.6, 2, 1),
    makeTrial(0.4, 3, 2),
    makeTrial(0.7, 1, 1),
]

function makeTrial(tti, ttc, shotDelay) {
    return { tti, ttc, shotDelay }
}

