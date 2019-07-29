import Entity from './Entity';
import BattleAction from '../battle/BattleAction';
import Room from './Room';
import Item, { ItemType } from './Item';
import logger from '../controllers/logger';

class Player extends Entity {
    equippedWeapon: Item | null;

    constructor(name: string, health: number, baseDamage: number) {
        super(name, baseDamage, health, 0);

        this.equippedWeapon = null;
    }

    dealDamage(): number {
        const base = super.dealDamage();

        if (this.equippedWeapon !== null)
            return base + this.equippedWeapon.power;
        return base;
    }

    equip(itemID: string): boolean {
        let equipped = false;
        super.bag.map((item) => {
            if (item.id === itemID) {
                if (!item.equipable) {
                    logger.write('This item isn\'t equipable, try using it intead.')
                    return false;
                }

                switch (item.type) {
                    case ItemType.Weapon:
                        logger.write(`Equipped ${item.name}.`);
                        this.equippedWeapon = item;
                        equipped = true;
                        break;
                    case ItemType.Armor:
                        logger.write(`Equipped ${item.name}.`);
                        this.armor = item.power;
                        equipped = true;
                        break;
                    default:
                        logger.write(`Unknown item type ${item.type}.`);
                        equipped = false;
                        break;
                }
            }
        })
        if (equipped) {
            return true;
        } else {
            logger.write(`Item with ID ${itemID} wasn't found.`);
            return false;
        }
    }

    use(itemID: string): boolean {
        super.bag.map((item) => {
            if (item.id === itemID) {
                if (item.equipable) {
                    logger.write('You can\'t use this item, try equipping it instead');
                    return false;
                }

                switch (item.type) {
                    case ItemType.Healing:
                        this.heal(item.power);
                        return true;
                    default:
                        logger.write(`Unknown item type ${item.type}.`);
                        return false;
                }
            }
        })
        logger.write(`Item with ID ${itemID} wasn't found.`);
        return false;
    }
}

export default Player;
