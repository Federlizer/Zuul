import readline from 'readline';

import IEntity from './IEntity';
import BattleAction from './BattleAction';

class Player implements IEntity {
    name: string;
    currentHealth: number;
    maxHealth: number;
    baseDamage: number;

    constructor(name: string, health: number, baseDamage: number) {
        this.name = name;
        this.currentHealth = health;
        this.maxHealth = health;
        this.baseDamage = baseDamage;
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
}

export default Player;