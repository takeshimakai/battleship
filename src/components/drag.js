import dom from './dom';

const domFunc = dom();

const dragStart = (e) => {
    e.dataTransfer.setData('text', e.target.id);
};

const dragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
};

const getDropCoords = (e) => {
    e.preventDefault();
    //const data = e.dataTransfer.getData('text');

    const { y, x } = domFunc.getSelectors(e);

    //const shipSquares = document.querySelector(`#${data}`).children;

    //for (let i = 0; i < shipSquares.length; i++) {
    //    const dropTarget = document.querySelector(`[data-y='${y}'][data-x='${Number(x) + i}']`);
    //    dropTarget.appendChild(shipSquares[i].cloneNode());
    //}
    return { y, x };
};

export { dragStart, dragOver, getDropCoords };
