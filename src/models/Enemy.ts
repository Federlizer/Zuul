import Entity from "./Entity";
import Room from './Room';
import BattleAction from '../battle/BattleAction';

class Enemy extends Entity {

  constructor(
    name: string,
    health: number,
    baseDamage: number,
  ) {
    super(name, baseDamage, health, 0);
  }
}

export default Enemy;
