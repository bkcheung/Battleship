import { Ship } from './ship'

export function GameBoard(size:number){
    return{
        size,
        board: generateBoard(size, 0),
        placeShip(shipLength:number, coordinates:Array<number>, orientation:string){
            const newShip = Ship(shipLength);
            const x = coordinates[0];
            const y = coordinates[1];
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
        }
    }
}

function generateBoard(size:number, val:any){
    return Array.from({ length: size }).map(() =>
        Array.from({ length: size }).fill(val)
    );
}