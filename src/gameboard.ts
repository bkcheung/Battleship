import { Ship, CreateShip } from './ship'

export interface Board {
    size: number;
    board: number[][];
    ships: Ship[];
    placeShip: (shipLength:number, coords:Array<number>, orientation:string) => boolean;
    receiveAttack: (coords:number[]) => boolean;
    shipStatus: () => boolean;
}

export function GameBoard(size:number): Board{
    return{
        size,
        board: generateBoard(size, 0),
        ships: [],
        placeShip(shipLength, coords, orientation){
            const r = coords[0];
            const c = coords[1];
            if(checkPlacement(this.board, coords, shipLength, orientation, this.size)){
                //ship placement is valid!
                if(orientation==='h'){ 
                    if((c+shipLength)<this.size){ 
                        const newShip = CreateShip(coords, orientation, shipLength);
                        this.ships.push(newShip);
                        for(let i=0;i<shipLength;i++){ 
                            this.board[r][c+i] = 1;
                        }
                    } else return false;
                } else if(orientation==='v'){
                    if((r+shipLength)<this.size){
                        const newShip = CreateShip(coords, orientation, shipLength);
                        this.ships.push(newShip);
                        for(let i=0;i<shipLength;i++){ 
                            this.board[r+i][c] = 1;
                        }
                    } else return false;   
                } return true;
            } return false;
        },
        receiveAttack(coords){
            const r = coords[0];
            const c = coords[1];
            if(this.board[r][c]===1){
                this.ships.forEach((ship:Ship) => {
                    const allCoords = ship.allCoords();
                    allCoords.forEach((coord:number[])=>{
                        if(coord[0]===r && coord[1]===c) ship.hit();
                    });
                });
                this.board[r][c]=2; //To indicate successful hit
                return true;
            } 
            this.board[r][c]=-1; //To indicate missed hit
            return false;
        },
        shipStatus(){
            let allSunk = true;
            this.ships.forEach((item:Ship) => {
                item.isSunk();
                if(item.sunk===false) allSunk = false;
            });
            return allSunk;
        }
    }
}

function generateBoard(size:number, val:number): number[][]{
    const arr = Array.from({ length: size }).map(() =>
                    Array.from({ length: size }).fill(val)
                ) as number[][];
    return arr;
}

function checkPlacement(board: number[][], coord: number[], length: number, orient: string, size: number){
    const r = coord[0];
    const c = coord[1];
    let valid = true;

    if(orient==='h' && (c+length)<size){
        for(let i=0;i<length;i++){
            if(board[r][c+i]===1) valid = false;
        }
    } else if(orient==='v' && (r+length)<size) {
        for(let i=0;i<length;i++){
            if(board[r+i][c]===1) valid = false;
        }
    }
    return valid;
}