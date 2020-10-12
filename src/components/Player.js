const Player = (type = 'human') => {
    const attack = (y, x, board) => board.receiveAttack(y, x);

    const autoAttack = (board) => {
        const y = Math.floor(Math.random() * Math.floor(10));
        const x = Math.floor(Math.random() * Math.floor(10));

        const cell = board.getBoard()[y][x];

        if (cell === null || cell.hit === false) {
            board.receiveAttack(y, x);
        } else {
            autoAttack(board);
        }
    };

    return {
        type,
        attack,
        autoAttack,
    };
};

export default Player;
