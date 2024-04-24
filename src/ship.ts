import { start } from "repl";

export interface Ship {
    id: string;
    startCoord: number[];
    orientation: string;
    length: number;
    hitCount: number;
    sunk: boolean;
    hit: () => number;
    isSunk: () => boolean;
    allCoords: () => number[][];
}

export function CreateShip(id:string, startCoord: number[], orientation:string, length: number): Ship {
    return {
        id,
        startCoord,
        orientation,
        length,
        hitCount: 0,
        sunk: false,
        hit() {
            if (this.sunk === false) this.hitCount++;
            return this.hitCount;
        },
        isSunk() {
            if (this.hitCount === this.length) this.sunk = true;
            return this.sunk;
        },
        allCoords(){
            const r = startCoord[0];
            const c = startCoord[1];
            let allC: number[][] =[];
            if(this.orientation==='h'){
                for(let i=0;i<length;i++){
                    allC[i] = [r,c+i];
                }
            } else if (this.orientation==='v'){
                for(let i=0;i<length;i++){
                    allC[i] = [r+i,c];
                }
            }
            return allC;
        }
    }
}