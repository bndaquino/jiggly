var n = 35;
var r = 35;
var amp = 200;
var t = 0;
var inc = 0.005;
var balls = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	for (let i = 0; i < n; i++) {
		balls.push(new Ball(i * r, 0, i + 1, (1 - i/n) * amp));
	}
}

function draw() {
	let startX = windowWidth/2 - (n * r / 2);
	let startY = windowHeight/2;
	translate(startX, startY);
	background(255);

	balls.forEach((ball, i) => {
		ball.move();
		ball.display();
	});

	t += inc;
}

class Ball {
  constructor(x_, y_, f_, a_) {
    this.x = x_;
    this.y = y_;
		this.f = f_;
		this.a = a_;
  }
//
  display() {
    push();
		fill(0);
		let s = (0.75 + 0.25 * cos(t * this.f)) * (0.5 + 0.75*this.a/amp);
		ellipse(this.x, this.y, s * r, s * r);
    pop();
  }

  move() {
		this.y = this.a * sin(t * this.f);
  }
}
