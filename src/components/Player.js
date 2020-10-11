const Player = (type = 'human') => {
    const attack = (y, x, board) => board.receiveAttack(y, x);

    const autoAttack = (board) => {
        const y = Math.floor(Math.random() * Math.floor(10));
        const x = Math.floor(Math.random() * Math.floor(10));

        board.receiveAttack(y, x);
    };

    return {
        attack,
        autoAttack,
    };
};

export default Player;
