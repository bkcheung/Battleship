import { GameBoard } from "../src/gameboard";

const gb = GameBoard(10);

it('horizontal: ship placed', () => {
    expect(gb.placeShip(3,[1,1],'h')).toBe(true);
});

it('horizontal: invalid position', () => {
    expect(gb.placeShip(3,[10,1],'h')).toBe(false);
});

it('vertical: ship placed', () => {
    expect(gb.placeShip(3,[1,1],'v')).toBe(true);
});

it('vertical: invalid position', () => {
    expect(gb.placeShip(3,[1,10],'v')).toBe(false);
});

it('received attack', () => {
    expect(gb.receiveAttack([1,1])).toBe(true);
})

it('Attack missed', () => {
    expect(gb.receiveAttack([5,1])).toEqual([5,1]);
})