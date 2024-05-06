var letters1;
var font;
var horizontalSquish = 0.9;

function preload() {
  font = loadFont('static/cmunrm.ttf');
}

function setup() {
  textFont(font);
  textSize(100);

  let title = "Brendan D'Aquino"
  let canvasHeight = 300;
  let hScale = 1.5;
  let canvasWidth = (wordWidth(title)) * hScale;
  let startX = wordWidth(title) * (hScale - 1) / 2;
  let startY = canvasHeight * 0.5;

  letters1 = new Array(title.length);
  // Initialize letters1 at the correct x location
  for (let i = 0; i < title.length; i++) {
      letters1[i] = new Letter(startX, startY, random(-10, 10), random(-10, 10), title.charAt(i));
      startX += horizontalSquish * textWidth(title.charAt(i));
  }

  createCanvas(canvasWidth, canvasHeight);
}

function wordWidth(word) {
  let res = 0;
  for (let i = 0; i < word.length; i++) {
    res += textWidth(word.charAt(i));
  }
  return horizontalSquish * res;
}

function draw() {
  background(255);
  for (let i = 0; i < letters1.length; i++) {
      // If not, they return to their original location
      if (mouseIsPressed) {
          letters1[i].impulse();
      } else {
      // letters1[i].home();
      }
      letters1[i].move();
  }
}

class Letter {
  constructor(x_, y_, v_x_, v_y_, letter_) {
    this.homex = this.x = x_;
    this.homey = this.y = y_;
    this.letter = letter_;
    this.v_x = v_x_;
    this.v_y = v_y_;
  }

  // Display the letter
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.v_x / 20);
    shearX((this.homex - this.x) / 300);
    scale(pow(3, -1 * pow(0.01 * (this.x - this.homex), 2)));
    fill(33,32,19);
    textAlign(LEFT_ARROW);
    text(this.letter, 0, 0);
    pop();
  }

  impulse() {
    var distance = dist(this.x, this.y, mouseX, mouseY);
    var thingX = pow(0.1 * distance, -1) * (this.x - mouseX) / abs(this.x - mouseX);
    var thingY = pow(0.1 * distance, -1) * (this.y - mouseY) / abs(this.y - mouseY);
    this.v_x = 30 * constrain(thingX, -10, 10);
    this.v_y = 30 * constrain(thingY, -10, 10);
  }

  move() {
    var d_x = this.x - this.homex;
    var d_y = this.y - this.homey;
    this.v_x += -0.1 * d_x - 0.1 * this.v_x;
    this.v_y += -0.1 * d_y - 0.1 * this.v_y;
    this.x += this.v_x;
    this.y += this.v_y;
    if (abs(this.x - this.homex) < 0.1 && abs(this.v_x) < 0.1) {
        this.x = this.homex;
        this.v_x = 0;
    }
    if (abs(this.y - this.homey) < 0.1 && abs(this.v_y) < 0.1) {
        this.y = this.homey;
        this.v_y = 0;
    }
    this.display();
  }
}

