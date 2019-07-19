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
            const success = receiver.move(command.args[0]);
            if (success) {
                return console.log(`You have entered a new room.\n${receiver.currentRoom.getDescription()}`);
            } else {
                return console.log(`You can't go there. Please try another one.`);
            }
        case 'look':
            const text = `You are in ${receiver.currentRoom.name}.\n` +
                `${receiver.currentRoom.description}`;
            return console.log(text);
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
            console.log('Command error.');
            return console.log(command);
    }
}

export default {
    parse,
    execute,
}