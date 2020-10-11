import Gameboard from '../components/Gameboard';
import Ship from '../components/Ship';

test('Board is a 10x10 grid', () => {
    const gameboard = Gameboard();
    const board = gameboard.getBoard();

    expect(board).toEqual(
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ],
    );
});

test('Place ship horizontally', () => {
    const ship = Ship('ship', 4);

    const gameboard = Gameboard();
    gameboard.placeShip(ship, 'horizontal', 2, 3);

    const updatedBoard = gameboard.getBoard();

    expect(updatedBoard).toEqual(
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, { ship, index: 0, hit: false }, { ship, index: 1, hit: false }, { ship, index: 2, hit: false }, { ship, index: 3, hit: false }, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ],
    );
});

test('Place ship vertically', () => {
    const ship = Ship('ship', 4);

    const gameboard = Gameboard();
    gameboard.placeShip(ship, 'vertical', 2, 3);

    const updatedBoard = gameboard.getBoard();

    expect(updatedBoard).toEqual(
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, { ship, index: 0, hit: false }, null, null, null, null, null, null],
            [null, null, null, { ship, index: 1, hit: false }, null, null, null, null, null, null],
            [null, null, null, { ship, index: 2, hit: false }, null, null, null, null, null, null],
            [null, null, null, { ship, index: 3, hit: false }, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ],
    );
});

test('receiveAttack function enters object "hit: true" if coordinate is null', () => {
    const gameboard = Gameboard();
    gameboard.receiveAttack(0, 1);

    const updatedBoard = gameboard.getBoard();

    expect(updatedBoard).toEqual(
        [
            [null, { hit: true }, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ],
    );
});

test('receiveAttack function calls hit function if coordinate has a ship', () => {
    const ship = Ship('ship', 4);

    const gameboard = Gameboard();
    gameboard.placeShip(ship, 'horizontal', 0, 1);
    gameboard.receiveAttack(0, 2);

    const shipHealth = ship.getHealth();

    expect(shipHealth).toEqual(['o', 'x', 'o', 'o']);
});

test('allShipsSunk() returns false when ships not sunk', () => {
    const ship = Ship('ship', 2);

    const gameboard = Gameboard();
    gameboard.placeShip(ship, 'horizontal', 4, 2);
    gameboard.receiveAttack(4, 2);

    expect(gameboard.allShipsSunk()).toBe(false);
});

test('allShipsSunk() returns true when ships sunk', () => {
    const ship = Ship('ship', 2);

    const gameboard = Gameboard();
    gameboard.placeShip(ship, 'horizontal', 4, 2);
    gameboard.receiveAttack(4, 2);
    gameboard.receiveAttack(4, 3);

    expect(gameboard.allShipsSunk()).toEqual(true);
});
