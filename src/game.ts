import { renderShips } from "./interface";
import { Player } from "./player"

export interface Game{
    player: Player,
    computer: Player,
    gameDone: boolean,
    initAttackInt: () => void,
    positionShip: (player:Player) => void,
    compPlay: (player: Player) => void,
    checkStatus: (player: Player, coords: number[]) => void,
}

export function createGame(player:Player, computer:Player): Game{
    return{
        player,
        computer,
        gameDone: true,
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
        positionShip(player:Player){
            const ships = [[5,'aircraft-carrier'],[4,'battleship'],[3,'cruiser'],
                           [3,'submarine'],[2,'destroyer']];
            let count  = 4;
            document.addEventListener('click', (event) => {
                if(count>-1){
                    const length = Number(ships[count][0]);
                    const id = String(ships[count][1]);
                    const orientation = 'h'
                    const clicked = event.target as HTMLElement;
                    const row = Number(clicked.getAttribute('row'));
                    const col = Number(clicked.getAttribute('col'));
                    const coords = [row,col];
                    if(player.gameboard.placeShip(id,length,coords,orientation)){
                        count--;
                        if(count===-1){
                            this.gameDone = false;
                            renderShips(player);
                        }
                    }
                    else console.log('Invalid');
                } 
            })
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
            let pid, id: string;
            // let id: string;
            for(let i=0; i<5;i++){
                const allC = ships[i].allCoords();
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
            renderHit(id, pid);
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

function renderHit(id:string, pid:string){
    let fleetID;
    if(pid==='Computer') fleetID = 'cfleet';
    else if(pid==='Player') fleetID = 'pfleet';
    const fleet = document.getElementById(fleetID);
    const hitShip = fleet.querySelector(`span.${id}`);
    const shipStatSq = hitShip.querySelectorAll('div');
    for(let i=0;i<shipStatSq.length;i++){
        if(!shipStatSq[i].classList.contains('hit')){
            shipStatSq[i].classList.add('hit');
            break;
        }
    }
}