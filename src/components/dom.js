const content = document.querySelector('#content');

const createElement = (type, className) => {
    const element = document.createElement(type);
    element.setAttribute('class', className);
    return element;
};

const renderGrid = (board) => {
    const gridContainer = createElement('div', 'grid-container');

    for (let i = 0; i < board.length; i++) {
        const gridRow = createElement('div', 'grid-row');
        for (let j = 0; j < board[i].length; j++) {
            const square = createElement('div', 'square');
            gridRow.appendChild(square);
        }
        gridContainer.appendChild(gridRow);
    }

    content.appendChild(gridContainer);
};

export {
    renderGrid,
};
