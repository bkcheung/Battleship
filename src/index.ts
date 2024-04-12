import "./style.css";
import {initBoard, renderShips} from './interface'
import { CreateShip } from './ship';
import { GameBoard } from './gameboard';

initBoard(10);
const gb = GameBoard(10);
gb.placeShip(3,[3,1],'v');
gb.placeShip(5, [5,5], 'v');
gb.placeShip(4, [2,5], 'h');

const cgb = GameBoard(10);
cgb.placeShip(3,[3,1],'h');
cgb.placeShip(5, [8,3], 'h');
cgb.placeShip(4, [2,8], 'v');

renderShips(gb, "pBoard");
renderShips(cgb, "cBoard");

gb.receiveAttack([3,1]);
