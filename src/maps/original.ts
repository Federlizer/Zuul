import Player from "../models/Player";
import Room from "../models/Room";
import Item, { ItemType } from "../models/Item";
import uuid from 'uuid/v4';
import Enemy from "../models/Enemy";
import locator from '../controllers/locator';

// Rooms
const entrance = new Room(
    'Entrance',
    'The entrance of the spaceship.'
);
const escapePod = new Room(
    'Escape Pod',
    'Your goal is right in front of you. You see a shining, golden escape pod!'
);
const storageRoom = new Room(
    'Storage Room',
    'The storage room is a simple storage room. You can see a bunch of crates full of food and supplies.'
);
const airlock = new Room(
    'Airlock',
    'You are in the airlock. Nothing too interesting to see here'
);
const lab = new Room(
    'Lab',
    'This is the laboratory on the ship. You can see a ' + 
        'few medical stations around accompanied by a lot of chemical flasks.'
);
const livingQuarters = new Room(
    'Living Quarters',
    'It is a simple room, filled with entertainment systems.'
);
const controlCenter = new Room(
    'Control Center',
    'You are in the control center. There are a bunch of computers around'
);
const lifeSupportCenter = new Room(
    'Life Support Center',
    'A simple life support room. A bunch of oxygen tanks, all running smoothly. For now...'
);
const medbay = new Room(
    'Medbay',
    'This is the medical bay. You can see so many medical components.'
);

// Room structure
entrance.addExit({ direction: 'south', room: lifeSupportCenter });
entrance.addExit({ direction: 'north', room: controlCenter });

lifeSupportCenter.addExit({ direction: 'north', room: entrance });
lifeSupportCenter.addExit({ direction: 'northwest', room: medbay });
lifeSupportCenter.addExit({ direction: 'west', room: airlock });

airlock.addExit({ direction: 'east', room: lifeSupportCenter });
airlock.addExit({ direction: 'north', room: medbay });
airlock.addExit({ direction: 'west', room: lab });

lab.addExit({ direction: 'north', room: escapePod });
lab.addExit({ direction: 'northeast', room: medbay });
lab.addExit({ direction: 'east', room: airlock });

escapePod.addExit({ direction: 'south', room: lab });

storageRoom.addExit({ direction: 'southeast', room: medbay });
storageRoom.addExit({ direction: 'east', room: livingQuarters });

livingQuarters.addExit({ direction: 'west', room: storageRoom });
livingQuarters.addExit({ direction: 'south', room: medbay });
livingQuarters.addExit({ direction: 'east', room: controlCenter });

controlCenter.addExit({ direction: 'south', room: entrance });
controlCenter.addExit({ direction: 'southwest', room: medbay });
controlCenter.addExit({ direction: 'west', room: livingQuarters });

medbay.addExit({ direction: 'northwest', room: storageRoom });
medbay.addExit({ direction: 'southwest', room: lab });
medbay.addExit({ direction: 'north', room: livingQuarters });
medbay.addExit({ direction: 'south', room: airlock });
medbay.addExit({ direction: 'northeast', room: controlCenter });
medbay.addExit({ direction: 'southeast', room: lifeSupportCenter });

// Items
const bandage = new Item(uuid(), 'Bandage', 25, false, ItemType.Healing);
const medkit = new Item(uuid(), 'Medkit', 60, false, ItemType.Healing);
const rifle = new Item(uuid(), 'Rifle', 12, true, ItemType.Weapon);
const laserGun = new Item(uuid(), 'Laser Gun', 28, true, ItemType.Weapon);
const nanoArmor = new Item(uuid(), 'Nano-armor', 20, true, ItemType.Armor);

// Add items to rooms
storageRoom.addItems(rifle);
medbay.addItems(medkit);
lifeSupportCenter.addItems(bandage);
lab.addItems(laserGun, nanoArmor);

// Entities
const player = new Player('Federlizer', 100, 10);
locator.follow(player, entrance);

let alienBoss: Enemy;
let alien1: Enemy;
let alien2: Enemy;

// Break-in event
function event(): string {
  alienBoss = new Enemy('Alien Boss', 150, 15);

  alien1 = new Enemy('Alien 1', 50, 5);
  alien2 = new Enemy('Alien 2', 50, 5);

  locator.follow(alienBoss, escapePod);
  locator.follow(alien1, medbay);
  locator.follow(alien2, lab);
  return `Three aliens just broke into the ship! Hurry!`;
}

// Function to check if the objectives are completed for the map
function isObjectiveCompleted(): boolean {
  if (!alienBoss) {
    return false;
  }

    const currentRoom = locator.find(player.name);
    if (!currentRoom) {
        throw new Error('Player not being followed by locator')
    }

  if ((alienBoss.currentHealth > 0) || (currentRoom.name !== escapePod.name)) {
    return false;
  } else {
    return true;
  }
}

// Intro to the map
const intro = 'Welcome to Zuul. This is a text based game ' +
  'where you must escape a space ship full of aliens that are looking for you, ' +
  'because you stole something from them. Something very important. GET TO WORK!!!\n' +
  'You find yourself in the entrance of the ship. ' +
  'The pressure has just been stabalized so you can move on to any other room.'

export default {
  turnToActivateEvent: 4,
  intro,
  player,
  startingRoom: entrance,
  event,
  isObjectiveCompleted,
}
