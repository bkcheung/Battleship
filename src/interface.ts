import { Board } from "./gameboard";
import { Ship } from "./ship";

export function initBoard(size:number){
    const cBoard = document.getElementById('cBoard');
    cBoard.appendChild(drawBoard(size));
    const pBoard = document.getElementById('pBoard');
    pBoard.appendChild(drawBoard(size));
}

export function renderShips(gameboard: Board, id:string){
    const ships = gameboard.ships;
    ships.forEach((ship:Ship) => {
        const coords = ship.allCoords();
        coords.forEach((coord:number[])=>{
            rShipPresent(coord, id);
        })
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
    for(let i=1; i<size+1;i++){
        const numSq = document.createElement('div');
        numSq.classList.add('numSq');
        // numSq.classList.add(`${i}`);
        numSq.textContent = String(i);
        board.appendChild(numSq);
        for(let j=1;j<size+1;j++){
            const bodySq = document.createElement('div');
            bodySq.classList.add('bodySq');
            board.appendChild(bodySq);
        }
    }
    return board;
}