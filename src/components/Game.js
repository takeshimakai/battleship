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

    const initContent = () => {
        domFunc.renderStartBtn();
        domFunc.renderResetBtn();
        domFunc.renderGrid(humanBoard.getBoard(), 'human');
        domFunc.renderGrid(computerBoard.getBoard(), 'computer');
    };

    const startGame = () => {
        if (gameStarted === false) {
            humanShips.forEach((ship) => humanBoard.autoPlaceShip(ship));
            computerShips.forEach((ship) => computerBoard.autoPlaceShip(ship));

            domFunc.populateGrid(humanBoard.getBoard(), 'human');
            domFunc.populateGrid(computerBoard.getBoard(), 'computer');

            gameStarted = true;
        }
    };

    const resetGame = () => {
        gameStarted = false;

        humanBoard.resetBoard();
        computerBoard.resetBoard();

        domFunc.clearGrid('human');
        domFunc.clearGrid('computer');
    };

    const checkGameOver = () => {
        let winner;
        if (humanBoard.allShipsSunk()) {
            winner = 'Computer';
        } else if (computerBoard.allShipsSunk()) {
            winner = 'Human';
        }

        if (winner !== undefined) {
            domFunc.announceWinner(winner);
        }
    };

    const humanAttack = (e) => {
        const [className, y, x] = domFunc.getSelectors(e);

        human.attack(y, x, computerBoard);
        domFunc.updateGrid(computerBoard.getBoard(), className);
    };

    const computerAttack = () => {
        computer.autoAttack(humanBoard);
        domFunc.updateGrid(humanBoard.getBoard(), 'human-square');
    };

    return {
        gameStarted,
        initContent,
        startGame,
        resetGame,
        checkGameOver,
        humanAttack,
        computerAttack,
    };
};

export default Game;
