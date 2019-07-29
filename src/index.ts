import Player from './models/Player';
import logger from './controllers/logger';

import map from './maps/original';
import { parseAndExecute } from './commands';

class Game {
    player: Player;
    EXIT_GAME_VALUES: Array<string> = ['exit', 'quit', 'q'];
    turn: number;
    playing: boolean;

    constructor
    (
        sendOutputFunc?: (...output: Array<string>) => void
    ) {
        this.player = map.player;
        this.turn = 0;
        this.playing = false;

        if (sendOutputFunc) {
            logger.setOutput(sendOutputFunc);
        }
    }

    start() {
        this.playing = true;
        logger.write(map.intro);
    }

    takeTurn(input: string): void {
        if (!this.playing) {
            logger.write('You haven\'t started the game yet. Please do that first.');
            return;
        }

        if (map.turnToActivateEvent === this.turn) {
            logger.write(map.event());
        }

        if (this.EXIT_GAME_VALUES.find((value) => input === value)) {
            logger.write('Bye!');
            return;
        }

        const executed = parseAndExecute(this.player, input);

        if (executed)
            this.turn += 1;

        if (map.isObjectiveCompleted()) {
            this.playing = false;
            logger.write('You have won the game of Zuul. We hope you enjoyed the game.');
        }
    }
}

export default Game;
