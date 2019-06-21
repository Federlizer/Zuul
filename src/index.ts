import Player from './models/Player';
import Enemy from './models/Enemy';
import IEntity from './models/IEntity';

let player: IEntity = new Player("Federlizer", 100, 10);
let alien: IEntity = new Enemy("Alien", 100, 5);