function ship(length:number){
    return{
        length,
        hitCount:0,
        sunk:false,
        hit(){
            if(this.sunk===false){
                this.hitCount++;
                if(this.hitCount===this.length) this.sunk = true;
            } 
            return this.hitCount;
        },
        isSunk(){
            return this.sunk;
        }
    }
}

//testing
const sheep = ship(3);
sheep.hit();
sheep.hit();
sheep.hit();
console.log(sheep.isSunk());