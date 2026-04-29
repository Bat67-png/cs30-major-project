// Action platformer game
// Bat-Erdene Lkhagvasuren
// April 22 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// const {Engine, Body, Bodies, Composite, Render, Runner} = Matter;

// first sprite
let finn;

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
  createCanvas(windowWidth, windowHeight);
  frame = 0;
  // engine = Engine.create();

  // render = Render.create({
  //   element: document.body,
  //   engine: engine,
  //   options: {
  //     width: 400,
  //     height: 400
  //   }
  // });

  // Render.run(render);
  // boxA = Bodies.rectangle(400, 200, 80, 80);
  // boxB = Bodies.rectangle(450, 50, 80, 80);
  // ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  finn = new Sprite(width/2, height/2, );
}

function draw() {
  background(220);
  finn.display();
  finn.uptade();
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

class Sprite {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
  }

  display() {
    image(this.image, this.x, this.y);
  }

  frameUptade() {
    animatedSprite();
  }
}
