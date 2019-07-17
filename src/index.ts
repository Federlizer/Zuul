import uuid from 'uuid/v4';

import Player from './models/Player';
import Entity from './models/Entity';
import Battle from './battle/Battle';
import Room from './models/Room';
import Item, { ItemType } from './models/Item';

import commander from './commander';
import Enemy from './models/Enemy';

// TODO: use inputFunction and outputFunction for I/O
// Check it when the game get's initialized and then pass around the funtions that are to be used.
// Default should be console.log() and the read function for JS, i'm not sure what it is, but yeah.

class Game {
    player: Player;

    constructor() {
        const entrance = new Room('Entrance', 'The entrance of the building.');
        const bathroom = new Room('Bathroom', 'A simple bathroom with a sink and a toilet');
        const arena = new Room('Arena', 'An arena filled with a crowd and an enemy waiting for you at the other end.');

        const sword = new Item(uuid(), 'Sword', 10, true, ItemType.Weapon);
        const armor = new Item(uuid(), 'Armor', 10, true, ItemType.Armor);
        bathroom.addItems(sword, armor);

        entrance.addExit({
            direction: 'west',
            room: bathroom,
        })

        bathroom.addExit({
            direction: 'east',
            room: entrance,
        })
        bathroom.addExit({
            direction: 'west',
            room: arena,
        })

        arena.addExit({
            direction: 'east',
            room: bathroom,
        })

        const player = new Player('Federlizer', 100, 5, entrance);
        const enemy = new Enemy('Enemy', 100, 5, arena);

        this.player = player;
    }

    async start() {
        while (true) {
            const input = await this.player.getInput()
            if (input === 'quit') {
                return;
            }
            const command = commander.parse(input);
            if (command !== null) {
                commander.execute(command, this.player);
            } else {
                console.log("Command unknown. Type help for help.");
            }
        }
    }

    battle() {
        const field: Room = new Room("Field", "The arena the two are to fight in");
        let player: Entity = new Player("Federlizer", 50, 10, field);
        let alien: Entity = new Enemy("Alien", 20, 5, field);

        let battle: Battle = new Battle(player, alien);
        battle.startBattle()
            .then(() => console.log('The battle ended'))
            .catch((err) => console.error(err));
    }
}

const game = new Game();
game.start();