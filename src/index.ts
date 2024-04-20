import "./style.css";
import {init} from './interface'
import { GameBoard } from './gameboard';
import { populateBoard, createPlayer } from "./player";

const size = 10;
const computer = createPlayer(size, populateBoard(GameBoard(size, 'cBoard')));
const player = createPlayer(size, populateBoard(GameBoard(size, 'pBoard')));
init(size, player, computer);

