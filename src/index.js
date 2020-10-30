import './style.css';
import Game from './components/Game';

const game = Game();

game.initContent();

const startBtn = document.querySelector('#start-btn');
const resetBtn = document.querySelector('#reset-btn');
const computerSquares = document.querySelectorAll('.computer-square');

startBtn.addEventListener('click', () => game.startGame());

computerSquares.forEach((square) => {
    square.addEventListener('click', (e) => {
        game.gameSequence(e);
    });
});

resetBtn.addEventListener('click', () => {
    game.resetGame();
    game.startGame();
});
