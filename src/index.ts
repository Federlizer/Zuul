import Player from './models/Player';
import Battle from './battle/Battle';

import commander from './commander';

import map from './maps/original';

// TODO: use inputFunction and outputFunction for I/O
// Check it when the game get's initialized and then pass around the funtions that are to be used.
// Default should be console.log() and the read function for JS, i'm not sure what it is, but yeah.

class Game {
    player: Player;
    EXIT_GAME_VALUES: Array<string> = ['exit', 'quit', 'q'];
    turnsTaken: number;

    constructor() {
        this.player = map.player;
        this.turnsTaken = 0;
    }

    async start() {
        // Introduce the map
        console.log(map.intro);

        // Main game loop
        while (!map.isObjectiveCompleted()) {
            if (map.turnToActivateEvent === this.turnsTaken) {
                console.log(map.event());
            }
            
            const input = await this.player.getInput(`${this.turnsTaken}> `);
            
            // Exit if user want's to stop playing
            if (this.EXIT_GAME_VALUES.find((value) => input === value)) {
                return;
            }
            
            const command = commander.parse(input);
            
            if (command !== null) {
                commander.execute(command, this.player);

                if (command.action === 'go') {
                    const other = this.player.currentRoom.hasOtherEntity(this.player);
                    if (other) {
                        const battle = new Battle(this.player, other);
                        await battle.startBattle();
                    }
                }
            } else {
                console.log("Command unknown. Type help for help.");
            }

            this.turnsTaken += 1;
        }
        console.log('Congratulations, you have completed all the objectives required from you. You can go home now. :)');
    }
}

const game = new Game();
game.start();