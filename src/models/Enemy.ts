import Entity from "./Entity";
import Room from './Room';
import BattleAction from '../battle/BattleAction';

class Enemy extends Entity {

  constructor(
    name: string,
    health: number,
    baseDamage: number,
    startingRoom: Room,
  ) {
    super(name, baseDamage, startingRoom, health, 0);
  }

  async getAction(): Promise<BattleAction> {
    return new Promise((resolve, _) => {
      resolve(BattleAction.Attack);
    })
  }

  async getInput(): Promise<string> {
    return new Promise((resolve, _) => {
      resolve('');
    })
  }
}

export default Enemy;