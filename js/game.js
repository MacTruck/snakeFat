class Game {
	constructor() {
		this.board = new Board();
		this.snake = new Snake();
		this.score = 100;
		this.ready = false;
		this.touchstart = null;
	}

	startGame() {
		this.placeSnake();
		this.board.placeFood();
		this.ready = true;
		this.startTimer();
	}

	placeSnake() {
		// get coord of snake
		let snakeSpaces = this.snake.coordinates;
		// clear snake filled spaces
		this.board.clearSnakeSpaces();
		// fill spaces at new snake coordinates
		snakeSpaces.forEach(space => {
			this.board.findSpace(space).fill = 'snake';
		});
		// clear board HTML element
		document.querySelector('.board').innerHTML = '';
		// redraw board HTML element
		this.board.drawBoard();
	}

	handleKeydown(e) {
		let input = e.code;
		if (input === 'Enter' && !this.ready) { this.reset(); }
		if (input === 'ArrowRight' || input === 'ArrowLeft' || input === 'ArrowUp' || input === 'ArrowDown') {
			input = input.toLowerCase().replace('arrow', '');
			this.snake.changeDirection(input);
		}
	}

	handleTouchstart(e) {
		e.preventDefault();
		this.touchstart = [e.touches[0].clientX, e.touches[0].clientY];
	}

	handleTouchend(e) {
		e.preventDefault();
		let deltaX = e.changedTouches[0].clientX - this.touchstart[0];
		let deltaY = e.changedTouches[0].clientY - this.touchstart[1];

		// console.log(`Change in X: ${deltaX} | Change in Y: ${deltaY}`);
		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			(deltaX > 0) ? this.snake.changeDirection('right') : this.snake.changeDirection('left');
		} else {
			(deltaX > 0) ? this.snake.changeDirection('up') : this.snake.changeDirection('down');
		}

		this.touchstart = null;
	}

	startTimer() {
		window.setTimeout(() => this.loop(), 200);
	}

	loop() {
		// move snake, check for food & check for loss
		// move snake, return new snake head space
		let nextSpace = this.snake.move(this.board.rows);
		// return fill of new snake head space
		let nextFill = this.board.findSpace(nextSpace).fill;
		// find coordinates of snake tail
		let snakeSpaces = this.snake.coordinates;
		let snakeLength = snakeSpaces.length - 1;
		let snakeTail = snakeSpaces[snakeLength];
		// check if snake head is moving in to current tail position
		let headToTail = (nextSpace[0] === snakeTail[0] && nextSpace[1] === snakeTail[1]) ? true : false;
		if (nextFill === 'food') {
			this.score += 500;
			this.snake.grow();
			this.board.placeFood();
		} else if (nextFill === 'snake' && !headToTail) {
			this.gameOver();
			return;
		}
		// push nextSpace onto snake coordinates array
		this.snake.updateSnakeSpaces(nextSpace);

		this.score -= 1;
		document.querySelector('.score').textContent = `Score: ${this.score} || Foods: ${this.snake.length - 1}`;

		this.placeSnake();
		this.startTimer();
	}

	gameOver() {
		this.ready = false;
		document.querySelector('h1').textContent = `Game Over`;
		document.querySelector('.playAgain').style.display = 'block';
		let speed = document.querySelector('.speed');
		speed.textContent = `Points / Food = ${this.score / (this.snake.length - 1)}`;
		speed.style.display = 'block';
	}

	reset() {
		document.querySelector('.playAgain').style.display = 'none';
		document.querySelector('.speed').style.display = 'none';
		document.querySelector('h1').textContent = `Snake Fat`;
		this.score = 100;
		this.snake.reset();
		this.board.reset();
		this.startGame();
	}
}