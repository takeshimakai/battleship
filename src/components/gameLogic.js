import Ship from './Ship';
import Gameboard from './Gameboard';
import Player from './Player';
import { randomCoords, randomOrientation } from './helpers';

const gameLogic = () => {
    const createShips = () => {
        const ships = [
            {
                carrier: Ship('carrier', 5),
            },
            {
                battleship: Ship('battleship', 4),
            },
            {
                cruiser: Ship('cruiser', 3),
            },
            {
                destroyer: Ship('destroyer', 2),
            },
            {
                boat: Ship('boat', 1),
            },
        ];

        return ships;
    };

    const placeShipRandomly = (gameboard, ship) => {
        const [y, x] = randomCoords();
        const orientation = randomOrientation();

        gameboard.placeShip(ship, orientation, y, x);
    };

    const initGame = () => {
        const player = Player();
        const computer = Player('computer');

        const playerBoard = Gameboard();
        const computerBoard = Gameboard();

        const playerShips = createShips();
        const computerShips = createShips();

        playerShips.forEach((ship) => {
            placeShipRandomly(playerBoard, ship);
        });
    };

    return {
        initGame,
    };
};

export default gameLogic;
