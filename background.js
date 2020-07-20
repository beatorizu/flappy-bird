class Background {
  constructor(sprite, spriteX, spriteY, width, height, x, y) {
    this.sprite = sprite;
    this.spriteX = spriteX;
    this.spriteY = spriteY;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

	draw() {
		context.fillStyle = '#70c5ce';
		context.fillRect(0, 0, canvas.width, canvas.height)

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
}
