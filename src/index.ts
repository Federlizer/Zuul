import Player from './models/Player';
import logger from './controllers/logger';

import map from './maps/original';
import commands from './commands';

class Game {
    player: Player;
    EXIT_GAME_VALUES: Array<string> = ['exit', 'quit', 'q'];
    turn: number;
    playing: boolean;

    constructor(outFunc?: (...output: Array<string>) => void) {
        //TODO: Inject this in the constructor instead.
        this.player = map.player;
        this.turn = 0;
        this.playing = false;

        if (outFunc) {
            logger.setOutput(outFunc);
        }
    }

    start() {
        this.playing = true;
        logger.write(map.intro);
    }

    takeTurn(input: string): void {
        if (!this.playing) {
            throw new Error('Game is not started yet.');
            return;
        }

        if (map.turnToActivateEvent === this.turn) {
            logger.write(map.event());
        }

        if (this.EXIT_GAME_VALUES.find((value) => input === value)) {
            logger.write('Bye!');
            return;
        }

        const executed = commands.parseAndExecute(this.player, input);

        if (executed)
            this.turn += 1;

        if (map.isObjectiveCompleted()) {
            this.playing = false;
            logger.write('You have won the game of Zuul. We hope you enjoyed it.');
        }
    }
}

export default Game;
