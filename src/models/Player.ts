import readline from 'readline';

import IEntity from './IEntity';
import BattleAction from '../battle/BattleAction';
import Room from './Room';

class Player implements IEntity {
    name: string;
    currentHealth: number;
    maxHealth: number;
    baseDamage: number;
    currentRoom: Room;

    constructor(name: string, health: number, baseDamage: number, startingRoom: Room) {
        this.name = name;
        this.currentHealth = health;
        this.maxHealth = health;
        this.baseDamage = baseDamage;
        this.currentRoom = startingRoom;
    }

    takeDamage(amount: number): boolean {
        this.currentHealth -= amount;
        if (this.currentHealth <= 0)
            return true;
        return false;
    }

    heal(amount: number): void {
        if (this.currentHealth + amount > this.maxHealth)
            this.currentHealth = this.maxHealth;
        else
            this.currentHealth += amount;
    }

    dealDamage(): number {
        return this.baseDamage;
    }

    async getAction(): Promise<BattleAction> {
        return new Promise((resolve, _) => {
            const prompt = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
    
            prompt.question("What do you want to do? ", (answer) => {
                prompt.close();
    
                switch (answer) {
                    case 'attack':
                        resolve(BattleAction.Attack);
                        break;
                    case 'heal':
                        resolve(BattleAction.Heal);
                        break;
                    default:
                        resolve(BattleAction.NoAction);
                }
            });
        });
    }    
    
    move(direction: string) {
        const newRoom: Room | undefined = this.currentRoom.getRoom(direction);
        if (newRoom) {
            this.currentRoom = newRoom
            console.log(`You've moved to ${this.currentRoom.name}`)
        } else {
            console.log('You can\'t go there');
        }
    }
}

export default Player;