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

