class Board {
	constructor() {
		this.rows = 20;
		this.columns = 20;
		this.spaces = this.createSpaces();	// an array of arrays (rows of space elements)
	}

	createSpaces() {
		const spaces = [];

		for (let y = 0; y < this.rows; y++) {
			const row = [];
			for (let x = 0; x < this.columns; x++) {
				const space = new Space(x, y);
				row.push(space);
			}
			spaces.push(row);
		}

		return spaces;
	}

	clearSnakeSpaces() {
		for (let column of this.spaces) {
			for (let space of column) {
				if (space.fill === 'snake') { space.fill = ''; }
			}
		}
	}

	reset() {
		for (let column of this.spaces) {
			for (let space of column) {
				space.fill = '';
			}
		}
	}

	drawBoard() {							// draw each space
		for (let column of this.spaces) {
			for (let space of column) {
				space.drawSpace();
			}
		}
	}

	findSpace(nextSpace) {
		return this.spaces[nextSpace[0]][nextSpace[1]];
	}

	placeFood() {
		let foodRow = Math.floor(Math.random() * this.rows);
		let foodCol = Math.floor(Math.random() * this.columns);
		let foodSpace = this.spaces[foodRow][foodCol];
		if (foodSpace.fill === '') {
			foodSpace.fill = 'food';
		} else {
			this.placeFood();
		}
	}
}