import './style.css';
import Game from './components/Game';
import { dragStart, dragOver, drop } from './components/drag';

const game = Game();

game.initContent();

const startBtn = document.querySelector('#start-btn');
const resetBtn = document.querySelector('#reset-btn');
const autoPlaceBtn = document.querySelector('#auto-place-btn');
const computerSquares = document.querySelectorAll('.computer-square');
const humanShips = document.querySelectorAll('.ship');
const humanGrid = document.querySelector('#human-grid');

startBtn.addEventListener('click', () => game.startGame());

computerSquares.forEach((square) => {
    square.addEventListener('click', (e) => {
        game.gameSequence(e);
    });
});

resetBtn.addEventListener('click', () => game.resetGame());

autoPlaceBtn.addEventListener('click', () => game.humanAutoPlaceShips());

humanShips.forEach((ship) => {
    ship.addEventListener('dragstart', (e) => {
        dragStart(e);
    });
});

humanGrid.addEventListener('dragover', (e) => {
    dragOver(e);
});

humanGrid.addEventListener('drop', (e) => {
    drop(e);
});
