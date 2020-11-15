import Ship from './Ship';

const randomCoords = () => {
    const y = Math.floor(Math.random() * Math.floor(10));
    const x = Math.floor(Math.random() * Math.floor(10));

    return { y, x };
};

const randomOrientation = () => {
    const randomNum = Math.floor(Math.random() * Math.floor(2));

    return randomNum === 0 ? 'horizontal' : 'vertical';
};

const createShips = () => {
    const carrier = Ship('carrier', 5);
    const battleship = Ship('battleship', 4);
    const cruiser = Ship('cruiser', 3);
    const destroyer = Ship('destroyer', 2);
    const boat = Ship('boat', 1);

    return [carrier, battleship, cruiser, destroyer, boat];
};

export {
    randomCoords,
    randomOrientation,
    createShips,
};
