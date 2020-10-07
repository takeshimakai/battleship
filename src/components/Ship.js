const Ship = (name, length) => {
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
        name,
        length,
        getHealth,
        hit,
        isSunk,
    };
};

export default Ship;
