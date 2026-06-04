
// Matter.js
const { Engine, Bodies, Composite, Body, Events} = Matter;
let engine;
let balls = [];
let ground;


// Character
let finn;
let finnImg;
let finnBody;


// Character actions
let hit = false;
let gate = false;
let hearts = 5;
let moveSpeed = 7;
let jumpForce = -12;
let jumpCount = 0;
let maxJumps = 2;
let radius = 30;
let shurikenPng;
let shurikens = [];

// platformer grid
const CELL_SIZE = 50;
let grid;
let rows;
let cols;
let blockBodies = [];
let onGround = false;


function preload() {
  finnImg = loadImage("sprites/FinnSprite.png");
  shurikenPng = loadImage("assets/ninja_star.png");
}

function setup() {
  createCanvas(2000, 700);

  //Platformer grids
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateEmptyGrid(cols, rows);
  
  // Matter.js engine
  engine = Engine.create();
  reBuildBlocks();

  // character and ground collision detection
  Events.on(engine, "collisionActive", function(event) {

    for (let pair of event.pairs) {

      if (
        pair.bodyA === finnBody ||
      pair.bodyB === finnBody
      ) {

        // Collision is mostly vertical
        if (Math.abs(pair.collision.normal.y) > 0.8) {

          // Falling downward
          if (finnBody.velocity.y >= 0) {
            jumpCount = 0;
          }
        }
      }
    }
  });

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
    30, 
    60,
    {
      friction: 0,
      restitution: 0,
      frictionAir: 0.05,
      inertia: Infinity
    }
  );

  Composite.add(engine.world, [ground, finnBody]);

  // Finn sprite
  finn = new Sprite(finnBody.position.x, finnBody.position.y, finnImg, 9);
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
  background(220);
  displayGrid();
  characterHealth();

  // Update physics engine
  Engine.update(engine);

  characterActions();

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

// Actions of the character
function characterActions() {
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
  // Attack
  if (keyIsDown()) {

  }

  if (!keyIsDown(65) && !keyIsDown(68)) {
    Body.setVelocity(finnBody, {
      x: 0,
      y: finnBody.velocity.y
    });
  }

  rect(
    finnBody.position.x,
    finnBody.position.y,
    30,
    50
  );
  
  finn.update(finnBody);
  finn.display();
}

// Calculates the hearlth of the character after it takes damage
function characterHealth() {
  // Hearts display
  fill(0);
  textSize(32);
  textAlign(LEFT, TOP);
  text("Hearts: " + hearts, 20, 50);
  
  // COLLISION TEST RECT
  rectMode(CENTER);
  fill("blue");
  rect(300, 500, 80, 30);
  fill("green");
  rect(finnBody.position.x, finnBody.position.y, 30, 50);

  hit = collideRectRect(
    300,
    500,
    80,
    30,
    finnBody.position.x,
    finnBody.position.y,
    50,
    50
  );

  // Lose one heart only once per touch
  if (hit && gate === false) {
    hearts--;
    gate = true;
  }

  if (!hit) {
    gate = false;
  }
}

function keyPressed() {
  // W key
  if (key === "w" || key === "W" || key === " ") {
    if (jumpCount < maxJumps) {

      Body.setVelocity(finnBody, {
        x: finnBody.velocity.x,
        y: jumpForce
      }
      );
      jumpCount++;
    }
  }
  if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
    reBuildBlocks();
  }

  if (key === "e") {
    let shuriken = new Shuriken(finnBody.position.x + 20, finnBody.position.y, 10, shurikenPng);
    shurikens.push(shuriken);
  }
}

// Platformer grids
////////////////////////////////////////////////////////////////////////////////////////

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure the cell actually exists!
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }

    reBuildBlocks();
  }
}

function displayGrid() {
  rectMode(CORNER);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      if (grid[y][x] === 1) {
        fill("black");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

// function that adds matter.js blocks in the place of toggled grid
function reBuildBlocks() {
  // remove old blocks
  for (let block of blockBodies) {
    Composite.remove(engine.world, block);
  }

  blockBodies = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1)  {

        let block = Bodies.rectangle(
          x * CELL_SIZE + CELL_SIZE / 2,
          y * CELL_SIZE + CELL_SIZE / 2,
          CELL_SIZE,
          CELL_SIZE,
          { isStatic: true }
        );

        blockBodies.push(block);
      }
    }
  }
  
  Composite.add(engine.world, blockBodies);
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

class Shuriken {
  constructor(x, y, dx, theImage) {
    this.x = x;
    this.y = y;
    this.speed = dx;
    this.image = theImage;
  }

  display() {
    image(this.x, this.y, theImage);
  }

  uptade() {
  }
}


