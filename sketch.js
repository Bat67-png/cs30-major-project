// Action platformer game
// Bat-Erdene Lkhagvasuren
// April 22 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let spritesheet;
let frame;
let frameSwitchTime = 300;
let lastFrameSwap = 0;
let frameSwitch = false;
const FINNFRAMES = 28;

function preload() {
  spritesheet = loadImage("sprites/FinnSprite.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frame = 0;
}

function draw() {
  background(220);
  animatedSprite();
  image(spritesheet, mouseX, mouseY, spritesheet.width/28, spritesheet.height, frame, 0, spritesheet.width/28, spritesheet.height);
}

function keyPressed() {
  if (key === "n") {
    frame += spritesheet.width/28;
  }
}

function animatedSprite() {
  if (millis() > lastFrameSwap + frameSwitchTime) {
    frameSwitch = !frameSwitch;
    lastFrameSwap = millis();
  }

  if (frameSwitch) {
    if (frame < FINNFRAMES) {
      frame += spritesheet.width/28;
      frameSwitch = !frameSwitch;
    }
    else {
      frame = 0;
      frameSwitch = !frameSwitch;
    }
  }
}