import { ship } from './ship';

const sheep = ship(3);
sheep.hit();
sheep.hit();
sheep.hit();
console.log(sheep.isSunk());
