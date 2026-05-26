const { Engine, Bodies, Composite } = Matter;

let engine;
let balls = [];
let ground;
let radius = 30;

let finn;
let finnImg;
let mcBox;
let finnBody;

let hearts = 5;
let hit = false;
let gate = false;

function preload() {
  finnImg = loadImage("sprites/FinnSprite.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Matter.js engine
  engine = Engine.create();

  ground = Bodies.rectangle(
    width / 2,
    height - 50,
    width,
    20,
    { isStatic: true }
  );

  finnBody = Bodies.rectangle(
    width / 2, height / 2, 50, 50
  );

  Composite.add(engine.world, ground);

  // Finn sprite
  finn = new Sprite(width / 2, height / 2, finnImg, 28);
}

function draw() {
  background(220);

  // Update physics engine
  Engine.update(engine);

  // ----------------------------
  // FINN
  // ----------------------------
  finn.update();
  finn.display();

  // Hearts display
  fill(0);
  textSize(32);
  text("Hearts: " + hearts, 20, 50);

  // ----------------------------
  // COLLISION TEST RECT
  // ----------------------------
  fill("blue");
  rect(100, 100, 80, 30);

  fill("green");
  rect(mouseX, mouseY, 50, 75);

  hit = collideRectRect(
    100,
    100,
    80,
    30,
    mouseX,
    mouseY,
    50,
    75
  );

  stroke(hit ? color("red") : 100);

  // Lose one heart only once per touch
  if (hit && gate === false) {
    hearts--;
    gate = true;
  }

  if (!hit) {
    gate = false;
  }

  // ----------------------------
  // MATTER.JS BALLS
  // ----------------------------
  noStroke();
  fill("red");

  for (let ball of balls) {
    circle(ball.position.x, ball.position.y, radius * 2);
  }

  // Ground
  fill("black");
  rectMode(CENTER);
  rect(
    ground.position.x,
    ground.position.y,
    width,
    20
  );
}

function mousePressed() {
  let ball = Bodies.circle(mouseX, mouseY, radius);

  Composite.add(engine.world, ball);

  balls.push(ball);
}

// SPRITE CLASS

class Sprite {
  constructor(x, y, image, frameCount) {
    this.x = x;
    this.y = y;

    this.image = image;
    this.frameCount = frameCount;

    this.speed = 5;
    this.gravity = 5;

    this.frame = 0;
    this.frameDelay = 120;
    this.lastFrameTime = 0;

    this.state = "idle";
  }

  update() {

    // Animation
    if (
      millis() > this.lastFrameTime + this.frameDelay
    ) {
      this.frame =
        (this.frame + 1) % this.frameCount;

      this.lastFrameTime = millis();
    }

    // Movement
    if (keyIsDown(68)) {
      this.x += this.speed;
    }

    if (keyIsDown(65)) {
      this.x -= this.speed;
    }

    // Jump
    if (keyIsDown(87)) {
      this.y -= 5;
      this.state = "jump";
    }

    // Fake gravity
    if (this.y < height / 2) {
      this.y += this.gravity * 0.5;
    }
  }

  display() {

    let frameWidth =
      this.image.width / this.frameCount;

    let frameHeight =
      this.image.height;

    noSmooth();

    image(
      this.image,
      this.x,
      this.y,
      frameWidth,
      frameHeight,

      this.frame * frameWidth,
      0,

      frameWidth,
      frameHeight
    );
  }
}