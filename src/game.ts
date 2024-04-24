import { Player } from "./player"

export function initAttackInt(player:Player, computer: Player){
    const cgb = computer.gameboard;
    const cBoard = document.getElementById(`${cgb.id}`);
    const cBodySq = cBoard.getElementsByClassName('bodySq');
    //Init computer board to receive attacks
    for(let i=0;i<cBodySq.length;i++){
        const row = Number(cBodySq[i].getAttribute('row'));
        const col = Number(cBodySq[i].getAttribute('col'));
        const coord = [row,col];
        cBodySq[i].addEventListener('click',()=>{
            if(!player.moves.includes(coord)){
                player.moves.push(coord);
                if(cgb.receiveAttack(coord)){hit(cBodySq[i], coord, 'Player');}
                else {miss(cBodySq[i], coord, 'Player')}
                compPlay(player);
            } 
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
    updateScroll();
}

function miss(sq:Element, coord: number[],player:String){
    const log = document.getElementById('log');
    sq.classList.add('miss');
    const msg = document.createElement('div');
    msg.classList.add('logMsg');
    msg.innerHTML = `Miss, ${player} attacked [${coord}]`;
    log.appendChild(msg);
    updateScroll();
}

function updateScroll(){
    var log = document.getElementById("log");
    log.scrollTop = log.scrollHeight;
}