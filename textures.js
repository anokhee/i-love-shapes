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

  To-do: 
  - Consolidate Pattern() and Shape() classes into one Shape() class
  - Performance optimization for Outline Shape
*/

let p;
let oioi;
let palette;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  p = new Shape(15, 15, 0, 0, 35);
  oioi = new Pattern(25, 5, 5, 40, 40, 0, 0, 0);
  palette = new Palette();
  createGUI();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  strokeWeight(palette.strokeWeight);
  background(palette.shapeFill);
  for (let repeatX = windowWidth / 2 - p.radiusX * 20; repeatX < windowWidth / 2 + p.radiusX * 20; repeatX += oioi.spacingX) {
    for (let repeatY = windowHeight / 2 - p.radiusY * 20; repeatY < windowHeight / 2 + p.radiusY * 20; repeatY += oioi.spacingY) {
      drawPattern(oioi, repeatX + (Math.random() * (oioi.xjitter)), repeatY + (Math.random() * (oioi.yjitter)));
    }
  }
  drawShape();
}

function drawShape() {
  beginShape();
  fill(palette.backgroundFill);
  vertex(-15, -15);
  vertex(windowWidth + 15, -15);
  vertex(windowWidth + 15, windowHeight + 15);
  vertex(-15, windowHeight + 15);
  beginContour();
  strokeWeight(palette.shapeStrokeWeight);
  for (i = 0; i < p.numAngles + 1; i++) {
    let radiusX = p.radiusX + (Math.random() * p.linejitter);
    let radiusY = p.radiusY + (Math.random() * p.linejitter);
    x = (radiusX * Math.sin(p.angle)) * 10;
    y = (radiusY * Math.cos(p.angle)) * 10;
    vertex(windowWidth / 2 - x, windowHeight / 2 - y);
    p.angle += (Math.PI * 2) / p.numAngles;
  }
  endContour();
  endShape();
}

function drawPattern(shape, xPos, yPos) {
  beginShape();
  fill(random(palette.patternFill1), random(palette.patternFill2), random(palette.patternFill3));
  strokeWeight(palette.patternStrokeWeight);
  // stroke(palette.strokeColor);
  for (var i = 0; i <= oioi.numAngles; i++) {
    let radiusX = oioi.radiusX + (Math.random() * (oioi.linejitter));
    let radiusY = oioi.radiusY + Math.random() * (oioi.linejitter);
    var x = Math.cos(radians(i * (360) / oioi.numAngles)) * radiusX;
    var y = Math.sin(radians(i * (360) / oioi.numAngles)) * radiusY;
    vertex(xPos - x, yPos - y);
  }
  endShape();
  noLoop();

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

function Shape(rx, ry, l, a, nA) {
  this.radiusX = rx;
  this.radiusY = ry;
  this.linejitter = l;
  this.angle = a;
  this.numAngles = nA;
}

function Palette() {
  this.shapeFill = [255, 255, 255];
  this.patternFill1 = [255, 255, 255];
  this.patternFill2 = [255, 255, 255];
  this.patternFill3 = [255, 255, 255];
  this.strokeColor = 0;
  this.backgroundFill = [255];
  this.shapeStrokeWeight = 1;
  this.patternStrokeWeight = 1;
}

function createGUI() {
  let gui = new dat.GUI();
  let shapeMenu = gui.addFolder('Outline Shape');
  shapeMenu.add(p, 'radiusX', 0, 50).step(1).name("Radius - X").onChange(redraw);
  shapeMenu.add(p, 'radiusY', 0, 50).step(1).name("Radius - Y").onChange(redraw);
  shapeMenu.add(p, 'numAngles', 1, 50).step(1).name("# of Angles").onChange(redraw);
  shapeMenu.add(p, 'linejitter', 0, 20).step(1).name("Line Jitteriness").onChange(redraw);

  let patternMenu = gui.addFolder('Pattern Controls');
  patternMenu.add(oioi, 'radiusX', 1, 100).step(1).name('Radius').onChange(redraw);
  patternMenu.add(oioi, 'radiusY', 1, 100).step(1).name('Radius').onChange(redraw);
  patternMenu.add(oioi, 'spacingX', 5, 100).step(1).name('Spacing - X').onChange(redraw);
  patternMenu.add(oioi, 'spacingY', 5, 100).step(1).name('Spacing - Y').onChange(redraw);
  patternMenu.add(oioi, 'numAngles', 0, 50).step(1).name('# of Angles').onChange(redraw);
  patternMenu.add(oioi, 'xjitter', 0, 50).step(1).name('X Position - Jitteriness').onChange(redraw);
  patternMenu.add(oioi, 'yjitter', 0, 50).step(1).name('Y Position - Jitteriness').onChange(redraw);
  patternMenu.add(oioi, 'linejitter', 0, 50).step(1).name('Line Jitteriness').onChange(redraw);

  let stylesMenu = gui.addFolder('Styles');
  stylesMenu.add(palette, 'shapeStrokeWeight', 0, 15).onChange(redraw);
  stylesMenu.add(palette, 'patternStrokeWeight', 0, 15).onChange(redraw);
  stylesMenu.addColor(palette, 'shapeFill').onChange(redraw);
  stylesMenu.addColor(palette, 'patternFill1').onChange(redraw);
  stylesMenu.addColor(palette, 'patternFill2').onChange(redraw);
  stylesMenu.addColor(palette, 'patternFill3').onChange(redraw);
}