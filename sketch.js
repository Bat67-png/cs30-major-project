
// Matter.js
const { Engine, Bodies, Composite, Body, Events} = Matter;
let engine;
let balls = [];
let ground;
let gamemode = "menu";


// Character
let finn;
let finnImg;
let finnBody;
let attackTimer = 0;
let state = "idle";
const FLEFT = -1;
const FRIGHT = 1;
let facing = FLEFT;


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
let attack = false;

// platformer grid
const CELL_SIZE = 50;
let grid;
let rows;
let cols;
let blockBodies = [];
let onGround = false;
let wallpaper;


function preload() {
  finnImg = loadImage("sprites/FinnSprite.png");
  shurikenPng = loadImage("assets/ninja_star.png");
  wallpaper = loadImage("assets/background.jpg");
}

function setup() {
  createCanvas(1500, 700);

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
  if (gamemode === "start") {
    image(wallpaper, 0, 0, width, height);
  }

  if (gamemode === "menu") {
    background('darkblue');
  }

  // Game starts
  if (gamemode === "start") {
    displayGrid();
    characterHealth();

    // Update physics engine
    Engine.update(engine);

    // character actions such as attacking and movements
    characterActions();

    // Ground
    noStroke();
    fill(0, 0, 255, 50);
    rectMode(CENTER);
    rect(
      ground.position.x,
      ground.position.y,
      width,
      20
    );

    // long distance attack
    for (let i = shurikens.length - 1; i >= 0; i--) {

  shurikens[i].update();
  shurikens[i].display();

  if (
    shurikens[i].x < -100 ||
    shurikens[i].x > width + 100
  ) {
    shurikens.splice(i, 1);
  }
}

    console.log(attack);
  }

  // Main menu of the game
  if (gamemode === "menu") {
    drawMenu();
  }
}

function drawMenu() {

  textAlign(CENTER, CENTER);

  // Title
  fill(255);
  textSize(70);
  text("Who is the Boss?", width / 2, 140);

  // Subtitle
  textSize(26);
  text("Press any KEY to Start", width / 2, 300);

  // Controls
  textSize(22);
  text("A / D = Move", width / 2, 400);
  text("W or SPACE = Jump", width / 2, 440);
  text("E = Attack", width / 2, 480);
  text("X = Throw Shuriken", width / 2, 520);
}

// Actions of the character
function characterActions() {
  if (keyIsDown(65)) { // A
  facing = FLEFT;

  Body.setVelocity(finnBody, {
    x: -moveSpeed,
    y: finnBody.velocity.y
  });
}

if (keyIsDown(68)) { // D
  facing = FRIGHT;

  Body.setVelocity(finnBody, {
    x: moveSpeed,
    y: finnBody.velocity.y
  });
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

  if (attack) {
    noStroke();
    fill('red');
    rectMode(CENTER);
    rect(finnBody.position.x + 20 * facing, finnBody.position.y, 60, 40);

    attackTimer--;
    
    if (attackTimer <= 0) {
      attack = false;
    }
  }

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
  if (key === "p") {
    grid = generateEmptyGrid(cols, rows);
    reBuildBlocks();
  }

  if (key === "x") {

  let offset = 20 * facing;
  let speed = 10 * facing;

  let shuriken = new Shuriken(
    finnBody.position.x + offset,
    finnBody.position.y,
    speed,
    shurikenPng
  );

  shurikens.push(shuriken);
}

  if (key === "d") {
    facing = FRIGHT;
  }
  if(key === "a") {
    facing = FLEFT;
  }

  if (gamemode === "menu") {
    gamemode = "start";
  }

  // Attack
  if (key === "e") {
    attack = true;
    attackTimer = 20;
  }

  // attack cancel function 
  // if () {
  //   attack = false;
  // }

  
}

// Platformer grids
////////////////////////////////////////////////////////////////////////////////////////

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x, y);

  console.log(grid);
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

    push();

translate(this.x, this.y);

if (facing === FLEFT) {
  scale(-1, 1);
}

image(
  this.image,

  0,
  0,

  100,
  100,

  this.frame * frameWidth,
  0,
  frameWidth,
  frameHeight
);

pop();
  }
}

// Work on this to create a long distance attack
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Shuriken {
  constructor(x, y, dx, theImage) {
    this.x = x;
    this.y = y;
    this.speed = dx;
    this.image = theImage;
  }

  display() {
    image(this.image, this.x, this.y, this.image.width * 5, this.image.height * 5);
  }

  update() {
    this.x += this.speed;
  }
}

