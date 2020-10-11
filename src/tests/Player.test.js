import Gameboard from '../components/Gameboard';
import Player from '../components/Player';

test('attack() takes a coordinate and attacks enemy board', () => {
    const computerBoard = Gameboard();

    const player = Player();

    player.attack(0, 1, computerBoard);

    expect(computerBoard.getBoard()).toEqual(
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
    )
});

test.only('autoAttack() attacks the board at random coordinates', () => {
    const playerBoard = Gameboard();

    const computer = Player('computer');

    computer.autoAttack(playerBoard);

    expect(playerBoard.getBoard().map(arr => arr.some(item => item.hit === true))).toBeTruthy();
});
