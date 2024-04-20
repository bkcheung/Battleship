import { Board } from "./gameboard";
import { Ship } from "./ship";
import {createPlayer, Player} from "./player";
import { GameBoard } from './gameboard';


export function init(size:number, player: Player, computer:Player){
    initBoard(size);
    renderShips(player);
    initAttackInt(player, computer);
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

function initAttackInt(player:Player, computer: Player){
    const cgb = computer.gameboard;
    const cBoard = document.getElementById(`${cgb.id}`);
    const cBodySq = cBoard.getElementsByClassName('bodySq');
    //Init computer board to receive attacks
    for(let i=0;i<cBodySq.length;i++){
        const row = Number(cBodySq[i].getAttribute('row'));
        const col = Number(cBodySq[i].getAttribute('col'));
        const coord = [row,col];
        cBodySq[i].addEventListener('click',()=>{
            if(cgb.receiveAttack(coord)){hit(cBodySq[i], coord, 'Player');}
            else {miss(cBodySq[i], coord, 'Player')}
            compPlay(player);
        });
    }
}

function compPlay(player:Player){
    setTurn('cturn');
    setTimeout(()=>{
        const coords = player.genAttack();
        const row = coords[0];
        const col = coords[1];
        const pgb = player.gameboard;
        const pBoard = document.getElementById(`${pgb.id}`);
        const sq = Array.from(pBoard.getElementsByClassName('bodySq')).filter(el => {
            return Number(el.getAttribute('row'))===row && Number(el.getAttribute('col'))===col;
        })[0];
        console.log(sq);
        if(player.gameboard.receiveAttack(coords)){ 
            hit(sq, coords, 'Computer');
        } else {
            miss(sq, coords, 'Computer');
        }
        setTurn('pturn');
    },1000);
}

function setTurn(turnID:string){
    const turn = document.getElementById('status');
    turn.setAttribute('turn',turnID);
    if(turnID==='cturn'){turn.innerHTML = "...awaiting computer's attack";}
    else if(turnID==='pturn'){turn.innerHTML = "...awaiting player's attack"}
}

function hit(sq:Element, coord: number[], player:String){
    const log = document.getElementById('log');
    sq.classList.add('hit');
    const msg = document.createElement('div');
    msg.classList.add('logMsg');
    msg.innerHTML = `Hit! ${player} attacked [${coord}]`;
    log.appendChild(msg);
}

function miss(sq:Element, coord: number[],player:String){
    const log = document.getElementById('log');
    sq.classList.add('miss');
    const msg = document.createElement('div');
    msg.classList.add('logMsg');
    msg.innerHTML = `Miss, ${player} attacked [${coord}]`;
    log.appendChild(msg);
}