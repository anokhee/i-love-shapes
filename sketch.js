let p;
let x;
let y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = new Planet();
  console.log("Planet generated.");
  let gui = new dat.GUI();
  gui.add(p, 'radius', 0, 500);
  gui.add(p, 'stepCount', 0, 50)

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  noStroke();
  background(100);
  makePlanet();
}

function Planet() {
  this.radius = 200;
  this.angle = 0;
  this.stepCount = 5;
  this.step = TWO_PI / this.stepCount;
  this.angle = 0;
}

function makePlanet() {
  beginShape();
  for (i = 0; i < p.stepCount + 1; i++) {
    x = p.radius * sin(p.angle);
    y = p.radius * cos(p.angle);
    vertex(windowWidth / 2 - x, windowHeight / 2 - y);
    p.angle = p.angle + p.step;
    if (i >= p.stepCount) {
      endShape();
    }
  }
}