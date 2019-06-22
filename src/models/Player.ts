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

    someWeirdFunction(): number {
        return 99;
    }

    getAction(): BattleAction {
        return BattleAction.Attack;
    }
}

export default Player;