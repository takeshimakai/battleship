const Gameboard = () => {
    const board = Array(10).fill(null).map(() => Array(10).fill(null));
    const getBoard = () => board;

    const placedShips = [];

    const placeShip = (ship, orientation, y, x) => {
        if (board[y][x] !== null) {
            throw new Error('This cell is occupied');
        }

        if (orientation === 'horizontal') {
            let index = 0;
            for (let i = x; i < x + ship.length; i++) {
                board[y][i] = { ship, index, hit: false };
                index += 1;
            }
        }

        if (orientation === 'vertical') {
            let index = 0;
            for (let i = y; i < y + ship.length; i++) {
                board[i][x] = { ship, index, hit: false };
                index += 1;
            }
        }

        placedShips.push(ship);
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
        receiveAttack,
        allShipsSunk,
    };
};

export default Gameboard;
