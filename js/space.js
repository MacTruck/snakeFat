class Space {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.fill = '';
	}

	drawSpace() {
		const space = document.createElement('div');
		space.className = 'space ';
		space.className += this.fill;
		document.querySelector('.board').appendChild(space);
	}

	fillSpace(fillType) {
		this.fill = fillType;
	}

	unfillSpace() {
		
	}
}