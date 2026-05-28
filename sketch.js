const { Engine, Bodies, Composite, Body } = Matter;

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

let moveSpeed = 7;
let jumpForce = -12;
let jumpCount = 0;
let maxJumps = 2;

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
    width / 2, 
    height / 2, 
    50, 
    50,
    {
      friction: 0.001,
      restitution: 0,
      frictionAir: 0.02
    }
  );

  Composite.add(engine.world, [ground, finnBody]);

  // Finn sprite
  finn = new Sprite(finnBody.position.x, finnBody.position.y, finnImg, 9);
}

function draw() {
  background(220);

  // Update physics engine
  Engine.update(engine);

  // ground detection. Jump reset
  if (finnBody.position.y > height - 100) {
    jumpCount = 0;
  }

  // FINN (Character)
  if (keyIsDown(65)) { // A key
    Body.setVelocity(finnBody, {
      x: -moveSpeed,
      y: finnBody.velocity.y
    });
  }
  
  finn.update(finnBody);
  finn.display();

  // Hearts display
  fill(0);
  textSize(32);
  text("Hearts: " + hearts, 20, 50);

  // COLLISION TEST RECT
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


  // MATTER.JS BALLS
  noStroke();
  fill(0, 0, 255, 50);

  // Ground
  rectMode(CENTER);
  rect(
    ground.position.x,
    ground.position.y,
    width,
    20
  );
}

function keyPressed() {
  // W key
  if (key === "w" || key === "w") {
    if (jumpCount < maxJumps) {

      Body.setVelocity(finnBody, {
        x: finnBody.velocity.x,
        y: jumpForce
      }
      );
      jumpCount++;
    }
  }
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

update(body) {

  // sync sprite position with Matter.js body
  this.x = body.position.x;
  this.y = body.position.y;

  // animation frames
  if (
    millis() > this.lastFrameTime + this.frameDelay
  ) {
    this.frame =
      (this.frame + 1) % this.frameCount;

    this.lastFrameTime = millis();
  }
}

display() {

  let frameWidth =
    this.image.width / 28;

  let frameHeight =
    this.image.height;

  imageMode(CENTER);
  noSmooth();

  image(
    this.image,

    // screen position
    this.x,
    this.y,

    // display size
    100,
    100,

    // spritesheet crop
    this.frame * frameWidth,
    0,
    frameWidth,
    frameHeight
  );
}
}

