import Gameboard from './Gameboard';
import Player from './Player';
import { createShips } from './helpers';

const gameLogic = () => {
    const player = Player();
    const computer = Player('computer');

    const playerBoard = Gameboard();
    const computerBoard = Gameboard();

    const playerShips = createShips();
    const computerShips = createShips();

    const whoseTurn = 'player';

    const startGame = () => {
        playerShips.forEach((ship) => playerBoard.autoPlaceShip(ship));
        computerShips.forEach((ship) => computerBoard.autoPlaceShip(ship));
    };

    const changeTurns = () => (whoseTurn === 'player' ? 'computer' : 'player');

    const checkGameOver = () => {
        let winner;
        if (playerBoard.allShipsSunk()) {
            winner = 'computer';
        } else if (computerBoard.allShipsSunk()) {
            winner = 'player';
        }
        return winner;
    };

    return {
        player,
        computer,
        playerBoard,
        computerBoard,
        startGame,
        changeTurns,
        checkGameOver,
    };
};

export default gameLogic;
