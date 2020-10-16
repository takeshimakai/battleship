import Gameboard from '../components/Gameboard';
import Ship from '../components/Ship';

const gameboard = Gameboard();

afterEach(() => {
    const board = gameboard.getBoard();

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = null;
        }
    }
});

test('Board is a 10x10 grid', () => {
    expect(gameboard.getBoard()).toEqual(
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

describe('isValidPlacement() functionality', () => {
    const ship = Ship('ship', 4);

    test('returns false if one of the cell is occupied by another ship', () => {
        const anotherShip = Ship ('anotherShip', 4);

        gameboard.placeShip(ship, 'horizontal', 1, 0);

        expect(gameboard.isValidPlacement(anotherShip, 'vertical', 0, 0)).toBeFalsy();
    });

    test('returns false if ship extends beyond the grid', () => {
        expect(gameboard.isValidPlacement(ship, 'horizontal', 0, 9)).toBeFalsy();
        expect(gameboard.isValidPlacement(ship, 'vertical', 9, 0)).toBeFalsy();
    });
});

describe('placeShip() functionality', () => {
    const ship = Ship('ship', 4);

    test('Place ship horizontally', () => {
    gameboard.placeShip(ship, 'horizontal', 2, 3);
    
        expect(gameboard.getBoard()).toEqual(
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
        gameboard.placeShip(ship, 'vertical', 2, 3);
    
        expect(gameboard.getBoard()).toEqual(
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
});

describe('receiveAttack() functionality', () => {
    test('receiveAttack function enters object "hit: true" if coordinate is null', () => {
        gameboard.receiveAttack(0, 1);
    
        expect(gameboard.getBoard()).toEqual(
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
    
        gameboard.placeShip(ship, 'horizontal', 0, 1);
        gameboard.receiveAttack(0, 2);
    
        expect(ship.getHealth()).toEqual(['o', 'x', 'o', 'o']);
    });
});

test('allShipsSunk() returns false when ships not sunk', () => {
    const gameboard = Gameboard();
    const ship = Ship('ship', 2);

    gameboard.placeShip(ship, 'horizontal', 4, 2);
    gameboard.receiveAttack(4, 2);

    expect(gameboard.allShipsSunk()).toBe(false);
});

test('allShipsSunk() returns true when all ships sunk', () => {
    const gameboard = Gameboard();
    const ship = Ship('ship', 2);

    gameboard.placeShip(ship, 'horizontal', 4, 2);
    gameboard.receiveAttack(4, 2);
    gameboard.receiveAttack(4, 3);

    expect(gameboard.allShipsSunk()).toEqual(true);
});
