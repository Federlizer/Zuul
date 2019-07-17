import IEntity from './IEntity';
import BattleAction from '../battle/BattleAction';
import Room from './Room';

class Enemy implements IEntity {
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

    dealDamage(): number {
        return this.baseDamage;
    }

    heal(amount: number): void {
        if (this.currentHealth + amount > this.maxHealth)
            this.currentHealth = this.maxHealth;
        else
            this.currentHealth += amount;
    }

    async getAction(): Promise<BattleAction> {
        return new Promise((resolve, _) => {
            resolve(BattleAction.Attack);
        })
    }

    move(direction: string) {
        const newRoom: Room | undefined = this.currentRoom.getRoom(direction);
        if (newRoom) {
            this.currentRoom = newRoom
        } else {
            console.log(`An error occurred while an Enemy was trying to invoke it's move method. The new room has the following info:\n ${newRoom}`);
        }
    }
}

export default Enemy;