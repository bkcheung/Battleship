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
            const newShip = CreateShip(coords, shipLength);
            this.ships.push(newShip);
            const x = coords[0];
            const y = coords[1];
            if(orientation==='h'){ 
                if((x+shipLength)<this.size){ 
                    for(let i=0;i<shipLength;i++){ 
                        this.board[x][y+i] = 1;
                    }
                } else return false;
            } else if(orientation==='v'){
                if((y+shipLength)<this.size){
                    for(let i=0;i<shipLength;i++){ 
                        this.board[x+i][y] = 1;
                    }
                } else return false;   
            }
            if(newShip!==undefined) return true;
            return false;
        },
        receiveAttack(coords){
            const x = coords[0];
            const y = coords[1];
            if(this.board[x][y]===1){
                this.ships.forEach((item:Ship) => {
                    if(item.coord===coords) item.hit(); 
                });
                this.board[x][y]=2; //To indicate successful hit
                return true;
            } 
            this.board[x][y]=-1; //To indicate missed hit
            return false;
        },
        shipStatus(){
            let allSunk = true;
            this.ships.forEach((item:Ship) => {
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