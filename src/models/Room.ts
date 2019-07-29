import Item from './Item';
import Entity from './Entity';

interface RoomExits {
    north: Room | undefined
    west: Room | undefined
    south: Room | undefined
    east: Room | undefined

    northwest: Room | undefined
    northeast: Room | undefined
    southwest: Room | undefined
    southeast: Room | undefined

    [direction: string]: Room | undefined
}

export interface RoomExit {
    direction: 'north' | 'west' | 'south' | 'east' | 'northwest' | 'northeast' | 'southwest' | 'southeast'
    room: Room
}

class Room {
    name: string
    description: string
    items: Array<Item>
    exits: RoomExits

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.items = [];
        this.exits = {
            north: undefined,
            west: undefined,
            south: undefined,
            east: undefined,
            northwest: undefined,
            northeast: undefined,
            southwest: undefined,
            southeast: undefined,
        }
    }

    getDescription(): string {
        return `${this.name}: ${this.description}`;
    }

    addItems(...items: Array<Item>) {
        this.items = [...this.items, ...items];
    }

    takeItem(itemName: string): (Item | null) {
        let rv: Item | null = null;

        this.items = this.items.filter((item) => {
            if (item.name === itemName) {
                rv = item;
                return false;
            } else {
                return true;
            }
        })

        return rv;
    }

    addExit(exit: RoomExit) {
        this.exits[exit.direction] = exit.room
    }

    /**
     * getRoom returns a Room which corresponds to the given direction.
     * @param direction The direction ('north', 'south', 'east', 'west')
     */
    getRoom(direction: string) {
        return this.exits[direction]
    }
}

export default Room;
