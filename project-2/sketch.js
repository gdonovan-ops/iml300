function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  noFill();
  stroke(255);
  for (let i = 0; i < 20; i++) {
    let x = i * 80 + 40;
    let y = height - (frameCount * 2 + i * 70) % height;
    circle(x, y, 30);
  }
}