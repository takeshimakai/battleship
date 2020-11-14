const Ship = (name, length) => {
    const isPlaced = false;

    const health = [];
    const getHealth = () => health;

    for (let i = 0; i < length; i++) {
        health.push('o');
    }

    const hit = (index) => {
        health.splice(index, 1, 'x');
        return health;
    };

    const isSunk = () => health.every((item) => item === 'x');

    return {
        isPlaced,
        name,
        length,
        getHealth,
        hit,
        isSunk,
    };
};

export default Ship;
