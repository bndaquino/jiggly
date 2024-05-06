var dots = [];
var r = 5;
var n = 101;
var spacing = 55;
var h;

var eye;
var f = 500;

function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont("Georgia");

  eye = createVector(0, -f, 0)
  h = windowHeight/2;

  for (let x = 0; x < n; x++) {
    dots.push([]);
    for (let y = 0; y < n; y++) {
      dots[x].push(new Dot((-n/2 + x) * spacing, (-n/2 + y) * spacing, h));
    }
  }
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  translate(windowWidth/2, windowHeight/2);

  textSize(40);
  textStyle(BOLDITALIC);

  let msg = "jiggly wiggly"
  fill(255);
  text(msg, textWidth(msg)/-2, 0);

  fill(255, 200);
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      dots[y][x].move();
      dots[y][x].display();
    }
  }
}

class Dot {
  constructor(x_, y_, z_) {
    this.x = x_;
    this.y = y_;
    this.z = z_;
  }

  display() {
    let a = (f * this.x / (f + this.y));
    let c = (f * this.z / (f + this.y));
    ellipse(a, c, r, r);
  }

  move() {
    this.z = h - 300*noise(this.x/500 + 1000, this.y/500 + 1000, frameCount/100);
  }
}
