import Ship from '../components/Ship';

test('hit() function takes a number and marks position as "x"', () => {
    const newShip = Ship(4);
    const num = 1;

    const updatedHealth = newShip.hit(num);

    expect(updatedHealth).toEqual(['o', 'x', 'o', 'o']);
});

test('isSunk() returns true when all positions have been hit', () => {
    const newShip = Ship(1);

    newShip.hit(0);

    const isSunk = newShip.isSunk();

    expect(isSunk).toEqual(true);
});

test('isSunk() returns false when not all positions have been hit', () => {
    const newShip = Ship(1);

    const isSunk = newShip.isSunk();

    expect(isSunk).toEqual(false);
});
