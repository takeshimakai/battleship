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
        humanShips.forEach((ship) => domFunc.renderShip(ship));
    };

    const startGame = () => {
        if (gameStarted === false && gameover === false) {
            computerShips.forEach((ship) => computerBoard.autoPlaceShip(ship));
            domFunc.gameStartAnnouncement();
            setTimeout(() => domFunc.removeAnnouncement('game-start-box'), 1000);
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

        humanShips.forEach((ship) => domFunc.rotateShip(ship));

        humanBoard.resetBoard();
        computerBoard.resetBoard();

        domFunc.resetGrid('human');
        domFunc.resetGrid('computer');

        domFunc.removeAnnouncement('winner-box');

        document.querySelectorAll('.ship').forEach((ship) => {
            ship.classList.remove('placed-ship');
            ship.setAttribute('draggable', 'true');
        });

        document.querySelector('#start-btn').disabled = true;
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
                ship.style.flexDirection = 'row';
            });

            document.querySelector('#start-btn').disabled = false;
        }
    };

    const humanManualPlaceShip = (e) => {
        const { y, x } = domFunc.getSelectors(e);
        const data = e.dataTransfer.getData('text');
        const ship = humanShips.find((item) => item.name === data);
        const orientation = ship.getOrientation();

        if (humanBoard.isValidPlacement(ship, orientation, y, x)) {
            humanBoard.placeShip(ship, orientation, y, x);
            domFunc.populateGrid(humanBoard.getBoard(), 'human');

            const shipContainer = document.querySelector(`#${data}`);
            shipContainer.classList.add('placed-ship');
            shipContainer.setAttribute('draggable', 'false');
        }

        if (checkAllShipsPlaced(humanShips)) {
            document.querySelector('#start-btn').disabled = false;
        }
    };

    const humanRotateShip = (e) => {
        humanShips.forEach((ship) => {
            if (ship.name === e.target.parentElement.id && ship.isPlaced === false) {
                ship.changeOrientation();
                domFunc.rotateShip(ship);
            }
        });
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
        humanRotateShip,
        gameSequence,
    };
};

export default Game;
