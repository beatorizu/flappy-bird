class Background extends Scenario {
  constructor(context, sprite, spriteX, spriteY, width, height, x, y) {
    super(context, sprite, spriteX, spriteY, width, height, x, y);
  }

	draw() {
		this.context.fillStyle = '#70c5ce';
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    super.draw();
	}
}
