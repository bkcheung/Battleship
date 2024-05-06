import "./style.css";
import { init } from "./interface";
import { GameBoard } from "./gameboard";
import { createPlayer } from "./player";

const size = 10;
const computer = createPlayer(size, GameBoard(size, "cBoard"));
const player = createPlayer(size, GameBoard(size, "pBoard"));
computer.populateBoard();
init(size, player, computer);
