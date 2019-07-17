import Item from './Item';

interface RoomExits {
    north: Room | undefined
    west: Room | undefined
    south: Room | undefined
    east: Room | undefined
    [direction: string]: Room | undefined
}

interface RoomExit {
    direction: 'north' | 'west' | 'south' | 'east'
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
        }
    }

    addItems(...items: Array<Item>) {
        this.items = [...this.items, ...items];
    }

    addExit(exit: RoomExit) {
        this.exits[exit.direction] = exit.room
    }

    getRoom(direction: string) {
        return this.exits[direction]
    }
}

export default Room;