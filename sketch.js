// Action platformer game
// Bat-Erdene Lkhagvasuren
// April 22 2026

let finn;

let idleFinn;

function preload() {
  spritesheet = loadImage("sprites/FinnSprite.png");
  idleFinn = loadImage("sprites/FinnSprite_idle.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  finn = new Sprite(width / 2, height / 2, idleFinn, 9);
}

function draw() {
  background(220);

  finn.update();
  finn.display();
}

class Sprite {
  constructor(x, y, image, frameCount) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.frameCount = frameCount;
    this.speed = 1;

    this.frame = 0;
    this.frameDelay = 300; // milliseconds
    this.lastFrameTime = 0;
  }

  update() {
    // control animation speed
    if (millis() > this.lastFrameTime + this.frameDelay) {
      this.frame = (this.frame + 1) % this.frameCount;
      this.lastFrameTime = millis();
    }

    // movements: left, right
    if (keyIsDown(68)) {
      this.x += this.speed;
    }
    if (keyIsDown(65)) {
      this.x -= this.speed;
    }
  }

  display() {
    let frameWidth = this.image.width / this.frameCount;
    let frameHeight = this.image.height;
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
  }
}