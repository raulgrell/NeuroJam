var currentMillis;

//Background Starfield
var scroll = 5;
var scrollMin = 1;
var scrollMax = 20;
var scrollStep = 0.1;
var maxNumberofStars = 500;

// Each Star Values
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

// Boss
var boss;

// Bullet
var defaultBullet = {
    ttc: 3,
    tti: 0.5
}
var bullet;
var bullets = [];

// Ship
var ship;
