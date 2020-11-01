const dom = () => {
    const btnSection = document.querySelector('#buttons-section');
    const gridSection = document.querySelector('#grids-section');

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
                square.setAttribute('data-clicked', 'false');
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
        gridSection.appendChild(gridContainer);
    };

    const renderStartBtn = () => {
        const startBtn = createElement('button', 'btn', 'start-btn');
        startBtn.textContent = 'Start Game';
        btnSection.appendChild(startBtn);
    };

    const renderResetBtn = () => {
        const resetBtn = createElement('button', 'btn', 'reset-btn');
        resetBtn.textContent = 'Reset Game';
        btnSection.appendChild(resetBtn);
    };

    const getSelectors = (e) => {
        const className = e.target.getAttribute('class');
        const y = e.target.getAttribute('data-y');
        const x = e.target.getAttribute('data-x');
        const clicked = e.target.getAttribute('data-clicked');

        return {
            className,
            y,
            x,
            clicked,
        };
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

    const resetGrid = (player) => {
        const squares = document.querySelectorAll(`.${player}-square`);
        squares.forEach((square) => {
            square.textContent = '';
            square.style.backgroundColor = 'lightblue';
            square.setAttribute('data-clicked', 'false');
        });
    };

    const announceWinner = (winner) => {
        const announcementBox = createElement('h1', 'box', 'announcement-box');
        announcementBox.textContent = `${winner} wins!`;

        gridSection.appendChild(announcementBox);
    };

    const removeAnnouncement = () => {
        if (document.querySelector('#announcement-box')) {
            document.querySelector('#announcement-box').remove();
        }
    };

    return {
        renderGrid,
        renderStartBtn,
        renderResetBtn,
        getSelectors,
        populateGrid,
        updateGrid,
        resetGrid,
        announceWinner,
        removeAnnouncement,
    };
};

export default dom;
