class Ground extends Scenario {
  constructor(context, sprite, spriteX, spriteY, width, height, x, y) {
    super(context, sprite, spriteX, spriteY, width, height, x, y);
  }

  update() {
    const groundMove = 1;
    const repeatWhen = this.width / 2;
    const move = this.x - groundMove;
    this.x = move % repeatWhen;
  }

  isColliding(flappyBird) {
    return flappyBird.y + flappyBird.height >= this.y;
  }
}
