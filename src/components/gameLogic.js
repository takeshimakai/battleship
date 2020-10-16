import Ship from './Ship';
import Gameboard from './Gameboard';
import Player from './Player';

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

    const initGame = () => {
        const player = Player();
        const computer = Player('computer');

        const playerBoard = Gameboard();
        const computerBoard = Gameboard();

        
    };
};

export default gameLogic;
