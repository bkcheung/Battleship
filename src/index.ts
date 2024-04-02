import { CreateShip } from './ship';
import { GameBoard } from './gameboard';

const sheep = CreateShip(3);
sheep.hit();
sheep.hit();
sheep.hit();
console.log(sheep.isSunk());

const gb = GameBoard(10);
gb.placeShip(3,[3,1],'v');
console.log(gb.ships);
