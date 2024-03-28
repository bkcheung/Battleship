import { Ship } from './ship';

const sheep = Ship(3);
sheep.hit();
sheep.hit();
sheep.hit();
console.log(sheep.isSunk());
