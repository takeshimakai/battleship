import Ship from '../components/Ship';

test('hit() function takes a number and marks position as "hit"', () => {
    const newShip = Ship();
    const number = 1;
    expect(newShip.hit(1)).toBe('hit');
});
