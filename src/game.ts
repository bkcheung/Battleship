import { Player } from "./player"

interface Game {
    player: Player,
    computer: Player,
    gameDone: boolean,
    initAttackInt: () => void,
    compPlay: (player: Player) => void,
    checkStatus: (player: Player, coords: number[]) => void,
}

export function createGame(player:Player, computer:Player): Game{
    return{
        player,
        computer,
        gameDone: false,
        initAttackInt(){
            const cgb = computer.gameboard;
            const cBoard = document.getElementById(`${cgb.id}`);
            const cBodySq = cBoard.getElementsByClassName('bodySq');
            //Init computer board to receive attacks
            for(let i=0;i<cBodySq.length;i++){
                const row = Number(cBodySq[i].getAttribute('row'));
                const col = Number(cBodySq[i].getAttribute('col'));
                const coords = [row,col];
                cBodySq[i].addEventListener('click',()=>{
                    if(!player.moves.includes(coords)&& this.gameDone===false){
                        player.moves.push(coords);
                        if(cgb.receiveAttack(coords)){
                            hit(cBodySq[i], coords, 'Player');
                            this.checkStatus(computer, coords);
                        }
                        else{miss(cBodySq[i], coords, 'Player')}
                        if(this.gameDone===false)this.compPlay(player);
                        updateScroll();
                    } 
                });
            }
        },
        compPlay(player:Player){
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
                if(player.gameboard.receiveAttack(coords)){ 
                    hit(sq, coords, 'Computer');
                    this.checkStatus(player, coords);
                } else {
                    miss(sq, coords, 'Computer');
                }
                updateScroll();
                setTurn('pturn');
            },250);
        },
        checkStatus(player:Player, coords:number[]){
            const ships = player.gameboard.ships;
            for(let i=0; i<5;i++){
                const allC = ships[i].allCoords();
                let pid: string;
                let id: string;
                if(player.gameboard.id==='pBoard') pid = 'Player';
                else if(player.gameboard.id==='cBoard') pid = 'Computer';
                for(let j=0; j<allC.length;j++){
                    if(allC[j][0]===coords[0]&&allC[j][1]===coords[1]){
                        id = ships[i].id;
                        if(ships[i].isSunk()) addMsg(`${pid}'s ${id} sunk`)
                        break;
                    }
                }
                if(id!==undefined) break;
            }
            //do something graphically with id
            if(player.gameboard.shipStatus()){
                this.gameDone = true;
                let winner:string;
                if(player.gameboard.id==='pBoard') winner = 'Computer';
                else if(player.gameboard.id==='cBoard') winner = 'Player';
                addMsg(`All ships sunk. ${winner} wins!`);
            }
        },
    }
}

function setTurn(turnID:string){
    const turn = document.getElementById('status');
    turn.setAttribute('turn',turnID);
    if(turnID==='cturn'){turn.innerHTML = "...awaiting computer's attack";}
    else if(turnID==='pturn'){turn.innerHTML = "...awaiting player's attack"}
}

function hit(sq:Element, coord: number[], player:String){
    sq.classList.add('hit');
    addMsg(`Hit! ${player} attacked [${coord}]`);
}

function miss(sq:Element, coord: number[],player:String){
    sq.classList.add('miss');
    addMsg(`Miss, ${player} attacked [${coord}]`);
}

function updateScroll(){
    var log = document.getElementById("log");
    log.scrollTop = log.scrollHeight;
}

function addMsg(message:string){
    const log = document.getElementById('log');
    const msg = document.createElement('div');
    msg.classList.add('logMsg');
    msg.innerHTML = `${message}`;
    log.appendChild(msg);
}

