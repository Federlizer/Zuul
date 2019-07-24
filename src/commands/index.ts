import Item from '../models/Item';
import Room from '../models/Room';
import Entity from '../models/Entity';
import locator from '../controllers/locator';

const HELP_GAP = 2;

interface Command {
    name: string
    help: string
    usage: string
    execute: (...any: any) => any
}


const _examineItem = (item: Item): string => {
    return `${item.name}\nPower: ${item.power}\nType: ${item.type}`
}

const _examineRoom = (entity: Entity): string => {
    const currentRoom = locator.find(entity.name);
    return currentRoom.getDescription();
}

export const go: Command = {
    name: 'go',
    help: 'Try to go through an exit of the current room.',
    usage: 'go DIRECTION',
    execute: (entity: Entity, direction: string) => {
        locator.move(entity.name, direction);
    }
}

export const examine: Command = {
    name: 'examine',
    help: 'Examine an item that you carry. If no item name is provided, the current room will be examined instead.',
    usage: 'examine [ITEM_NAME]',
    execute: (entity: Entity, itemName?: string): string => {
        if (!itemName) {
            return _examineRoom(entity);
        } else {
            let item: Item;

            item = entity.bag.filter((i) => i.name === itemName)[0];
            if (!item) {
                const currentRoom = locator.find(entity.name);
                currentRoom.items.filter((i) => i.name === itemName)[0];

                if (!item) {
                    return `Item not found: ${itemName}`;
                }
            }

            return _examineItem(item);
        }
    }
}

export const take: Command = {
    name: 'take',
    help: 'Take an item from the room you are in.',
    usage: 'take ITEM_NAME',
    execute: (entity: Entity, itemName: string) => {
        const currentRoom = locator.find(entity.name);
        const roomItems = currentRoom.items.filter((item) => {
            return item.name === itemName;
        })
        entity.takeItem(roomItems[0]);
    }
}

export const help: Command = {
    name: 'help',
    help: 'Display the help message.',
    usage: 'help [COMMAND]',
    execute: (command?: string): string => {
        const longestCommand = commands.reduce((longest, command) => {
            if (command.name.length > longest.name.length) {
                return command;
            } else {
                return longest;
            }
        }).name;

        let rv = '';

        commands.map((command) => {
            if (command.name.length < longestCommand.length) {
                rv += command.name + ' '.repeat(longestCommand.length - command.name.length + HELP_GAP);
            } else {
                rv += command.name + ' '.repeat(HELP_GAP);
            }
            rv += command.help;
            rv += '\n';
        })

        return rv;
    }
}

const commands: Array<Command> = [
    go,
    examine,
    take,
    help,
]

// equip ITEM
// inventory
// help [COMMAND]

export const parseAndExecute = (callingEntity: Entity, text: string): boolean => {
    const command = text.split(' ')[0];
    const args = text.split(' ').slice(1);

    switch (command) {
        case 'go':
            go.execute(callingEntity, args[0]);
            break;
        case 'examine':
            if (args.length === 0) {
                console.log(examine.execute(callingEntity));
            } else {
                throw new Error('Not implemented');
                //TODO: find the item and pass it instead of undefined.
                console.log(examine.execute(callingEntity, undefined));
            }
            break;
        case 'take':
            take.execute(callingEntity, args[0]);
            break;
        case 'help':
            console.log(help.execute());
            break;
        default:
            console.log(`Unknown command: ${command}`)
            return false;
    }
    return true;
}