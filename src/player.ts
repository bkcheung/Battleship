import { Board } from "./gameboard"

interface Player{
    name: string,
    gameboard: Board,
}

interface Computer{
    name: string,
    gameboard: Board,
    moves: number[][],
    genAttack: () => number[],
    
}

export function createPlayer(name: string, gameboard: Board): Player{
    return {
        name,
        gameboard
    }
}

export function createComputer(name:string, gameboard:Board): Computer{
    return{
        name,
        gameboard,
        moves:[], 
        genAttack(){
            let coords = genCoords(gameboard.size);
            while(this.moves.includes(coords)){
                coords = genCoords(gameboard.size);
            };
            this.moves.push(coords);
            return coords;
        }
    }
}

function genCoords(boardSize: number){
    const randR = Math.floor(Math.random()*boardSize);
    const randC = Math.floor(Math.random()*boardSize);
    return [randR, randC];
}