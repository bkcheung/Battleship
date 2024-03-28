export function ship(length:number){
    return{
        length,
        hitCount:0,
        sunk:false,
        hit(){
            if(this.sunk===false) this.hitCount++;
            return this.hitCount;
        },
        isSunk(){
            if(this.hitCount===this.length) this.sunk = true;
            return this.sunk;
        }
    }
}