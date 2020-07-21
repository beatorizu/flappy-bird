class FlappyBird {
  constructor(width, height, x, y, speed, gravity, jumpHeight, moves, currentFrame) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.gravity = gravity;
    this.jumpHeight = jumpHeight;
    this.moves = moves;
    this.currentFrame = currentFrame;
  }

  jump() {
    this.speed -= this.jumpHeight;
  }

  update() {
    if (globals.ground.isColliding(this)) {
      hitSound.play();
      setTimeout(() => {
        changeScene(Scenes.START);
      }, 500);
      return;
    }
    this.speed += this.gravity;
    this.y += this.speed;
  }

  updateCurrentFrame() {
    const frameInterval = 10;
    const overFrame = frames % frameInterval === 0;
    if (overFrame) {
      const incrementBase = 1;
      const increment = incrementBase + this.currentFrame;
      const repeatBase = this.moves.length;
      this.currentFrame = increment % repeatBase;
    }
  }

  draw() {
    this.updateCurrentFrame();
    const { spriteX, spriteY } = this.moves[this.currentFrame];
    context.drawImage(
      sprites,
      spriteX, spriteY,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height,
    )
  }
}
