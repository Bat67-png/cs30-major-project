// Action platformer game
// Bat-Erdene Lkhagvasuren
// April 22 2026

let finn;
let hearts;
let state = "idle";

function preload() {
  finnImg = loadImage("sprites/FinnSprite.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  finn = new Sprite(width/2, height/2, finnImg, 28);
  hearts = 5;
}

function draw() {
  background(220);

  finn.update();
  finn.display();

  text(hearts, 0, 50);
  rect(width/2 + 50, height/2, 100, 50);
}

class Sprite {
  constructor(x, y, image, frameCount) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.frameCount = frameCount;
    this.speed = 1;
    this.gravity = 5;

    this.frame = 0;
    this.frameDelay = 300; // milliseconds
    this.lastFrameTime = 0;
    this.state = "idle";
  }

  update() {
    // control animation speed ++ to make the animation work so that it shows different animations for different states
    if (millis() > this.lastFrameTime + this.frameDelay && this.state === "idle") {
      for (let i = 0; i < 9; i++) {
        this.frame = (this.frame + 1) % this.frameCount;
      }
      this.lastFrameTime = millis();
    }

    // movements: left, right
    if (keyIsDown(68)) {
      this.x += this.speed;
    }
    if (keyIsDown(65)) {
      this.x -= this.speed;
    }

    if (this.y > height && this.state === "jump") {
      this.y += this.gravity;
      if (this.y >= height) {
        this.state = "idle";
      }
    }
    if (keyIsDown(87)) {
      for (let i = 0; i < 5; i++) {
        this.y --;
      }
      this.state = "jump";
    }

  }

  display() {
    let frameWidth = this.image.width / this.frameCount;
    let frameHeight = this.image.height;
    rect(this.x + 5, this.y + 5, frameWidth - 15, frameHeight - 10);
    noSmooth();
    image(
      this.image,
      this.x,
      this.y,
      frameWidth,
      frameHeight,
      this.frame * frameWidth, // crop X
      0,                       // crop Y
      frameWidth,
      frameHeight
    );
    stroke("red");
  }
}

