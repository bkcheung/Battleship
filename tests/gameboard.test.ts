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