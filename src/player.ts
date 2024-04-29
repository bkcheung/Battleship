import { Board } from "./gameboard"

export interface Player{
    gameboard: Board,
    moves: number[][],
    genAttack: () => number[],
    populateBoard: () => Board,
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
        }, 
        populateBoard(){
            const ships = [[5,'aircraft-carrier'],[4,'battleship'],[3,'cruiser'],[3,'submarine'],[2,'destroyer']]
            const orients = ['h','v'];
            let success = false;
            for(let i=0;i<5;i++){
                while(!success){
                    const length = Number(ships[i][0]);
                    const id = String(ships[i][1]);
                    const coords = genCoords(this.gameboard.size);
                    const orientation = orients[Math.round(Math.random())];
                    success = this.gameboard.placeShip(id,length,coords,orientation);
                }
                success = false;
            }
            return this.gameboard;
        }
    }
}
// export function populateBoard(board: Board){
//     const ships = [[5,'aircraft-carrier'],[4,'battleship'],[3,'cruiser'],[3,'submarine'],[2,'destroyer']]
//     const orients = ['h','v'];
//     let success = false;
//     for(let i=0;i<5;i++){
//         while(!success){
//             const length = Number(ships[i][0]);
//             const id = String(ships[i][1]);
//             const coords = genCoords(board.size);
//             const orientation = orients[Math.round(Math.random())];
//             success = board.placeShip(id,length,coords,orientation);
//         }
//         success = false;
//     }
//     return board;
// }

function genCoords(boardSize: number){
    const randR = Math.floor(Math.random()*boardSize);
    const randC = Math.floor(Math.random()*boardSize);
    return [randR, randC];
}