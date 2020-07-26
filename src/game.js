console.log('[beatorizu] Flappy Bird');

const sprites = new Image();
sprites.src = 'assets/sprites.png';

const hitSound = new Audio();
hitSound.src = 'assets/hit.wav';

let frames = 0;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const background = new Background(context, sprites, 390, 0, 275, 204, 0, canvas.height - 204)

const createGround = () => {
  const ground = new Ground(context, sprites, 0, 610, 224, 112, 0, canvas.height - 112);

  return ground;
}

const createFlappyBird = () => {
  const flappyBird = new FlappyBird(context, 33, 24, 10, 50, 0, 0.2, 4.6, [
    { spriteX: 0, spriteY: 0 },
    { spriteX: 0, spriteY: 26 },
    { spriteX: 0, spriteY: 52 },
    { spriteX: 0, spriteY: 26 }
  ], 0);

  return flappyBird;
}

const createPipes = flappyBird => {
  const pipes = new Pipes(context, 52, 400, {
    spriteX: 0,
    spriteY: 169
  }, {
    spriteX: 52,
    spriteY: 169
  }, 80, flappyBird)

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
      globals.pipes = createPipes(globals.flappyBird);
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
      if (globals.ground.isColliding(globals.flappyBird)) {
        hitSound.play();
        setTimeout(() => {
          changeScene(Scenes.START);
        }, 500);
        return;
      }
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
