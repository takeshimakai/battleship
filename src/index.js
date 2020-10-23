import './style.css';
import Game from './components/Game';

const game = Game();

game.initContent();

const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', () => game.startGame());

const computerSquares = document.querySelectorAll('.computer-square');
computerSquares.forEach((square) => {
    square.addEventListener('click', (e) => {
        game.humanAttack(e);
        game.computerAttack();
        game.checkGameOver();
    });
});
