let p;
let oioi;

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = new Shape();
  oioi = new Pattern(10, 12, 12, 40, 40, 0, 0, 0);
  createGUI();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  strokeWeight(6);
  for (let repeatX = windowWidth / 2 - p.radiusX; repeatX < windowWidth / 2 + p.radiusX; repeatX += oioi.spacingX) {
    for (let repeatY = windowHeight / 2 - p.radiusY; repeatY < windowHeight / 2 + p.radiusY; repeatY += oioi.spacingY) {
      drawShape(oioi, repeatX + random(oioi.xjitter), repeatY + random(oioi.yjitter));
    }
  }
  drawPattern();
}

function drawShape(shape, xPos, yPos) {
  beginShape();
  for (var i = 0; i <= oioi.numAngles; i++) {
    let radiusX = oioi.radiusX + random(oioi.linejitter);
    let radiusY = oioi.radiusY + random(oioi.linejitter);
    var x = cos(radians(i * (360) / oioi.numAngles)) * radiusX;
    var y = sin(radians(i * (360) / oioi.numAngles)) * radiusY;
    vertex(xPos - x, yPos - y);
  }
  endShape();
  noLoop();
}

function drawPattern() {
  beginShape();
  vertex(0, 0);
  vertex(windowWidth, 0);
  vertex(windowWidth, windowHeight);
  vertex(0, windowHeight);
  beginContour();
  for (i = 0; i < p.stepCount + 1; i++) {
    x = (p.radiusX * sin(p.angle));
    y = (p.radiusY * cos(p.angle));
    vertex(windowWidth / 2 - x, windowHeight / 2 - y);
    p.angle += TWO_PI / p.stepCount;
  }
  endContour();
  endShape();
}

function Pattern(a, rx, ry, sx, sy, xj, yj, l) {
  this.numAngles = a;
  this.radiusX = rx;
  this.radiusY = ry;
  this.spacingX = sx;
  this.spacingY = sy;
  this.xjitter = xj;
  this.yjitter = yj;
  this.linejitter = l;
}

function Shape() {
  this.radiusX = 150;
  this.radiusY = 150;
  this.angle = 0;
  this.stepCount = 4;
  this.linejitter = 5;
}

function createGUI() {
  let gui = new dat.GUI();
  gui.add(oioi, 'radiusX', 0, 500).name("Pattern Width").onChange(redraw);
  gui.add(oioi, 'radiusY', 0, 500).name("Pattern Height").onChange(redraw);
  gui.add(oioi, 'numAngles', 0, 50).name("# of Angles").onChange(redraw);
  gui.add(oioi, 'spacingX', 5, 500).step(5).onChange(redraw);
  gui.add(oioi, 'spacingY', 5, 500).step(5).onChange(redraw);
  gui.add(oioi, 'xjitter', 0, 100).step(5).onChange(redraw);
  gui.add(oioi, 'yjitter', 0, 100).step(5).onChange(redraw);
  gui.add(oioi, 'linejitter', 0, 100).step(5).onChange(redraw);
  gui.add(p, 'radiusX', 0, 500).name("Radius - X").onChange(redraw);
  gui.add(p, 'radiusY', 0, 500).name("Radius - Y").onChange(redraw);
  gui.add(p, 'angle', 0, 1440).name("Rotation").onChange(redraw);
  gui.add(p, 'stepCount', 1, 50).step(1).name("# of Angles").onChange(redraw);
}