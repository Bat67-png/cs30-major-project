// Action platformer game
// Bat-Erdene Lkhagvasuren
// April 22 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let spritesheet;

function preload() {
  spritesheet = loadImage("sprites/FinnSprite.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 50);
}
