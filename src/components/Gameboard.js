import { randomCoords, randomOrientation } from './helpers';

const Gameboard = () => {
    const board = Array(10).fill(null).map(() => Array(10).fill(null));
    const getBoard = () => board;

    const placedShips = [];

    const isValidPlacement = (ship, orientation, y, x) => {
        if (orientation === 'horizontal') {
            if (x + ship.length > board.length) {
                return false;
            }

            for (let i = x; i < x + ship.length; i++) {
                if (board[y][i] !== null) {
                    return false;
                }
            }
        } else if (orientation === 'vertical') {
            if (y + ship.length > board.length) {
                return false;
            }

            for (let i = y; i < y + ship.length; i++) {
                if (board[i][x] !== null) {
                    return false;
                }
            }
        }
        return true;
    };

    const placeShip = (ship, orientation, y, x) => {
        if (orientation === 'horizontal') {
            let index = 0;
            for (let i = x; i < x + ship.length; i++) {
                board[y][i] = { ship, index, hit: false };
                index += 1;
            }
        } else if (orientation === 'vertical') {
            let index = 0;
            for (let i = y; i < y + ship.length; i++) {
                board[i][x] = { ship, index, hit: false };
                index += 1;
            }
        }
        placedShips.push(ship);
    };

    const autoPlaceShip = (ship) => {
        const [y, x] = randomCoords();
        const orientation = randomOrientation();

        const isValid = isValidPlacement(ship, orientation, y, x);

        if (isValid) {
            placeShip(ship, orientation, y, x);
        } else {
            autoPlaceShip(ship);
        }
    };

    const receiveAttack = (y, x) => {
        if (board[y][x] === null) {
            board[y][x] = { hit: true };
        }

        if (board[y][x].ship && board[y][x].hit === false) {
            board[y][x].ship.hit(board[y][x].index);
            board[y][x].hit = true;
        }
    };

    const allShipsSunk = () => placedShips.every((ship) => ship.isSunk());

    return {
        getBoard,
        placeShip,
        autoPlaceShip,
        receiveAttack,
        allShipsSunk,
    };
};

export default Gameboard;
