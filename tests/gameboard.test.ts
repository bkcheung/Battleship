import { GameBoard } from "../src/gameboard";

const gb = GameBoard(10, 'pBoard');

it('horizontal: ship placed', () => {
    expect(gb.placeShip(3,[1,1],'h')).toBe(true);
});
it('vertical: ship placed', () => {
    expect(gb.placeShip(3,[5,1],'v')).toBe(true);
});
it('horizontal: invalid position', () => {
    expect(gb.placeShip(3,[1,10],'h')).toBe(false);
});
it('vertical: invalid position', () => {
    expect(gb.placeShip(3,[10,1],'v')).toBe(false);
});
it('vertical: ship already exists there', () => {
    expect(gb.placeShip(3,[1,1],'v')).toBe(false);
});

it('Received attack I', () => {
    expect(gb.receiveAttack([1,1])).toBe(true);
    expect(gb.board[1][1]).toBe(2);
    expect(gb.ships[0].hitCount).toBe(1);
})

it('Attack missed', () => {
    expect(gb.receiveAttack([9,9])).toEqual(false);
    expect(gb.board[9][9]).toBe(-1);
})

it('Ships not all sunk', () =>{
    expect(gb.shipStatus()).toEqual(false);
})

it('Ships all sunk', () =>{
    expect(gb.receiveAttack([1,2])).toEqual(true);
    expect(gb.receiveAttack([1,3])).toEqual(true);
    expect(gb.receiveAttack([5,1])).toEqual(true);
    expect(gb.receiveAttack([6,1])).toEqual(true);
    expect(gb.receiveAttack([7,1])).toEqual(true);
    expect(gb.shipStatus()).toEqual(true);
    expect(gb.ships[0].sunk).toEqual(true);
    expect(gb.ships[1].sunk).toEqual(true);
})