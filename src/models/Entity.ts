import BattleAction from "../battle/BattleAction";
import Room from "./Room";
import Battle from "../battle/Battle";
import Item from './Item';

abstract class Entity {
    name: string;
    baseDamage: number;
    currentHealth: number;
    maxHealth: number;
    armor: number
    bag: Array<Item>;

    constructor(
        name: string,
        damage: number,
        health: number,
        armor: number
    ) {
        this.name = name;
        this.baseDamage = damage;
        this.currentHealth = health;
        this.maxHealth = health;
        this.armor = armor;
        this.bag = [];
    }

    takeDamage(amount: number): boolean {
        if (this.armor <= 0) {
            this.currentHealth -= amount;
        } else {
            this.currentHealth -= (amount - (this.armor / 2));
        }

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

    takeItem(item: Item): void {
        this.bag = [...this.bag, item];
    }
}

export default Entity;
