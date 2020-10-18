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

    const startGame = () => {
        playerShips.forEach((ship) => playerBoard.autoPlaceShip(ship));
        computerShips.forEach((ship) => computerBoard.autoPlaceShip(ship));

        console.log(playerBoard.getBoard());
        console.log(computerBoard.getBoard());
    };

    return {
        startGame,
    };
};

export default gameLogic;
