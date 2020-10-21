import './style.css';
import dom from './components/dom';
import gameLogic from './components/gameLogic';

const game = gameLogic();
const domFunc = dom();

domFunc.renderGrid(game.playerBoard.getBoard(), 'player');
domFunc.renderGrid(game.computerBoard.getBoard(), 'computer');
domFunc.renderStartBtn();

const startBtn = document.querySelector('#start-btn');

startBtn.addEventListener('click', () => {
    domFunc.updateSquare(0, 2);
});