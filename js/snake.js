class Snake {
	constructor() {
		this.length = 1;
		this.x = 10;
		this.y = 10;
		this.spaces = [[10, 10]];
		this.direction = 'right'
	}

	changeDirection(direction) {
		// only change direction to opposing plane
		if ((this.direction === 'left' || this.direction === 'right') && (direction === 'up' || direction === 'down')) {
			this.direction = direction;
		} else if ((this.direction === 'up' || this.direction === 'down') && (direction === 'left' || direction === 'right')) {
			this.direction = direction;
		}
	}

	grow() {
		this.length += 1;
	}

	move(totalSpaces) {
		let nextSpace = [this.x, this.y];
		if (this.direction === 'up') {
			nextSpace[0] += -1;
			if (nextSpace[0] === -1) { nextSpace[0] = totalSpaces - 1; }
		}
		if (this.direction === 'right') {
			nextSpace[1] += 1;
			if (nextSpace[1] === totalSpaces) { nextSpace[1] = 0; }
		}
		if (this.direction === 'down') {
			nextSpace[0] += 1;
			if (nextSpace[0] === totalSpaces) { nextSpace[0] = 0; }
		}
		if (this.direction === 'left') {
			nextSpace[1] += -1;
			if (nextSpace[1] === -1) { nextSpace[1] = totalSpaces - 1; }
		}

		return nextSpace;
	}

	updateSnakeSpaces(nextSpace) {
		[this.x, this.y] = nextSpace;
		// log current snake filled positions in spaces array
		this.spaces.unshift([this.x, this.y]);
		if (this.spaces.length > this.length) {
			this.spaces.pop();
		}
	}

	get coordinates() {
		return this.spaces;
	}

	reset() {
		this.length = 1;
		this.x = 10;
		this.y = 10;
		this.spaces = [[10, 10]];
		this.direction = 'right';
	}
}