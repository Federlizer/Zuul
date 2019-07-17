import BattleAction from "../battle/BattleAction";
import Room from "./Room";

abstract class Entity {
    name: string;
    baseDamage: number;
    currentRoom: Room;
    currentHealth: number;
    maxHealth: number;
    armor: number

    constructor(
        name: string,
        damage: number,
        startingRoom: Room,
        health: number,
        armor: number
    ) {
        this.name = name;
        this.baseDamage = damage;
        this.currentRoom = startingRoom;
        this.currentHealth = health;
        this.maxHealth = health;
        this.armor = armor;
    }

    abstract async getAction(): Promise<BattleAction>;
    abstract async getInput(): Promise<string>;

    move(direction: string): boolean {
        const newRoom: Room | undefined = this.currentRoom.getRoom(direction);

        if (newRoom) {
            this.currentRoom = newRoom
            return true;
        }
        return false;
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
}

export default Entity;