class Pipes {
  constructor(width, height, ground, sky, distanceBetweenPipes) {
    this.width = width;
    this.height = height;
    this.ground = ground;
    this.sky = sky;
    this.distanceBetweenPipes = distanceBetweenPipes;
    this.pairs = [];
  }

	draw() {
		this.pairs.forEach(pair => {
			const randomY = pair.y;

			const skyPipeX = pair.x;
			const skyPipeY = randomY;
			context.drawImage(
				sprites,
				this.sky.spriteX, this.sky.spriteY,
				this.width, this.height,
				skyPipeX, skyPipeY,
				this.width, this.height,
			)

			const groundPipeX = pair.x;
			const groundPipeY = this.height + this.distanceBetweenPipes + randomY;
			context.drawImage(
				sprites,
				this.ground.spriteX, this.ground.spriteY,
				this.width, this.height,
				groundPipeX, groundPipeY,
				this.width, this.height,
			)

			pair.skyPipe = {
				x: skyPipeX,
				y: this.height + skyPipeY
			}
			pair.groundPipe = {
				x: groundPipeX,
				y: groundPipeY
			}
		});
  }

  isColliding(pair) {
		const flappyBirdHead = globals.flappyBird.y;
		const flappyBirdFeet = globals.flappyBird.y + globals.flappyBird.height;

		if (globals.flappyBird.x >= pair.x) {
			if (flappyBirdHead <= pair.skyPipe.y) {
				return true;
			}
			if (flappyBirdFeet >= pair.skyPipe.y) {
				return true;
			}
			return false;
		}
	}

  update() {
		const overFrame = frames % 100 === 0;
		if (overFrame) {
			this.pairs.push({
				x: canvas.width,
				y: -150 * (Math.random() + 1)
			})
		}

		this.pairs.forEach(pair => {
			pair.x -= 2;

			if (this.isColliding(pair)) {
				changeScene(Scenes.START)
			}

			if (pair.x <= -this.width) {
				this.pairs.shift();
			}
		})
	}
}