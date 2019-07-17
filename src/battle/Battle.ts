import IEntity from '../models/IEntity';
import BattleAction from './BattleAction';

class Battle {
    entityOne: IEntity;
    entityTwo: IEntity;

    constructor(entityOne: IEntity, entityTwo: IEntity) {
        this.entityOne = entityOne;
        this.entityTwo = entityTwo;
    }

    /**
     * Executes an attacking action from attacker to receiver.
     * The method will return true if the receiver dies after the attack and false otherwise.
     * @param attacker The attacking entity
     * @param receiver The entity that's getting attacked
     */
    executeAttackAction(attacker: IEntity, receiver: IEntity): boolean {
        const dmg = attacker.dealDamage();
        return receiver.takeDamage(dmg);
    }

    /**
     * Executes a healing action on an entity.
     * @param entity The entity that's to be healed
     */
    executeHealAction(entity: IEntity): void {
        const healing = 10;
        entity.heal(healing);
    }

    battleInfo() {
        return(
            `${this.entityOne.name} has ${this.entityOne.currentHealth} HP\n` +
            `${this.entityTwo.name} has ${this.entityTwo.currentHealth} HP`
        );
    }

    async startBattle() {
        let battling = true;
        let entityOneTurn = true;
        let playingEntity = this.entityOne;
        let waitingEntity = this.entityTwo;
        
        while(battling) {
            // Print battle info
            console.log(this.battleInfo());
            
            // Get entity action
            console.log(`${playingEntity.name}'s turn.`)

            const action = await playingEntity.getAction();
            let entityPlayed = false;

            // Resolve entity action
            switch (action) {
                case BattleAction.Attack:
                    console.log(`${playingEntity.name} will attack ${waitingEntity.name}`);
                    const killed = this.executeAttackAction(playingEntity, waitingEntity);
                    entityPlayed = true;
                    if (killed) {
                        console.log(`${waitingEntity.name} has died.`);
                        console.log(`${playingEntity.name} has won the battle!`);
                        battling = false;
                    }
                    break;

                case BattleAction.Heal:
                    this.executeHealAction(playingEntity);
                    entityPlayed = true;
                    break;

                default:
                    console.log('Not a valid action, please try again...');
            }

            // Swap playing entity
            if (entityPlayed)
                if (entityOneTurn) {
                    playingEntity = this.entityTwo;
                    waitingEntity = this.entityOne;
                    entityOneTurn = false;
                } else {
                    playingEntity = this.entityOne;
                    waitingEntity = this.entityTwo;
                    entityOneTurn = true;
                }
        }
    }
}

export default Battle;