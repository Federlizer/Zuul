export enum ItemType {
    Weapon,
    Armor,
    Healing,
};

class Item {
    id: string;
    name: string;
    power: number;
    equipable: boolean;
    type: ItemType;

    constructor(id: string, name: string, power: number, equipable: boolean, type: ItemType) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.equipable = equipable;
        this.type = type;
    }
}

export default Item;