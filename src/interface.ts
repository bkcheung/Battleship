import { Board } from "./gameboard";
import { Ship } from "./ship";

export function initBoard(size:number, compBoard:Board, playerBoard:Board){
    const cBoard = document.getElementById('cBoard');
    cBoard.appendChild(drawBoard(size));
    const pBoard = document.getElementById('pBoard');
    pBoard.appendChild(drawBoard(size));
    renderShips(playerBoard);
    initAttackInt(compBoard);
}

export function renderShips(gameboard: Board){
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

function initAttackInt(gameboard:Board){
    const board = document.getElementById(`${gameboard.id}`);
    const bodySq = board.getElementsByClassName('bodySq');
    for(let i=0;i<bodySq.length;i++){
        const row = Number(bodySq[i].getAttribute('row'));
        const col = Number(bodySq[i].getAttribute('col'));
        const coord = [row,col];
        bodySq[i].addEventListener('click',()=>{
            if(gameboard.receiveAttack(coord)){ bodySq[i].classList.add('hit');}
            else{ bodySq[i].classList.add('miss');}
        });
    }
}