import { CreateShip } from './ship';
import { GameBoard } from './gameboard';

const gb = GameBoard(10);
gb.placeShip(3,[3,1],'v');
gb.receiveAttack([3,1]);
console.log(gb.ships);
