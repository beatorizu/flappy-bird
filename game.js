console.log('[beatorizu] Flappy Bird');

const sprites = new Image();
sprites.src = 'assets/sprites.png';

const hitSound = new Audio();
hitSound.src = 'assets/hit.wav';

let frames = 0;

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

const createGround = () => {
  const ground = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 112,
    update: () => {
      const groundMove = 1;
      const repeatWhen = ground.width / 2;
      const move = ground.x - groundMove;
      ground.x = move % repeatWhen;
    },
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

  return ground;
}

const isColliding = (flappyBird, ground) => {
  const flappyBirdY = flappyBird.y + flappyBird.height;
  const groundY = ground.y;

  return flappyBirdY >= groundY;
}

const createFlappyBird = () => {
  const flappyBird = {
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    speed: 0,
    gravity: 0.25,
    jumpHeight: 4.6,
    jump: () => {
      flappyBird.speed -= flappyBird.jumpHeight;
    },
    update: () => {
      if (isColliding(flappyBird, globals.ground)) {
        hitSound.play();
        setTimeout(() => {
          changeScene(Scenes.START);
        }, 500);
        return;
      }
      flappyBird.speed += flappyBird.gravity;
      flappyBird.y += flappyBird.speed;
    },
    moves: [
      { spriteX: 0, spriteY: 0 },
      { spriteX: 0, spriteY: 26 },
      { spriteX: 0, spriteY: 52 },
      { spriteX: 0, spriteY: 26 }
    ],
    currentFrame: 0,
    updateCurrentFrame: () => {
      const frameInterval = 10;
      const overFrame = frames % frameInterval === 0;
      if (overFrame) {
        const incrementBase = 1;
        const increment = incrementBase + flappyBird.currentFrame;
        const repeatBase = flappyBird.moves.length;
        flappyBird.currentFrame = increment % repeatBase;
      }
    },
    draw: () => {
      flappyBird.updateCurrentFrame();
      const { spriteX, spriteY } = flappyBird.moves [flappyBird.currentFrame];
      context.drawImage(
        sprites,
        spriteX, spriteY,
        flappyBird.width, flappyBird.height,
        flappyBird.x, flappyBird.y,
        flappyBird.width, flappyBird.height,
      )
    }
  }

  return flappyBird;
}

const getReadyMessage = {
  spriteX: 134,
  spriteY: 0,
  width: 174,
  height: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  draw: () => {
    context.drawImage(
      sprites,
      getReadyMessage.spriteX, getReadyMessage.spriteY,
      getReadyMessage.width, getReadyMessage.height,
      getReadyMessage.x, getReadyMessage.y,
      getReadyMessage.width, getReadyMessage.height,
    )
  }
}

// Scenes

const globals = {};
let activeScene = {}
const changeScene = newScene => {
  activeScene = newScene;
  if (activeScene.init) {
    activeScene.init();
  }
}

const Scenes = {
  START: {
    init: () => {
      globals.flappyBird = createFlappyBird();
      globals.ground = createGround();
    },
    draw: () => {
      background.draw();
      globals.ground.draw();
      globals.flappyBird.draw();
      getReadyMessage.draw();
    },
    click: () => {
      changeScene(Scenes.GAME);
    },
    update: () => {
      globals.ground.update();
    }
  },
  GAME: {
    draw: () => {
      background.draw();
      globals.ground.draw();
      globals.flappyBird.draw();
    },
    click: () => {
      globals.flappyBird.jump()
    },
    update: () => {
      globals.flappyBird.update();
    }
  }
}

function loop() {
  activeScene.draw();
  activeScene.update();

  frames += 1;
  requestAnimationFrame(loop);
}

window.addEventListener('click', () => {
  if (activeScene.click) {
    activeScene.click();
  }
})

changeScene(Scenes.START);
loop();
