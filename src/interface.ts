import { Ship } from "./ship";
import { Player} from "./player";
import { createGame, Game } from "./game"
import { createOverlay, Overlay } from "./playerInput"

export function init(size:number, player: Player, computer:Player){
    initBoard(size);
    const game = createGame(player, computer)
    game.initAttackInt();
    const overlay = createOverlay(game);
    overlay.positionShip();
    overlayInit(overlay, game);
    renderShips(computer, 'csq'); //dev only
    renderFleet('pfleet');
}
export function renderShips(player: Player, id:string){
    const gameboard = player.gameboard;
    const ships = gameboard.ships;
    ships.forEach((ship:Ship) => {
        const coords = ship.allCoords();
        coords.forEach((coord:number[])=>{ rShipPresent(coord, id);})
    })
}
export function drawBoard(size:number, id:string){
    const board = document.createElement('div');
    board.classList.add('gameboard');
    const letterSq = document.createElement('div');
    letterSq.classList.add('letterSq');
    board.appendChild(letterSq);
    let code = 65;
    for(let i=0;i<size;i++){
        const letterSq = document.createElement('div');
        letterSq.classList.add('letterSq');
        letterSq.textContent = String.fromCharCode(code+i);
        board.appendChild(letterSq);
    }
    for(let i=0; i<size;i++){
        const numSq = document.createElement('div');
        numSq.classList.add('numSq');
        numSq.textContent = String(i);
        board.appendChild(numSq);
        for(let j=0;j<size;j++){
            const bodySq = document.createElement('div');
            bodySq.classList.add('bodySq');
            bodySq.classList.add(`${id}`);
            bodySq.setAttribute('row',`${i}`);
            bodySq.setAttribute('col',`${j}`);
            board.appendChild(bodySq);
        }
    }
    return board;
}
function overlayInit(overlay:Overlay, game:Game){
    document.getElementById('placeBoard').appendChild(drawBoard(10,'placeSq'));
    const rotate = document.getElementById('rotate');
    const currShip = document.getElementById('currShip');
    rotate.addEventListener('click',(e)=>{
        e.preventDefault();
        if(overlay.orientation==='h') overlay.orientation='v';
        else if(overlay.orientation==='v') overlay.orientation='h';
        currShip.toggleAttribute('rotated');
        console.log(overlay.orientation);
    })
    const auto = document.getElementById('auto');
    auto.addEventListener('click',(e)=>{
        e.preventDefault();
        game.player.populateBoard();
        game.gameDone = false;
        document.getElementById("playerInput").classList.add('hidden');
        renderShips(game.player, 'psq');
    })
}
function initBoard(size:number){
    const cBoard = document.getElementById('cBoard');
    cBoard.appendChild(drawBoard(size, 'csq'));
    const pBoard = document.getElementById('pBoard');
    pBoard.appendChild(drawBoard(size, 'psq'));
}
function rShipPresent(coord: number[], id:string){
    const numSq = document.getElementsByClassName(id);
    const index = coord[0]*10 + coord[1];
    numSq[index].classList.add('shipPresent');
}
function renderFleet(fleetID: string){
    const fleet = document.getElementById(fleetID);
    for(let i=0; i<5; i++){
        const ships = [[5,'aircraft-carrier'],[4,'battleship'],[3,'cruiser'],
                       [3,'submarine'],[2,'destroyer']];
        const length = Number(ships[i][0]);
        const id = String(ships[i][1]);
        const span = document.createElement('span');
        span.classList.add(id);
        span.classList.add('shipRender');
        const status = document.createElement('span');
        for(let j=0; j<length;j++){
            const square = document.createElement('div');
            square.classList.add('fleetStatus');
            status.appendChild(square);
        }
        span.appendChild(status);
        fleet.appendChild(span);
    }
}