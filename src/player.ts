import { Board } from "./gameboard"

export interface Player{
    gameboard: Board,
    moves: number[][],
    genAttack: () => number[],
}

export function createPlayer(size:number, gameboard: Board): Player{
    return {
        gameboard,
        moves:[], 
        genAttack(){
            let coords = genCoords(size);
            while(this.moves.includes(coords)){
                coords = genCoords(size);
            };
            this.moves.push(coords);
            return coords;
        }
    }
}

export function populateBoard(board: Board){
    // const slengths = [5,4,3,3,2];
    const ships = [[5,'ac'],[4,'bs'],[3,'cr'],[3,'sb'],[2,'ds']]
    const orients = ['h','v'];
    let success = false;
    for(let i=0;i<5;i++){
        while(!success){
            const length = Number(ships[i][0]);
            const id = String(ships[i][1]);
            const coords = genCoords(board.size);
            const orientation = orients[Math.round(Math.random())];
            success = board.placeShip(id,length,coords,orientation);
        }
        success = false;
    }
    return board;
}

function genCoords(boardSize: number){
    const randR = Math.floor(Math.random()*boardSize);
    const randC = Math.floor(Math.random()*boardSize);
    return [randR, randC];
}