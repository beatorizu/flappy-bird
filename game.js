console.log('[beatorizu] Flappy Bird');

const sprites = new Image();
sprites.src = 'assets/sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const background = {
  spriteX: 390,
  spriteY: 0,
  width: 275,
  height: 204,
  x: 0,
  y: canvas.height - 204,
  draw: () => {
    context.fillStyle = '#70c5ce';
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.width, background.height,
      background.x, background.y,
      background.width, background.height,
    )
    context.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.width, background.height,
      (background.x + background.width), background.y,
      background.width, background.height,
    )
  }
}

const ground = {
  spriteX: 0,
  spriteY: 610,
  width: 224,
  height: 112,
  x: 0,
  y: canvas.height - 112,
  draw: () => {
    context.drawImage(
      sprites,
      ground.spriteX, ground.spriteY,
      ground.width, ground.height,
      ground.x, ground.y,
      ground.width, ground.height,
    )
    context.drawImage(
      sprites,
      ground.spriteX, ground.spriteY,
      ground.width, ground.height,
      (ground.x + ground.width), ground.y,
      ground.width, ground.height,
    )
  }
}

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  width: 33,
  height: 24,
  x: 10,
  y: 50,
  speed: 0,
  gravity: 0.25,
  update: () => {
    flappyBird.speed += flappyBird.gravity;
    flappyBird.y += flappyBird.speed;
  },
  draw: () => {
    context.drawImage(
      sprites,
      flappyBird.spriteX, flappyBird.spriteY,
      flappyBird.width, flappyBird.height,
      flappyBird.x, flappyBird.y,
      flappyBird.width, flappyBird.height,
    )
  }
}

function loop() {
  background.draw();
  ground.draw();
  flappyBird.update();
  flappyBird.draw();

  requestAnimationFrame(loop);
}

loop();
