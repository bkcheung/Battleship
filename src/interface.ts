import { Ship } from "./ship";
import { Player} from "./player";
import { Game, createGame } from "./game"


export function init(size:number, player: Player, computer:Player){
    initBoard(size);
    const game = createGame(player, computer)
    game.initAttackInt();
    renderShips(player);
    renderShips(computer); //dev
    renderFleet(game.player);
    renderFleet(game.computer);
}

function initBoard(size:number){
    const cBoard = document.getElementById('cBoard');
    cBoard.appendChild(drawBoard(size));
    const pBoard = document.getElementById('pBoard');
    pBoard.appendChild(drawBoard(size));
}

function renderShips(player: Player){
    const gameboard = player.gameboard;
    const id = gameboard.id;
    const ships = gameboard.ships;
    ships.forEach((ship:Ship) => {
        const coords = ship.allCoords();
        coords.forEach((coord:number[])=>{ rShipPresent(coord, id);})
    })
}

function rShipPresent(coord: number[], id:string){
    const board = document.getElementById(id);
    const numSq = board.getElementsByClassName('bodySq');
    const index = coord[0]*10 + coord[1];
    numSq[index].classList.add('shipPresent');
}

function drawBoard(size:number){
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
            bodySq.setAttribute('row',`${i}`);
            bodySq.setAttribute('col',`${j}`);
            board.appendChild(bodySq);
        }
    }
    return board;
}

function renderFleet(player: Player){
    const ships = player.gameboard.ships;
    let fleetID:string;
    if(player.gameboard.id==='pBoard') fleetID = 'pfleet';
    else if(player.gameboard.id==='cBoard') fleetID = 'cfleet';
    const fleet = document.getElementById(fleetID);
    for(let i=0; i<ships.length; i++){
        const id = ships[i].id;
        const length = ships[i].length;
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