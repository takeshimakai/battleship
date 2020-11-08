const dragStart = (e) => {
    e.dataTransfer.setData('text', e.target.id);
};

const dragOver = (e) => {
    e.preventDefault();
};

const drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');

    const ship = document.querySelector(`#${data}`);

    e.target.appendChild(ship);
};

export { dragStart, dragOver, drop };
