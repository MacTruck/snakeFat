const game = new Game();
const score = document.querySelector('.score');
const board = document.querySelector('.board');
const newGameButton = document.querySelector('.newGame');
const playAgain = document.querySelector('.playAgain');
const touchHolder = document.querySelector('.touchHolder');
const touchInput = document.querySelector('.touchInput');

newGameButton.addEventListener('click', () => {
	game.startGame();
	newGameButton.style.display = 'none';
	score.style.display = 'block';
	board.style.display = 'block';
	touchHolder.style.display = 'block';
});

playAgain.addEventListener('click', () => game.reset());

document.addEventListener('keydown', e => game.handleKeydown(event));

touchInput.addEventListener('touchstart', e => game.handleTouchstart(e));
touchInput.addEventListener('touchend', e => game.handleTouchend(e));