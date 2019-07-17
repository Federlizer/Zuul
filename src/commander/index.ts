import Command from '../models/Command';
import Player from '../models/Player';

export const parse = (text: string): (Command | null) => {
    const action = text.split(' ')[0];
    const args = text.split(' ').slice(1);

    return new Command(action, args);
}

export const execute = (command: Command, receiver: Player) => {
    switch (command.action) {
        case 'go':
            return receiver.move(command.args[0]);
        case 'look':
            return console.log(`${receiver.currentRoom.name}\n` +
                `${receiver.currentRoom.description}`);
        case 'take':
            const item = receiver.currentRoom.takeItem(command.args[0]);
            if (item)
                return receiver.takeItem(item);
            else
                return console.log(`A ${command.args[0]} couldn't be found.`);
        case 'equip':
            return receiver.inventory.map((i) => {
                if (i.name === command.args[0]) {
                    receiver.equip(i.id);
                }
            })
        case 'inventory':
            return console.log(receiver.inventory);
        case 'help':
            return console.log("You can't get help, fuck you!");
        default:
            return console.log(`Command error.\n${command}`);
    }
}

export default {
    parse,
    execute,
}