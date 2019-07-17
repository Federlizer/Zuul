import uuid from 'uuid/v4';

import Player from './models/Player';
import Enemy from './models/Enemy';
import IEntity from './models/IEntity';
import Battle from './battle/Battle';
import Room from './models/Room';
import Item, { ItemType } from './models/Item';

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

    items() {
        const arena: Room = new Room('Arena', 'A battle arena');
        const sword: Item = new Item(uuid(), 'Sword', 10, true, ItemType.Weapon);
        const armor: Item = new Item(uuid(), 'Armor', 10, true, ItemType.Armor);

        const player = new Player('Federlizer', 100, 10, arena);
        player.takeItem(sword);
        player.takeItem(armor);

        player.equip(sword.id);
        player.equip(armor.id);

        console.log(player.inventory);
        console.log(`${player.name} dealt ${player.dealDamage()} damage`);

        player.takeDamage(20);

        console.log(`${player.name} has ${player.currentHealth} HP.`)

    }

    room_items() {
        const arena: Room = new Room('Arena', 'A battle arena');
        const sword: Item = new Item(uuid(), 'Sword', 10, true, ItemType.Weapon);
        const armor: Item = new Item(uuid(), 'Armor', 10, true, ItemType.Armor);

        arena.addItems(sword, armor);

        console.log(arena.items);
        let item = arena.takeItem(uuid());

        console.log(item);
        console.log(arena.items);
    }
}

const game = new Game();
game.room_items();