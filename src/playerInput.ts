import { Game } from "./game"; 
import { renderShips, drawBoard } from "./interface";

export function placeShips(game: Game){
    positionShip(game);
    document.getElementById('placeBoard').appendChild(drawBoard(10,'placeSq'));
}

function positionShip(game:Game){
    const ships = [[5,'aircraft-carrier'],[4,'battleship'],[3,'cruiser'],
                   [3,'submarine'],[2,'destroyer']];
    let count  = 4;
    updateMsg(`Please place ${ships[count][1]}`);
    document.addEventListener('click', (event) => {
        const sq = event.target as HTMLElement;
        if(sq.classList.contains('placeSq')){
            if(count>-1){
                const length = Number(ships[count][0]);
                const id = String(ships[count][1]);
                const orientation = 'h';
                const clicked = event.target as HTMLElement;
                const row = Number(clicked.getAttribute('row'));
                const col = Number(clicked.getAttribute('col'));
                const coords = [row,col];
                if(game.player.gameboard.placeShip(id,length,coords,orientation)){
                    count--;
                    if(count===-1){
                        game.gameDone = false;
                        document.getElementById("playerInput").classList.add('hidden');
                        renderShips(game.player);
                    } else{
                        updateMsg(`Please place ${ships[count][1]}`);
                    }
                }
                else updateMsg('Please select a valid position');
            } 
        }
    })
}

function updateMsg(message:string){
    const msg = document.getElementById('placementMsg');
    msg.innerHTML= message;
}
