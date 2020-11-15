import Gameboard from './Gameboard';
import Player from './Player';
import { createShips } from './helpers';
import dom from './dom';

const Game = () => {
    let gameStarted = false;
    let gameover = false;

    const domFunc = dom();

    const human = Player();
    const computer = Player('computer');

    const humanBoard = Gameboard();
    const computerBoard = Gameboard();

    let humanShips = createShips();
    let computerShips = createShips();

    const checkAllShipsPlaced = (ships) => ships.every((ship) => ship.isPlaced === true);

    const initContent = () => {
        domFunc.renderStartBtn();
        domFunc.renderResetBtn();
        domFunc.renderAutoPlaceBtn();
        domFunc.renderGrid(humanBoard.getBoard(), 'human');
        domFunc.renderGrid(computerBoard.getBoard(), 'computer');
        domFunc.renderShips(humanShips);
    };

    const startGame = () => {
        if (gameStarted === false && gameover === false && checkAllShipsPlaced(humanShips)) {
            computerShips.forEach((ship) => computerBoard.autoPlaceShip(ship));

            domFunc.populateGrid(computerBoard.getBoard(), 'computer');

            gameStarted = true;
        }
    };

    const resetGame = () => {
        gameStarted = false;
        gameover = false;

        humanShips = [];
        computerShips = [];
        humanShips = createShips();
        computerShips = createShips();

        humanBoard.resetBoard();
        computerBoard.resetBoard();

        domFunc.resetGrid('human');
        domFunc.resetGrid('computer');

        domFunc.removeAnnouncement();

        document.querySelectorAll('.ship').forEach((ship) => {
            ship.classList.remove('placed-ship');
            ship.setAttribute('draggable', 'true');
        });
    };

    // Human ship placement
    const humanAutoPlaceShips = () => {
        if (gameStarted === false) {
            humanBoard.resetBoard();
            domFunc.resetGrid('human');

            humanShips.forEach((ship) => humanBoard.autoPlaceShip(ship));

            domFunc.populateGrid(humanBoard.getBoard(), 'human');

            document.querySelectorAll('.ship').forEach((ship) => {
                ship.classList.add('placed-ship');
                ship.setAttribute('draggable', 'false');
            });
        }
    };

    const humanManualPlaceShip = (e) => {
        const { y, x } = domFunc.getSelectors(e);
        const data = e.dataTransfer.getData('text');
        const ship = humanShips.find((item) => item.name === data);
        const isValid = humanBoard.isValidPlacement(ship, 'horizontal', y, x);

        if (isValid) {
            humanBoard.placeShip(ship, 'horizontal', y, x);
            domFunc.populateGrid(humanBoard.getBoard(), 'human');

            const shipContainer = document.querySelector(`#${data}`);
            shipContainer.classList.add('placed-ship');
            shipContainer.setAttribute('draggable', 'false');
        }
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
            gameover = true;
        }
    };

    const gameSequence = (e) => {
        const {
            className,
            y,
            x,
            clicked,
        } = domFunc.getSelectors(e);

        if (gameStarted === true && gameover === false && clicked === 'false') {
            e.target.setAttribute('data-clicked', 'true');

            human.attack(y, x, computerBoard);
            domFunc.updateGrid(computerBoard.getBoard(), className);

            computer.autoAttack(humanBoard);
            domFunc.updateGrid(humanBoard.getBoard(), 'human-square');

            checkGameOver();
        }
    };

    return {
        initContent,
        startGame,
        resetGame,
        humanAutoPlaceShips,
        humanManualPlaceShip,
        gameSequence,
    };
};

export default Game;
