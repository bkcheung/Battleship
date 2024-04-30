import { Ship } from "./ship";
import { Player} from "./player";
import { createGame } from "./game"

export function init(size:number, player: Player, computer:Player){
    initBoard(size);
    const game = createGame(player, computer)
    game.initAttackInt();
    game.positionShip();
    renderShips(computer); //dev only
    renderFleet('pfleet');
    // renderFleet('cfleet');
}

export function renderShips(player: Player){
    const gameboard = player.gameboard;
    const id = gameboard.id;
    const ships = gameboard.ships;
    ships.forEach((ship:Ship) => {
        const coords = ship.allCoords();
        coords.forEach((coord:number[])=>{ rShipPresent(coord, id);})
    })
}

function initBoard(size:number){
    const cBoard = document.getElementById('cBoard');
    cBoard.appendChild(drawBoard(size, 'csq'));
    const pBoard = document.getElementById('pBoard');
    pBoard.appendChild(drawBoard(size, 'psq'));
}

function rShipPresent(coord: number[], id:string){
    const board = document.getElementById(id);
    const numSq = board.getElementsByClassName('bodySq');
    const index = coord[0]*10 + coord[1];
    numSq[index].classList.add('shipPresent');
}

function drawBoard(size:number, id:string){
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