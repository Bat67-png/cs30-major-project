// Action platformer game
// Bat-Erdene Lkhagvasuren
// April 22 2026

// let finn;

// function preload() {
//   finnImg = loadImage("sprites/FinnSprite.png");
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   finn = new Sprite();
//   finn.addAni();
// }

// function draw() {
//   background(220);

//   finn.update();
//   finn.display();
// }

// class Sprite {
//   constructor(x, y, image, frameCount) {
//     this.x = x;
//     this.y = y;
//     this.image = image;
//     this.frameCount = frameCount;
//     this.speed = 1;

//     this.frame = 0;
//     this.frameDelay = 300; // milliseconds
//     this.lastFrameTime = 0;
//     this.state = "idle";
//   }

//   update() {
//     // control animation speed
//     if (millis() > this.lastFrameTime + this.frameDelay && this.state === "idle") {
//       for (let i = 0; i < 9; i++) {
//         this.frame = (this.frame + 1) % this.frameCount;
//       }
//       this.frame = 0;
//       this.lastFrameTime = millis();
//     }

//     // movements: left, right
//     if (keyIsDown(68)) {
//       this.x += this.speed;
//     }
//     if (keyIsDown(65)) {
//       this.x -= this.speed;
//     }
//   }

//   display() {
//     let frameWidth = this.image.width / this.frameCount;
//     let frameHeight = this.image.height;
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

// await Canvas();
// world.gravity.y = 10;

// let ball = new Sprite();
// ball.diameter = 50;
// ball.img = '🤪';

// let groundA = new Sprite();
// groundA.x = -120;
// groundA.width = 220;
// groundA.rotation = 30;
// groundA.physics = STATIC;

// let groundB = new Sprite();
// groundB.x = 120;
// groundB.width = 220;
// groundB.rotation = -30;
// groundB.physics = STATIC;

// q5.update = function () {
// 	background('skyblue');
// 	text('click to jump!', 0, -50);

// 	if (mouse.presses()) ball.vel.y = -5;
// };

// await Canvas(40, 16);
// displayMode(NORMAL, PIXELATED, 4);

// let coin = new Sprite();

// //         (spriteSheet,   frames)
// coin.addAni('assets/coin.png', 14);

// q5.update = clear;

// let ball = new Sprite();
// let floor = new Sprite();

// function setup() {
//     createCanvas(windowWidth, windowHeight);
//     world.gravity.y = 10;
    
//     ball.diameter = 50;
//     ball.y = -70;
    
//     floor.y = 90;
//     floor.w = 230;
//     floor.h = 5;
//     floor.physics = STATIC;
// }

// function draw() {

// }
