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
    let whoseTurn = 'human';

    const startGame = () => {
        if (gameStarted === false) {
            humanShips.forEach((ship) => humanBoard.autoPlaceShip(ship));
            computerShips.forEach((ship) => computerBoard.autoPlaceShip(ship));

            domFunc.populateGrid(humanBoard.getBoard(), 'human');
            domFunc.populateGrid(computerBoard.getBoard(), 'computer');

            gameStarted = true;
        }
    };

    const changeTurns = () => (whoseTurn === 'human' ? 'computer' : 'human');

    const checkGameOver = () => {
        let winner;
        if (humanBoard.allShipsSunk()) {
            winner = 'computer';
        } else if (computerBoard.allShipsSunk()) {
            winner = 'human';
        }
        return winner;
    };

    const playerAttack = (e) => {
        const [className, y, x] = domFunc.getSelectors(e);

        if (whoseTurn === 'human') {
            human.attack(y, x, computerBoard);
            domFunc.updateGrid(computerBoard.getBoard(), className);
        } else {
            computer.autoAttack(humanBoard);
        }

        whoseTurn = changeTurns();
    };

    return {
        human,
        computer,
        humanBoard,
        computerBoard,
        startGame,
        checkGameOver,
        playerAttack,
    };
};

export default Game;
