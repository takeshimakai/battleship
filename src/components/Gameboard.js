import { randomCoords, randomOrientation } from './helpers';

const Gameboard = () => {
    const board = Array(10).fill(null).map(() => Array(10).fill(null));
    const getBoard = () => board;

    let placedShips = [];

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
        ship.isPlaced = true;
        placedShips.push(ship);
    };

    const autoPlaceShip = (ship) => {
        const orientation = randomOrientation();
        const { y, x } = randomCoords();

        if (isValidPlacement(ship, orientation, y, x)) {
            placeShip(ship, orientation, y, x);
            ship.orientation = orientation;
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

    const resetBoard = () => {
        board.forEach((arr) => arr.fill(null));
        placedShips = [];
    };

    return {
        getBoard,
        isValidPlacement,
        placeShip,
        autoPlaceShip,
        receiveAttack,
        allShipsSunk,
        resetBoard,
    };
};

export default Gameboard;
