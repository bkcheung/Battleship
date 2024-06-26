import { Ship } from "./ship";
import { Player } from "./player";
import { createGame, Game } from "./game";
import { createOverlay, Overlay } from "./playerInput";

export function init(size: number, player: Player, computer: Player) {
  initBoard(size);
  const game = createGame(player, computer);
  game.initAttackInt();
  const overlay = createOverlay(game);
  overlay.positionShip();
  overlayInit(overlay, game);
  renderFleet("fleetSection");
  styleLog();
  window.addEventListener("resize", () => {
    styleFleet();
    styleLog();
  });
}
export function renderShips(player: Player, id: string) {
  const gameboard = player.gameboard;
  const ships = gameboard.ships;
  ships.forEach((ship: Ship) => {
    const coords = ship.allCoords();
    coords.forEach((coord: number[]) => {
      rShipPresent(coord, id);
    });
  });
}
export function drawBoard(size: number, id: string) {
  const board = document.createElement("div");
  board.classList.add("gameboard");
  const letterSq = document.createElement("div");
  letterSq.classList.add("letterSq");
  board.appendChild(letterSq);
  let code = 65;
  for (let i = 0; i < size; i++) {
    const letterSq = document.createElement("div");
    letterSq.classList.add("letterSq");
    letterSq.textContent = String.fromCharCode(code + i);
    board.appendChild(letterSq);
  }
  for (let i = 0; i < size; i++) {
    const numSq = document.createElement("div");
    numSq.classList.add("numSq");
    numSq.textContent = String(i);
    board.appendChild(numSq);
    for (let j = 0; j < size; j++) {
      const bodySq = document.createElement("div");
      bodySq.classList.add("bodySq");
      bodySq.classList.add(`${id}`);
      bodySq.setAttribute("row", `${i}`);
      bodySq.setAttribute("col", `${j}`);
      board.appendChild(bodySq);
    }
  }
  return board;
}
function overlayInit(overlay: Overlay, game: Game) {
  document.getElementById("placeBoard").appendChild(drawBoard(10, "placeSq"));
  const rotate = document.getElementById("rotate");
  const currShip = document.getElementById("currShip");
  rotate.addEventListener("click", (e) => {
    e.preventDefault();
    if (overlay.orientation === "h") overlay.orientation = "v";
    else if (overlay.orientation === "v") overlay.orientation = "h";
    currShip.toggleAttribute("rotated");
  });
  const auto = document.getElementById("auto");
  auto.addEventListener("click", (e) => {
    e.preventDefault();
    game.player.populateBoard();
    game.gameDone = false;
    document.getElementById("playerInput").classList.add("hidden");
    renderShips(game.player, "psq");
  });
}
function initBoard(size: number) {
  const cBoard = document.getElementById("cBoard");
  cBoard.appendChild(drawBoard(size, "csq"));
  const pBoard = document.getElementById("pBoard");
  pBoard.appendChild(drawBoard(size, "psq"));
}
function rShipPresent(coord: number[], id: string) {
  const numSq = document.getElementsByClassName(id);
  const index = coord[0] * 10 + coord[1];
  numSq[index].classList.add("shipPresent");
}
function renderFleet(fleetID: string) {
  const fleetW = document.getElementById(fleetID);
  const fleet = Object.assign(document.createElement("div"), {
    class: "fleetList",
    id: "pfleet",
  });
  fleet.style.display = "flex";
  for (let i = 0; i < 5; i++) {
    const ships = [
      [5, "aircraft-carrier"],
      [4, "battleship"],
      [3, "cruiser"],
      [3, "submarine"],
      [2, "destroyer"],
    ];
    const length = Number(ships[i][0]);
    const id = String(ships[i][1]);
    const span = document.createElement("span");
    span.classList.add(id);
    span.classList.add("shipRender");
    const status = document.createElement("span");
    for (let j = 0; j < length; j++) {
      const square = document.createElement("div");
      square.classList.add("fleetStatus");
      status.appendChild(square);
    }
    span.appendChild(status);
    fleet.appendChild(span);
  }
  fleetW.appendChild(fleet);
  styleFleet();
}
function styleFleet() {
  const pb = document.getElementById("pageBody");
  const fleetSect = document.getElementById("fleetSection");
  const pfleet = document.getElementById("pfleet");
  const gbWidth = document.getElementById("gbs").offsetWidth;
  if (window.innerWidth > 1240) {
    pb.setAttribute("style", "flex-direction: row; align-items:stretch");
    fleetSect.setAttribute(
      "style",
      `margin: 0px 1em; 
        flex-direction: column; width: ""`,
    );
    pfleet.style.flexDirection = "column";
  } else {
    pb.setAttribute("style", "flex-direction: column; align-items:center");
    fleetSect.setAttribute(
      "style",
      `margin: 1em 0px; 
        flex-direction: row; width: calc(${gbWidth}px - 6em)`,
    );
    pfleet.style.flexDirection = "row";
  }
}
function styleLog() {
  const gbWidth = document.getElementById("gbs").offsetWidth;
  const fleetWidth = document.getElementById("pfleet").offsetWidth;
  const bLog = document.getElementById("battleLog");
  if (window.innerWidth > 1240) {
    const margin = (window.innerWidth - gbWidth + fleetWidth) / 2;
    bLog.setAttribute("style", `margin-right: calc(${margin}px - 13em)`);
  } else {
    const margin = (window.innerWidth - gbWidth) / 2;
    bLog.setAttribute("style", `margin-right: calc(${margin}px + 1em)`);
  }
}
