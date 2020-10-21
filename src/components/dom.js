const content = document.querySelector('#content');

const dom = () => {
    const createElement = (type, className, id) => {
        const element = document.createElement(type);
        element.setAttribute('class', className);
        if (id !== undefined) {
            element.setAttribute('id', id);
        }
        return element;
    };

    const renderGrid = (board, player) => {
        const gridContainer = createElement('div', 'grid-container', `${player}-grid`);
        const boardTitle = createElement('h3', 'board-title');

        for (let i = 0; i < board.length; i++) {
            const gridRow = createElement('div', 'grid-row');
            for (let j = 0; j < board[i].length; j++) {
                const square = createElement('div', 'square');
                square.setAttribute('data-y', i);
                square.setAttribute('data-x', j);
                gridRow.appendChild(square);
            }
            gridContainer.appendChild(gridRow);
        }

        if (player === 'player') {
            boardTitle.textContent = 'Player';
        } else {
            boardTitle.textContent = 'Computer';
        }

        gridContainer.prepend(boardTitle);
        content.appendChild(gridContainer);
    };

    const renderStartBtn = () => {
        const startBtn = createElement('button', 'btn', 'start-btn');
        startBtn.textContent = 'Start Game';
        content.appendChild(startBtn);
    };

    const getCoords = (e) => {
        const y = e.target.getAttribute('data-y');
        const x = e.target.getAttribute('data-x');

        return [y, x];
    };

    const updateSquare = (board, y, x) => {
        const targetSquare = document.querySelector(`[data-y='${y}'][data-x='${x}']`);

        if (board[y][x].ship && board[y][x].hit === false) {
            targetSquare.style.backgroundColor = 'red';
            targetSquare.textContent = 'X';
        } else {
            targetSquare.style.backgroundColor = 'red';
        }
    };

    const populateGrid = (board, player) => {
        
    };

    return {
        renderGrid,
        renderStartBtn,
        getCoords,
        updateSquare,
    };
};

export default dom;
