var boss;
var bullet;
var canvasHeight = 400;
var CanvasWidth = 800;
var shot = false;
var dist;

function setup() {
  setFrameRate(60);
  createCanvas(CanvasWidth, canvasHeight);
  fill(255);
  noStroke();
  boss = new Boss(
    CanvasWidth - 100,
    canvasHeight - 200,
    0.1 * height,
    10.0,
    60.0
  );

  dist = boss.x - 50;
  console.log(dist);
}

function draw() {
  var deltaTime = 1/getFrameRate();
  background(0);
  push();
  stroke(255);
  line(50,0,50,1000);
  pop();
  boss.display();
  if (shot)
  {
    // console.log("bullet x: " + bullet.x + " bullet speed: "+ bullet.speed);
    bullet.update(deltaTime);
    if((millis() - bullet.iMillis) < (bullet.ttc * bullet.tti)*1000)
    bullet.display();
  }
}