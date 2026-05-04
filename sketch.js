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

// createCanvas();
// world.gravity.y = 10;

// let ball = new Sprite();
// ball.x = halfWidth - 200;
// ball.y = halfHeight - 200;
// ball.diameter = 50;

// let groundA = new Sprite();
// groundA.x = halfWidth - 120;
// groundA.width = 200;
// groundA.rotation = 20;
// groundA.physics = STATIC;

// let groundB = new Sprite();
// groundB.x = halfWidth + 120;
// groundB.width = 200;
// groundB.rotation = -20;
// groundB.physics = STATIC;

// function update() {
// 	background('skyblue');

// 	textAlign(CENTER);
// 	textSize(20);
// 	text('click to jump!', halfWidth, halfHeight - 100);

// 	if (mouse.presses()) ball.vel.y = -5;
// }