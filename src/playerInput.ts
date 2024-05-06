import { Game } from "./game";
import { renderShips } from "./interface";

export interface Overlay {
  game: Game;
  orientation: string;
  ships: string[][];
  positionShip: () => void;
}
export function createOverlay(game: Game): Overlay {
  return {
    game,
    orientation: "h",
    ships: [
      ["5", "aircraft-carrier"],
      ["4", "battleship"],
      ["3", "cruiser"],
      ["3", "submarine"],
      ["2", "destroyer"],
    ],
    positionShip() {
      let count = 4;
      updateMsg(`Please place ${this.ships[count][1]}`);
      updateImg(`${this.ships[count][1]}`);
      document.addEventListener("click", (event) => {
        const sq = event.target as HTMLElement;
        if (sq.classList.contains("placeSq")) {
          if (count > -1) {
            const length = Number(this.ships[count][0]);
            const id = String(this.ships[count][1]);
            const coords = getCoords(event);
            if (
              this.game.player.gameboard.placeShip(
                id,
                length,
                coords,
                this.orientation,
              )
            ) {
              count--;
              if (count === -1) {
                this.game.gameDone = false;
                document.getElementById("playerInput").classList.add("hidden");
                renderShips(this.game.player, "psq");
              } else {
                renderShips(this.game.player, "placeSq");
                updateMsg(`Please place ${this.ships[count][1]}`);
                updateImg(this.ships[count][1]);
              }
            } else updateMsg("Please select a valid position");
          }
        }
      });
    },
  };
}
function updateMsg(message: string) {
  const msg = document.getElementById("placementMsg");
  msg.innerHTML = message;
}
function getCoords(e: Event) {
  const clicked = e.target as HTMLElement;
  const row = Number(clicked.getAttribute("row"));
  const col = Number(clicked.getAttribute("col"));
  return [row, col];
}
function updateImg(ship: string) {
  const currShip = document.getElementById("currShip");
  const classList = currShip.classList;
  classList.remove(classList.item(0));
  currShip.classList.add(ship);
}
