let p;
let x;
let y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = new Planet();
  let gui = new dat.GUI();
  gui.add(p, 'radiusX', 0, 500).name("Radius - X");
  gui.add(p, 'radiusY', 0, 500).name("Radius - Y");
  gui.add(p, 'angle', 0, 720).name("Rotation");
  gui.add(p, 'stepCount', 1, 50).step(1).name("# of Angles");
  gui.add(p, 'xoff', 1, 10);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  noStroke();
  background(23, 18, 166);


  fill(191, 6, 55);
  drawPattern(p.xoff);

  // Draws rectangular background
  fill(228, 205, 175);
  beginShape();
  vertex(0, 0);
  vertex(windowWidth, 0);
  vertex(windowWidth, windowHeight);
  vertex(0, windowHeight);

  // Draws planet
  beginContour();
  for (i = 0; i < p.stepCount + 1; i++) {
    x = p.radiusX * sin(p.angle);
    y = p.radiusY * cos(p.angle);
    vertex(windowWidth / 2 - x, windowHeight / 2 - y);
    p.angle += TWO_PI / p.stepCount;
  }
  endContour();
  endShape();
  loop();
}

function drawPattern(z) {
  for (let repeatX = windowWidth / 2 - p.radiusX; repeatX < windowWidth / 2 + p.radiusX; repeatX += 10) {
    for (let repeatY = windowHeight / 2 - p.radiusY; repeatY < windowHeight / 2 + p.radiusY; repeatY += 10) {
      n = noise(z) * 10;
      ellipse(repeatX, repeatY, n);
      z = z + 1;

    }
  }
}

function Planet() {
  this.radiusX = 150;
  this.radiusY = 150;
  this.angle = 0;
  this.stepCount = 5;
  this.angle = 0;
  this.xoff = 10;
}