import readline from 'readline';

import IEntity from './IEntity';
import BattleAction from '../battle/BattleAction';
import Room from './Room';
import Item, { ItemType } from './Item';

class Player implements IEntity {
    name: string;
    currentHealth: number;
    maxHealth: number;
    baseDamage: number;
    currentRoom: Room;
    armor: number;
    inventory: Array<Item>;
    equippedWeapon: Item | null;

    constructor(name: string, health: number, baseDamage: number, startingRoom: Room) {
        this.name = name;
        this.currentHealth = health;
        this.maxHealth = health;
        this.baseDamage = baseDamage;
        this.currentRoom = startingRoom;
        this.armor = 0;
        this.inventory = [];
        this.equippedWeapon = null;
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

    heal(amount: number): void {
        if (this.currentHealth + amount > this.maxHealth)
            this.currentHealth = this.maxHealth;
        else
            this.currentHealth += amount;
    }

    dealDamage(): number {
        if (this.equippedWeapon !== null) {
            return this.baseDamage + this.equippedWeapon.power;
        }
        return this.baseDamage;
    }

    async getInput(): Promise<string> {
        return new Promise((resolve, _) => {
            const prompt = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            prompt.question("> ", (answer) => {
                prompt.close()

                resolve(answer);
            })
        })
    }

    async getAction(): Promise<BattleAction> {
        return new Promise((resolve, _) => {
            const prompt = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            prompt.question("> ", (answer) => {
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

    takeItem(item: Item) {
        this.inventory = [...this.inventory, item];
    }

    equip(itemID: string): boolean {
        let equipped = false;
        this.inventory.map((item) => {
            if (item.id === itemID) {
                if (!item.equipable) {
                    console.log('This item isn\'t equipable, try using it instead.');
                    return false;
                }

                switch (item.type) {
                    case ItemType.Weapon:
                        console.log(`Equipped ${item.name}.`);
                        this.equippedWeapon = item;
                        equipped = true;
                        break;
                    case ItemType.Armor:
                        console.log(`Equipped ${item.name}.`);
                        this.armor = item.power;
                        equipped = true;
                        break;
                    default:
                        console.log(`Unknown item type ${item.type}.`);
                        equipped = false;
                        break;
                }
            }
        })
        if (equipped) {
            return true;
        } else {
            console.log(`Item with ID ${itemID} wasn't found.`);
            return false;
        }
    }

    use(itemID: string): boolean {
        this.inventory.map((item) => {
            if (item.id === itemID) {
                if (item.equipable) {
                    console.log('You can\'t use this item, try equipping it instead');
                    return false;
                }

                switch (item.type) {
                    case ItemType.Healing:
                        this.heal(item.power);
                        return true;
                    default:
                        console.log(`Unknown item type ${item.type}.`);
                        return false;
                }
            }
        })
        console.log(`Item with ID ${itemID} wasn't found.`);
        return false;
    }
}

export default Player;