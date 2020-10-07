const Gameboard = () => {
    const board = Array(10).fill(null).map(() => Array(10).fill(null));
    const getBoard = () => board;

    const placeShip = (ship, orientation, y, x) => {
        if (orientation === 'horizontal') {
            let index = 0;
            for (let i = x; i < x + ship.length; i++) {
                board[y][i] = { ship, index };
                index += 1;
            }
        }

        if (orientation === 'vertical') {
            let index = 0;
            for (let i = y; i < y + ship.length; i++) {
                board[i][x] = { ship, index };
                index += 1;
            }
        }
    };

    const receiveAttack = (y, x) => {
        if (board[y][x] === null) {
            board[y][x] = 'x';
        }

        if (board[y][x].ship) {
            board[y][x].ship.hit(board[y][x].index);
        }
    };

    return {
        getBoard,
        placeShip,
        receiveAttack,
    };
};

export default Gameboard;
