/*
  Shape() 
  The Shape() function creates a rectangle with a custom shape contoured into it. 
  In the GUI menu, the contoured shape is referred to as the 'Outline Shape'. 
  - Width: Controls the width (x-radius) of the Outline Shape
  - Height: Controls the height (y-radius) of the Outline Shape
  - # of Angles: Controls the number of angles the shape will have. 
       3 = triangle,
       4 = rectangle/rhombus,
       5 = pentagon,
       and so on....
  - Line Jitteriness: Increases the squiggliness of a line - can produce a hand drawn look

  Pattern()
  The Pattern() function creates a repeating Pattern within the Outline Shape.
  - Radius: Controls the width & height of each shape appearing in the Pattern
  - Spacing X: Increases spacing along the x-axis
  - Spacing Y: Increases spacing along the y-axis
  - Jitteriness - X: Increases the jitteriness of the X position of each shape (offsets it within a certain range)
  - Jitteriness - Y: ^^ on the Y position
  - Line Jitteriness: (See in Shape()) Increases the squiggliness of the line
*/

let p;
let oioi;

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = new Shape(150, 150, 0, 0, 3);
  oioi = new Pattern(10, 12, 40, 40, 0, 0, 0);
  createGUI();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  strokeWeight(5);
  background(255);
  for (let repeatX = windowWidth / 2 - p.radiusX * 2; repeatX < windowWidth / 2 + p.radiusX * 2; repeatX += oioi.spacingX) {
    for (let repeatY = windowHeight / 2 - p.radiusY * 2; repeatY < windowHeight / 2 + p.radiusY * 2; repeatY += oioi.spacingY) {
      drawShape(oioi, repeatX + random(oioi.xjitter), repeatY + random(oioi.yjitter));
    }
  }
  beginShape();
  vertex(0, 0);
  vertex(windowWidth, 0);
  vertex(windowWidth, windowHeight);
  vertex(0, windowHeight);
  beginContour();
  for (i = 0; i < p.numAngles + 1; i++) {
    x = (p.radiusX) * sin(p.angle) + random(p.linejitter);
    y = p.radiusY * cos(p.angle) + random(p.linejitter);
    vertex(windowWidth / 2 - x, windowHeight / 2 - y);
    p.angle += TWO_PI / p.numAngles;
  }
  endContour();
  endShape();
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

function Pattern(a, r, sx, sy, xj, yj, l) {
  this.numAngles = a;
  this.radius = r;
  this.spacingX = sx;
  this.spacingY = sy;
  this.xjitter = xj;
  this.yjitter = yj;
  this.linejitter = l;
}

function Shape(rx, ry, l, a, nA) {
  this.radiusX = rx;
  this.radiusY = ry;
  this.linejitter = l;
  this.angle = a;
  this.numAngles = nA;
}

function createGUI() {
  let gui = new dat.GUI();
  let shapeMenu = gui.addFolder('Outline Shape');
  shapeMenu.add(p, 'radiusX', 0, 500).step(1).name("Radius - X").onChange(redraw);
  shapeMenu.add(p, 'radiusY', 0, 500).step(1).name("Radius - Y").onChange(redraw);
  shapeMenu.add(p, 'numAngles', 1, 50).step(1).name("# of Angles").onChange(redraw);
  shapeMenu.add(p, 'linejitter', 0, 200).step(1).name("Line Jitteriness").onChange(redraw);

  let patternMenu = gui.addFolder('Pattern Controls');
  patternMenu.add(oioi, 'radius', 0, 50).step(1).name('Radius').onChange(redraw);
  patternMenu.add(oioi, 'spacingX', 0, 50).step(1).name('Spacing - X').onChange(redraw);
  patternMenu.add(oioi, 'spacingY', 0, 50).step(1).name('Spacing - Y').onChange(redraw);
  patternMenu.add(oioi, 'numAngles', 0, 50).step(1).name('# of Angles').onChange(redraw);
  patternMenu.add(oioi, 'xjitter', 0, 50).step(1).name('X Position - Jitteriness').onChange(redraw);
  patternMenu.add(oioi, 'yjitter', 0, 50).step(1).name('Y Position - Jitteriness').onChange(redraw);
  patternMenu.add(oioi, 'linejitter', 0, 50).step(1).name('Line Jitteriness').onChange(redraw);
}