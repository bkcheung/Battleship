import { Player } from "./player"

export interface Game{
    player: Player,
    computer: Player,
    gameDone: boolean,
    initAttackInt: () => void,
    compPlay: (player: Player) => void,
    checkStatus: (player: Player, coords: number[]) => void,
}
export function createGame(player:Player, computer:Player): Game{
    addMsg("Welcome to Battleship. Please initate attack on your opponent's waters.");
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
                        if(this.gameDone===false)this.compPlay();
                        updateScroll();
                    } 
                });
            }
        },        
        compPlay(){
            setTimeout(()=>{
                const coords = this.player.genAttack();
                const row = coords[0];
                const col = coords[1];
                const pgb = this.player.gameboard;
                const pBoard = document.getElementById(`${pgb.id}`);
                const sq = Array.from(pBoard.getElementsByClassName('bodySq')).filter(el => {
                    return Number(el.getAttribute('row'))===row && Number(el.getAttribute('col'))===col;
                })[0];
                if(this.player.gameboard.receiveAttack(coords)){ 
                    hit(sq, coords, 'Computer');
                    this.checkStatus(this.player, coords);
                } else {
                    miss(sq, coords, 'Computer');
                }
                updateScroll();
            },500);
        },
        checkStatus(player:Player, coords:number[]){
            const ships = player.gameboard.ships;
            let pid, id: string;
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
            if(pid==='Player') renderHit(id);
            if(player.gameboard.shipStatus()){
                this.gameDone = true;
                let winner:string;
                if(player.gameboard.id==='pBoard') winner = 'Computer';
                else if(player.gameboard.id==='cBoard') winner = 'Player';
                renderResults(winner)
            }
        },
    }
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
    var log = document.getElementById("battleLog");
    log.scrollTop = log.scrollHeight;
}
function addMsg(message:string){
    const log = document.getElementById('battleLog');
    const msg = document.createElement('div');
    msg.classList.add('logMsg');
    msg.innerHTML = `${message}`;
    log.appendChild(msg);
    updateScroll();
}
function renderHit(id:string){
    const fleet = document.getElementById('pfleet');
    const hitShip = fleet.querySelector(`span.${id}`);
    const shipStatSq = hitShip.querySelectorAll('div');
    for(let i=0;i<shipStatSq.length;i++){
        if(!shipStatSq[i].classList.contains('hit')){
            shipStatSq[i].classList.add('hit');
            break;
        }
    }
}
function renderResults(winner:string){
    const results = document.getElementById('results');
    results.classList.remove('hidden');
    results.setAttribute("style", "display:flex; flex-direction:column");
    const resultW = document.getElementById('resultW');
    resultW.setAttribute("style", 
    "display:flex; flex-direction:column; align-items:center; padding: 5em");
    const msg = document.getElementById('resultMsg');
    msg.innerHTML = `All ships sunk. ${winner} wins!`;
    const restart = document.getElementById('restart');
    restart.addEventListener('click', (e)=>{
        e.preventDefault();
        window.location.reload();
    })
}