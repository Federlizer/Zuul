// Entity is an interface that describes an entity in the game.
// An entity would for example be the player or some of the enemies
// they have to kill to get through the game.
interface IEntity {
    name: string;
    currentHealth: number;
    maxHealth: number;
    baseDamage: number;

    takeDamage(amount: number): boolean;
    heal(amount: number): void;
    dealDamage(): number;
}

export default IEntity;