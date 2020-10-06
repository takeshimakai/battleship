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
    const updatedBoard = gameboard.placeShip(ship, 'horizontal', 2, 3);

    expect(updatedBoard).toEqual(
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, 'ship', 'ship', 'ship', 'ship', null, null, null],
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
    const updatedBoard = gameboard.placeShip(ship, 'vertical', 2, 3);

    expect(updatedBoard).toEqual(
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, 'ship', null, null, null, null, null, null],
            [null, null, null, 'ship', null, null, null, null, null, null],
            [null, null, null, 'ship', null, null, null, null, null, null],
            [null, null, null, 'ship', null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ],
    );
});
