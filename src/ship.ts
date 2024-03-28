function ship(length:number){
    return{
        length,
        hitCount:0,
        sunk:false,
        hit(){
            return this.hitCount++;
        },
    }
}

const sheep = ship(3);
sheep.hit();
sheep.hit();
console.log(sheep.hitCount);