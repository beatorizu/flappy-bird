class Scenario {
  constructor(context, sprite, spriteX, spriteY, width, height, x, y) {
    this.context = context;
    this.sprite = sprite;
    this.spriteX = spriteX;
    this.spriteY = spriteY;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.context.drawImage(
      this.sprite,
      this.spriteX, this.spriteY,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height,
    )

    this.context.drawImage(
      this.sprite,
      this.spriteX, this.spriteY,
      this.width, this.height,
      (this.x + this.width), this.y,
      this.width, this.height,
    )
  }
}
