export interface Ship {
    length: number;
    hitCount: number;
    sunk: boolean;
    hit: () => number;
    isSunk: () => boolean;

}

export function CreateShip(length: number): Ship {
    return {
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