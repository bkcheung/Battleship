import { GameBoard } from "../src/gameboard";

const gb = GameBoard(10);

it('ship placed', () => {
    expect(gb.placeShip(3,[1,1])).toBe(true);
});

it('invalid position', () => {
    expect(gb.placeShip(3,[10,1])).toBe(false);
})