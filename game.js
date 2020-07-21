console.log('[beatorizu] Flappy Bird');

const sprites = new Image();
sprites.src = 'assets/sprites.png';

const hitSound = new Audio();
hitSound.src = 'assets/hit.wav';

let frames = 0;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const background = new Background(sprites, 390, 0, 275, 204, 0, canvas.height - 204)

const createGround = () => {
  const ground = new Ground(sprites, 0, 610, 224, 112, 0, canvas.height - 112);

  return ground;
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
      if (globals.ground.isColliding(flappyBird)) {
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

const createPipes = () => {
  const pipes = new Pipes(52, 400, {
    spriteX: 0,
    spriteY: 169
  }, {
    spriteX: 52,
    spriteY: 169
  }, 80)

  return pipes;
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
      globals.pipes = createPipes();
    },
    draw: () => {
      background.draw();
      globals.flappyBird.draw();
      globals.ground.draw();
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
      globals.pipes.draw();
      globals.ground.draw();
      globals.flappyBird.draw();
    },
    click: () => {
      globals.flappyBird.jump()
    },
    update: () => {
      globals.pipes.update();
      globals.ground.update();
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
