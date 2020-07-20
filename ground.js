class Ground {
  constructor(sprite, spriteX, spriteY, width, height, x, y) {
    this.sprite = sprite;
    this.spriteX = spriteX;
    this.spriteY = spriteY;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  update() {
    const groundMove = 1;
    const repeatWhen = this.width / 2;
    const move = this.x - groundMove;
    this.x = move % repeatWhen;
  }

  draw() {
    context.drawImage(
      this.sprite,
      this.spriteX, this.spriteY,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height,
    )
    context.drawImage(
      this.sprite,
      this.spriteX, this.spriteY,
      this.width, this.height,
      (this.x + this.width), this.y,
      this.width, this.height,
    )
  }

  isColliding(flappyBird) {
    return flappyBird.y + flappyBird.height >= this.y;
  }
}
