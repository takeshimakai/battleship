import Gameboard from '../components/Gameboard';
import Player from '../components/Player';

const player = Player();
const computer = Player('computer');
const playerBoard = Gameboard();
const computerBoard = Gameboard();

test('attack() takes a coordinate and attacks enemy board', () => {
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

describe('autoAttack() functionality', () => {
    test('autoAttack() attacks at random coordinate on enemy board', () => {
        computer.autoAttack(playerBoard);
    
        expect(playerBoard.getBoard()).toEqual(
            expect.arrayContaining([
                expect.arrayContaining([
                    expect.objectContaining({ hit: true })
                ])
            ])
        );
    });

    test('autoAttack() gets called repeatedly until empty cell is attacked', () => {
        const board = playerBoard.getBoard();
        
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === null) {
                    computer.autoAttack(playerBoard);
                    i = 0;
                    j = 0;
                }
            }
        }

        expect(playerBoard.getBoard()).toEqual(
            expect.arrayContaining([
                expect.not.arrayContaining([null])
            ])
        );
    });
});
