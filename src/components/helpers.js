const randomCoords = () => {
    const y = Math.floor(Math.random() * Math.floor(10));
    const x = Math.floor(Math.random() * Math.floor(10));

    return [y, x];
};

const randomOrientation = () => {
    const randomNum = Math.floor(Math.random() * Math.floor(2));

    return randomNum === 0 ? 'horizontal' : 'vertical';
};

export { randomCoords, randomOrientation };
