// // Action platformer game
// // Bat-Erdene Lkhagvasuren
// // April 22 2026

// let finn;
// let hearts;
// let state = "idle";
// let hit = false;
// let gate = false;

// function preload() {
//   finnImg = loadImage("sprites/FinnSprite.png");
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   finn = new Sprite(width/2, height/2, finnImg, 28);
//   hearts = 5;
// }



// function draw() {
//   background(220);

//   finn.update();
//   finn.display();

//   text(hearts, 0, 50);
//   rect(100, 100, 80, 30);
//   rect(mouseX, mouseY, 50, 75);

//   hit = collideRectRect(100, 100, 80, 30, mouseX, mouseY, 50, 75);

//   stroke(hit ? color('red') : 100);
//   print('colliding?', hit);

//   // debounce so that only one live gets reduced
//   if (hit && gate === false) {
//     hearts--;
//     gate = true;
//   }

//   if (!hit) {
//     gate = false;
//   }
  
// }

// class Sprite {
//   constructor(x, y, image, frameCount) {
//     this.x = x;
//     this.y = y;
//     this.image = image;
//     this.frameCount = frameCount;
//     this.speed = 1;
//     this.gravity = 5;

//     this.frame = 0;
//     this.frameDelay = 300; // milliseconds
//     this.lastFrameTime = 0;
//     this.state = "idle";
//   }

//   update() {
//     // control animation speed ++ to make the animation work so that it shows different animations for different states
//     if (millis() > this.lastFrameTime + this.frameDelay && this.state === "idle") {
//       for (let i = 0; i < 9; i++) {
//         this.frame = (this.frame + 1) % this.frameCount;
//       }
//       this.lastFrameTime = millis();
//     }

//     // movements: left, right
//     if (keyIsDown(68)) {
//       this.x += this.speed;
//     }
//     if (keyIsDown(65)) {
//       this.x -= this.speed;
//     }

//     if (this.y > height && this.state === "jump") {
//       this.y += this.gravity;
//       if (this.y >= height) {
//         this.state = "idle";
//       }
//     }
//     if (keyIsDown(87)) {
//       for (let i = 0; i < 5; i++) {
//         this.y --;
//       }
//       this.state = "jump";
//     }

//   }

//   display() {
//     let frameWidth = this.image.width / this.frameCount;
//     let frameHeight = this.image.height;
//     const FINNWIDTH = frameWidth - 15;
//     const FINNHEIGHT = frameHeight - 10;
//     rect(this.x + 5, this.y + 5, FINNWIDTH, FINNHEIGHT);
//     noSmooth();
//     image(
//       this.image,
//       this.x,
//       this.y,
//       frameWidth,
//       frameHeight,
//       this.frame * frameWidth, // crop X
//       0,                       // crop Y
//       frameWidth,
//       frameHeight
//     );
//   }
// }

// let Engine = Matter.Engine,
//     Render = Matter.Render,
//     Runner = Matter.Runner,
//     Bodies = Matter.Bodies,
//     Composite = Matter.Composite;

const {Engine, Render, Runner, Bodies, Composite} = Matter;

let engine;
let render;
let boxA;
let runner;
let ground;

// create an engine
function setup() {
  noCanvas();
  engine = Engine.create();

  // create a renderer
  render = Render.create({
    element: document.body,
    engine: engine,

    // canvas size
    options: {
      width: 800,
      height: 800
    }
  });
  boxA = Bodies.rectangle(100, 100, 40, 40);
  ground = Bodies.rectangle(410, 300, 800, 50, {isStatic: true});

  Composite.add(engine.world, [boxA, ground]);
  
  Render.run(render);

  runner = Runner.create();
  Runner.run(runner, engine);
}



// create two boxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
// var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// // add all of the bodies to the world
// Composite.add(engine.world, [boxA, boxB, ground]);

// // run the renderer

// // create runner
// var runner = Runner.create();

// // run the engine
// Runner.run(runner, engine);