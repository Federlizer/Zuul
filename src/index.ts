import Player from './models/Player';
import Enemy from './models/Enemy';
import IEntity from './models/IEntity';
import Battle from './battle/Battle';
import Room from './models/Room';
import Item from './models/Item';

// TODO: use inputFunction and outputFunction for I/O
// Check it when the game get's initialized and then pass around the funtions that are to be used.
// Default should be console.log() and the read function for JS, i'm not sure what it is, but yeah.

class Game {
    battle() {
        const field: Room = new Room("Field", "The arena the two are to fight in");
        let player: IEntity = new Player("Federlizer", 50, 10, field);
        let alien: IEntity = new Enemy("Alien", 20, 5, field);

        let battle: Battle = new Battle(player, alien);
        battle.startBattle()
            .then(() => console.log('The battle ended'))
            .catch((err) => console.error(err));
    }

    rooms() {
        const entrance: Room = new Room("Entrance", "It's the entrance to the room");
        const medbay: Room = new Room("MedBay", "The medical bay where people are healed... duh...");

        entrance.addExit({
            direction: 'north',
            room: medbay,
        })

        medbay.addExit({
            direction: 'south',
            room: entrance,
        })
        
        const player: IEntity = new Player("Federlizer", 10, 1, entrance);
        player.move('north');
        player.move('south');
    }
}

const game = new Game();
game.rooms();