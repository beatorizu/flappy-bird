class Background extends Scenario {
  constructor(sprite, spriteX, spriteY, width, height, x, y) {
    super(sprite, spriteX, spriteY, width, height, x, y);
  }

	draw() {
		context.fillStyle = '#70c5ce';
    context.fillRect(0, 0, canvas.width, canvas.height);
    super.draw();
	}
}
