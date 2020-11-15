const Ship = (name, length) => {
    const isPlaced = false;
    const health = [];
    let orientation = 'horizontal';

    for (let i = 0; i < length; i++) {
        health.push('o');
    }

    const getHealth = () => health;

    const getOrientation = () => orientation;

    const changeOrientation = () => {
        if (orientation === 'horizontal') {
            orientation = 'vertical';
        } else {
            orientation = 'horizontal';
        }
    };

    const hit = (index) => health.splice(index, 1, 'x');

    const isSunk = () => health.every((item) => item === 'x');

    return {
        name,
        length,
        isPlaced,
        getHealth,
        getOrientation,
        changeOrientation,
        hit,
        isSunk,
    };
};

export default Ship;
