export interface Ship {
    coord: number[];
    length: number;
    hitCount: number;
    sunk: boolean;
    hit: () => number;
    isSunk: () => boolean;
}

export function CreateShip(coord: number[], length: number): Ship {
    return {
        coord,
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
        }
    }
}