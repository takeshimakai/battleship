const dom = () => {
    const content = document.querySelector('#content');

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
                const square = createElement('div', `${player}-square`);
                square.setAttribute('data-y', i);
                square.setAttribute('data-x', j);
                gridRow.appendChild(square);
            }
            gridContainer.appendChild(gridRow);
        }

        if (player === 'human') {
            boardTitle.textContent = 'Human';
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

    const getSelectors = (e) => {
        const className = e.target.getAttribute('class');
        const y = e.target.getAttribute('data-y');
        const x = e.target.getAttribute('data-x');

        return [className, y, x];
    };

    const populateGrid = (board, player) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] !== null) {
                    const square = document.querySelector(`.${player}-square[data-y='${i}'][data-x='${j}']`);
                    square.style.backgroundColor = '#303030';
                }
            }
        }
    };

    const updateGrid = (board, className) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const square = document.querySelector(`.${className}[data-y='${i}'][data-x='${j}']`);
                if (board[i][j] !== null && board[i][j].ship && board[i][j].hit === true) {
                    square.style.backgroundColor = 'red';
                    square.textContent = 'X';
                } else if (board[i][j] !== null && board[i][j].hit === true) {
                    square.style.backgroundColor = 'red';
                }
            }
        }
    };

    return {
        renderGrid,
        renderStartBtn,
        getSelectors,
        populateGrid,
        updateGrid,
    };
};

export default dom;
