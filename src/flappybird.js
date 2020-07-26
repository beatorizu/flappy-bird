class FlappyBird {
  constructor(context, width, height, x, y, speed, gravity, jumpHeight, moves, currentFrame) {
    this.context = context;
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
    this.context.drawImage(
      sprites,
      spriteX, spriteY,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height,
    )
  }
}
