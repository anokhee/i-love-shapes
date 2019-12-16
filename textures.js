let oioi;

function setup() {
  createCanvas(windowWidth, windowHeight);
  oioi = new Shape(10, 12);
  createGUI();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  console.log(oioi.numAngles, oioi.radius);

  for (let repeatX = windowWidth / 2 - 200; repeatX < windowWidth / 2 + 200; repeatX += oioi.spacing) {
    for (let repeatY = windowHeight / 2 - 200; repeatY < windowHeight / 2 + 200; repeatY += oioi.spacing) {
      drawShape(oioi, repeatX + random(oioi.xjitter), repeatY + random(oioi.yjitter));
    }
  }
}

function drawShape(shape, xPos, yPos) {
  beginShape();
  for (var i = 0; i <= oioi.numAngles; i++) {
    let radius = oioi.radius + random(oioi.linejitter);
    var x = cos(radians(i * (360) / oioi.numAngles)) * radius;
    var y = sin(radians(i * (360) / oioi.numAngles)) * radius;
    vertex(xPos - x, yPos - y);
  }
  endShape();
  noLoop();
}

function Shape(a, r) {
  this.numAngles = a;
  this.radius = r;
  this.spacing = 10;
  this.xjitter = 0;
  this.yjitter = 0;
  this.linejitter = 0;
}

function createGUI() {
  let gui = new dat.GUI();
  gui.add(oioi, 'radius', 0, 50).name("Pattern Radius").onChange(redraw);
  gui.add(oioi, 'numAngles', 0, 50).name("# of Angles").onChange(redraw);
  gui.add(oioi, 'spacing', 5, 100).step(5).onChange(redraw);
  gui.add(oioi, 'xjitter', 0, 100).step(5).onChange(redraw);
  gui.add(oioi, 'yjitter', 0, 100).step(5).onChange(redraw);
  gui.add(oioi, 'linejitter', 0, 100).step(5).onChange(redraw);
}