const dom = () => {
    const btnSection = document.querySelector('#buttons-section');
    const gridSection = document.querySelector('#grids-section');
    const shipSection = document.querySelector('#ships-section');

    const newElement = (type, className, id) => {
        const element = document.createElement(type);
        element.setAttribute('class', className);
        if (id !== undefined) {
            element.setAttribute('id', id);
        }
        return element;
    };

    const renderGrid = (board, player) => {
        const playerContainer = newElement('div', 'player-container', `${player}-container`);
        const gridContainer = newElement('div', 'grid-container', `${player}-grid`);
        const boardTitle = newElement('h3', 'board-title');

        for (let i = 0; i < board.length; i++) {
            const gridRow = newElement('div', 'grid-row');
            for (let j = 0; j < board[i].length; j++) {
                const square = newElement('div', `${player}-square`);
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

        playerContainer.append(boardTitle, gridContainer);
        gridSection.appendChild(playerContainer);
    };

    const renderStartBtn = () => {
        const startBtn = newElement('button', 'btn', 'start-btn');
        startBtn.textContent = 'Start Game';
        btnSection.appendChild(startBtn);
    };

    const renderResetBtn = () => {
        const resetBtn = newElement('button', 'btn', 'reset-btn');
        resetBtn.textContent = 'Reset Game';
        btnSection.appendChild(resetBtn);
    };

    const renderAutoPlaceBtn = () => {
        const autoPlaceBtn = newElement('button', 'btn', 'auto-place-btn');
        autoPlaceBtn.textContent = 'Auto Place Ships';
        btnSection.appendChild(autoPlaceBtn);
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
        const announcementBox = newElement('h1', 'box', 'announcement-box');
        announcementBox.textContent = `${winner} wins!`;

        gridSection.appendChild(announcementBox);
    };

    const removeAnnouncement = () => {
        if (document.querySelector('#announcement-box')) {
            document.querySelector('#announcement-box').remove();
        }
    };

    const renderShips = (ships) => {
        ships.forEach((ship) => {
            const shipElement = newElement('div', 'ship', `${ship.name}`);
            shipElement.setAttribute('draggable', 'true');

            for (let i = 0; i < ship.length; i++) {
                const shipSquare = newElement('div', 'ship-square', `${ship.name}-square`);
                shipElement.appendChild(shipSquare);
            }

            shipSection.appendChild(shipElement);
        });
    };

    return {
        renderGrid,
        renderStartBtn,
        renderResetBtn,
        renderAutoPlaceBtn,
        getSelectors,
        populateGrid,
        updateGrid,
        resetGrid,
        announceWinner,
        removeAnnouncement,
        renderShips,
    };
};

export default dom;
