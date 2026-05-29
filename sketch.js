
// Matter.js
const { Engine, Bodies, Composite, Body } = Matter;
let engine;
let balls = [];
let ground;


// Character
let finn;
let finnImg;
let mcBox;
let finnBody;


// Character actions
let hit = false;
let gate = false;
let hearts = 5;
let moveSpeed = 7;
let jumpForce = -12;
let jumpCount = 0;
let extraJumps = 1;
let radius = 30;

// Platforms
let tiles;
let levelBackground;
let platform, coin, exclamationBox, fly, p1, slime, empty;
let tilesHigh, tilesWide;
let tileWidth, tileHeight;
let levelToLoad;
let lines;

function preload() {
  finnImg = loadImage("sprites/FinnSprite.png");
}

function setup() {
  createCanvas(windowWidth, 700);

  //platformer grids
  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = width / tilesWide;
  tileHeight = height / tilesHigh;

  tiles = createEmpty2dArray(tilesWide, tilesHigh);

  //put values into 2d array of characters
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      tiles[y][x] = tileType;
    }
  }

  
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
      friction: 0.1,
      restitution: 0,
      frictionAir: 0.02
    }
  );

  Composite.add(engine.world, [ground, finnBody]);

  // Finn sprite
  finn = new Sprite(finnBody.position.x, finnBody.position.y, finnImg, 9);
}

// Platformer draw functions
function display() {
  image(levelBackground, 0, 0, width, height);

  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(tiles[y][x], x, y);
    }
  }
}
function showTile(location, x, y) {
  if (location === "#") {
    fill("red");
    rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "C") {
    fill("green");
    rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "B") {
    rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "F") {
    rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "P") {
    rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "S") {
    rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else {
    rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
}

function createEmpty2dArray(cols, rows) {
  let randomGrid = [];
  for (let y = 0; y < rows; y++) {
    randomGrid.push([]);
    for (let x = 0; x < cols; x++) {
      randomGrid[y].push(0);
    }
  }
  return randomGrid;
}

function draw() {
  display();

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
  if (keyIsDown(68)) { // D key
    Body.setVelocity(finnBody, {
      x: moveSpeed,
      y: finnBody.velocity.y
    });
  }

  rect(
    finnBody.position.x,
    finnBody.position.y,
    50,
    50
  );
  
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
    if (jumpCount < extraJumps) {

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

