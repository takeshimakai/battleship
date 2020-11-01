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

    let humanShips;
    let computerShips;

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
            humanShips = createShips();
            computerShips = createShips();

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

        humanShips = [];
        computerShips = [];

        domFunc.resetGrid('human');
        domFunc.resetGrid('computer');

        domFunc.removeAnnouncement();
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

        if (gameStarted === true && clicked === 'false') {
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
