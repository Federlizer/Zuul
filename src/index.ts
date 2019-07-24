import Player from './models/Player';
import Battle from './battle/Battle';

import map from './maps/original';
import { parseAndExecute } from './commands';

// TODO: use inputFunction and outputFunction for I/O
// Check it when the game get's initialized and then pass around the funtions that are to be used.
// Default should be console.log() and the read function for JS, i'm not sure what it is, but yeah.

class Game {
    player: Player;
    EXIT_GAME_VALUES: Array<string> = ['exit', 'quit', 'q'];
    turn: number;

    constructor() {
        this.player = map.player;
        this.turn = 0;
    }

    async start() {
        console.log(map.intro);

        // Main game loop
        while (!map.isObjectiveCompleted()) {
            if (map.turnToActivateEvent === this.turn) {
                console.log(map.event());
            }
            
            const input = await this.player.getInput(`${this.turn}> `);
            
            // Exit if user wants to stop playing
            if (this.EXIT_GAME_VALUES.find((value) => input === value)) {
                return;
            }

            const executed = parseAndExecute(this.player, input);

            if (executed)
                this.turn += 1;
        }

        console.log('Congratulations, you have completed all the objectives required from you. You can go home now. :)');
    }
}

const game = new Game();
game.start();
