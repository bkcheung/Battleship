import "./style.css";
import {initBoard, renderShips} from './interface'
import { CreateShip } from './ship';
import { GameBoard } from './gameboard';

initBoard(10);
const gb = GameBoard(10);
gb.placeShip(3,[3,1],'v');
gb.placeShip(5, [5,5], 'v');
gb.placeShip(4, [2,5], 'h');

gb.receiveAttack([3,1]);

renderShips(gb, "pBoard");
