import Gameboard from './Gameboard';
import Player from './Player';
import { createShips } from './helpers';
import dom from './dom';

const Game = () => {
    const domFunc = dom();

    const human = Player();
    const computer = Player('computer');

    const humanBoard = Gameboard();
    const computerBoard = Gameboard();

    const humanShips = createShips();
    const computerShips = createShips();

    let gameStarted = false;
    let gridPopulated = false;

    const initContent = () => {
        domFunc.renderStartBtn();
        domFunc.renderResetBtn();
        domFunc.renderGrid(humanBoard.getBoard(), 'human');
        domFunc.renderGrid(computerBoard.getBoard(), 'computer');
    };

    const startGame = () => {
        if (gameStarted === false && gridPopulated === false) {
            humanShips.forEach((ship) => humanBoard.autoPlaceShip(ship));
            computerShips.forEach((ship) => computerBoard.autoPlaceShip(ship));

            domFunc.populateGrid(humanBoard.getBoard(), 'human');
            domFunc.populateGrid(computerBoard.getBoard(), 'computer');

            gameStarted = true;
            gridPopulated = true;
        }
    };

    const resetGame = () => {
        gameStarted = false;
        gridPopulated = false;

        humanBoard.resetBoard();
        computerBoard.resetBoard();

        domFunc.clearGrid('human');
        domFunc.clearGrid('computer');
    };

    const checkGameOver = () => {
        let winner = '';
        if (humanBoard.allShipsSunk()) {
            winner = 'Computer';
        } else if (computerBoard.allShipsSunk()) {
            winner = 'Human';
        }

        if (winner !== '') {
            domFunc.announceWinner(winner);
            gameStarted = false;
        }
    };

    const gameSequence = (e) => {
        const {
            className,
            y,
            x,
            clicked,
        } = domFunc.getSelectors(e);

        if (clicked === 'false' && gameStarted === true) {
            human.attack(y, x, computerBoard);
            domFunc.updateGrid(computerBoard.getBoard(), className);

            computer.autoAttack(humanBoard);
            domFunc.updateGrid(humanBoard.getBoard(), 'human-square');

            checkGameOver();
            e.target.setAttribute('data-clicked', 'true');
        }
    };

    return {
        initContent,
        startGame,
        resetGame,
        gameSequence,
    };
};

export default Game;
