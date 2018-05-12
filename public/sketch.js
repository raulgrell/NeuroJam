var fill_color = 64;

var x = 640 / 2;
var y = 480 / 2;

function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(0);
  fill(fill_color);
  ellipse(120, 240, 100, 100);

  fill(127, 0, 0);
  ellipse(x, y, 10, 10);
  
  x += 12;
  if (x > 640) {
    x = 0;
  }
}

function mousePressed() {
  fill_color = (fill_color + 100) % 255;
  console.log("Distance: ", x, 120);
}
