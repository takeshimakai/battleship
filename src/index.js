import './style.css';
import Game from './components/Game';
import dom from './components/dom';

const game = Game();
const domFunc = dom();

domFunc.renderStartBtn();
domFunc.renderGrid(game.humanBoard.getBoard(), 'human');
domFunc.renderGrid(game.computerBoard.getBoard(), 'computer');

const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', () => game.startGame());
