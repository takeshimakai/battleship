import { randomCoords } from './helpers';

const Player = () => {
    const attack = (y, x, board) => board.receiveAttack(y, x);

    const autoAttack = (board) => {
        const [y, x] = randomCoords();

        const cell = board.getBoard()[y][x];

        if (cell === null || cell.hit === false) {
            board.receiveAttack(y, x);
        } else {
            autoAttack(board);
        }
    };

    return {
        attack,
        autoAttack,
    };
};

export default Player;
