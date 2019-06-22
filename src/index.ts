import Player from './models/Player';
import Enemy from './models/Enemy';
import IEntity from './models/IEntity';
import Battle from './models/Battle';

let player: IEntity = new Player("Federlizer", 100, 10);
let alien: IEntity = new Enemy("Alien", 100, 5);

let battle: Battle = new Battle(player, alien);
battle.startBattle();

// TODO: use inputFunction and outputFunction for stdio
// Check it when the game get's initialized and then pass around the funtions that are to be used.
// Default should be console.log() and the read function for JS, i'm not sure what it is, but yeah.