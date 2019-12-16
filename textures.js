function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  for (let repeatX = windowWidth / 2 - 200; repeatX < windowWidth / 2 + 200; repeatX += 10) {
    for (let repeatY = windowHeight / 2 - 200; repeatY < windowHeight / 2 + 200; repeatY += 10) {
      drawShape(repeatX, repeatY);
    }
  }
}

function drawShape(xPos, yPos) {
  let numAngles = 100;
  beginShape();
  for (var i = 0; i <= numAngles; i++) {
    let radius = 15 + random(5);
    var x = cos(radians(i * (360) / numAngles)) * radius;
    var y = sin(radians(i * (360) / numAngles)) * radius;
    vertex(xPos - x, yPos - y);
  }
  endShape();
  noLoop();
}