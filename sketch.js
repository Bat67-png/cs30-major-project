// Action platformer game
// Bat-Erdene Lkhagvasuren
// April 22 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const {Engine, Body, Bodies, Composite, Render, Runner} = Matter;

let spritesheet;
let frame;
let frameSwitchTime = 300;
let lastFrameSwap = 0;
let frameSwitch = false;

// matter.js
let engine;
let world;
let render;
let sprite;
let boxA;
let boxB;

const FINNFRAMES = 28;

function preload() {
  spritesheet = loadImage("sprites/FinnSprite.png");
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  // frame = 0;
  noCanvas();
  engine = Engine.create();

  render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 400,
      height: 400
    }
  });

  // Render.run(render);
  // boxA = Bodies.rectangle(400, 200, 80, 80);
  // boxB = Bodies.rectangle(450, 50, 80, 80);
  // ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
}

// function draw() {
//   background(220);
//   animatedSprite();
//   image(spritesheet, mouseX, mouseY, spritesheet.width/28, spritesheet.height, frame, 0, spritesheet.width/28, spritesheet.height);
// }

// function keyPressed() {
//   if (key === "n") {
//     frame += spritesheet.width/28;
//   }
// }

// function animatedSprite() {
//   if (millis() > lastFrameSwap + frameSwitchTime) {
//     frameSwitch = !frameSwitch;
//     lastFrameSwap = millis();
//   }

//   if (frameSwitch) {
//     if (frame < FINNFRAMES) {
//       frame += spritesheet.width/28;
//       frameSwitch = !frameSwitch;
//     }
//     else {
//       frame = 0;
//       frameSwitch = !frameSwitch;
//     }
//   }
// }

