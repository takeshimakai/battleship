const Gameboard = () => {
    const board = Array(10).fill(null).map(() => Array(10).fill(null));
    const getBoard = () => board;

    const placeShip = (ship, orientation, y, x) => {
        if (orientation === 'horizontal') {
            for (let i = x; i < x + ship.length; i++) {
                board[y].splice(i, 1, ship.name);
            }
        }

        if (orientation === 'vertical') {
            for (let i = y; i < y + ship.length; i++) {
                board[i].splice(x, 1, ship.name);
            }
        }

        return board;
    };

    return {
        getBoard,
        placeShip,
    };
};

export default Gameboard;
