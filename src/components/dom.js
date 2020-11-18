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
        startBtn.disabled = true;
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
        const y = Number(e.target.getAttribute('data-y'));
        const x = Number(e.target.getAttribute('data-x'));
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

    const removeAnnouncement = (elementId) => {
        if (document.querySelector(`#${elementId}`)) {
            document.querySelector(`#${elementId}`).remove();
        }
    };

    const announceWinner = (winner) => {
        const announcementBox = newElement('h1', 'box', 'winner-box');
        announcementBox.textContent = `${winner} wins!`;

        gridSection.appendChild(announcementBox);
    };

    const gameStartAnnouncement = () => {
        const gameStartText = newElement('h1', 'box', 'game-start-box');
        gameStartText.textContent = 'Fire away!';

        gridSection.appendChild(gameStartText);
    };

    const renderShip = (ship) => {
        const shipContainer = newElement('div', 'ship', `${ship.name}`);
        shipContainer.setAttribute('draggable', 'true');
        shipContainer.style.flexDirection = 'row';

        for (let i = 0; i < ship.length; i++) {
            const shipSquare = newElement('div', 'ship-square');
            shipSquare.classList.add(`${ship.name}-square`);
            shipContainer.appendChild(shipSquare);
        }

        shipSection.appendChild(shipContainer);
    };

    const rotateShip = (ship) => {
        const shipContainer = document.querySelector(`#${ship.name}`);
        const shipOrientation = ship.getOrientation();

        if (shipOrientation === 'horizontal') {
            shipContainer.style.flexDirection = 'row';
        } else {
            shipContainer.style.flexDirection = 'column';
        }
    };

    const rotateShipBtn = (e) => {
        if (!e.target.classList.contains('placed-ship')) {
            const rotateBtn = newElement('button', 'btn', 'rotate-btn');
            rotateBtn.innerHTML = '&#8635';

            e.target.appendChild(rotateBtn);
        }
    };

    const removeRotateShipBtn = () => {
        if (document.querySelector('#rotate-btn')) {
            document.querySelector('#rotate-btn').remove();
        }
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
        removeAnnouncement,
        announceWinner,
        gameStartAnnouncement,
        renderShip,
        rotateShip,
        rotateShipBtn,
        removeRotateShipBtn,
    };
};

export default dom;
