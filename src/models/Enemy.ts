import IEntity from './IEntity';

class Enemy implements IEntity {
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

    dealDamage(): number {
        return this.baseDamage;
    }

    heal(amount: number): void {
        if (this.currentHealth + amount > this.maxHealth)
            this.currentHealth = this.maxHealth;
        else
            this.currentHealth += amount;
    }
}

export default Enemy;