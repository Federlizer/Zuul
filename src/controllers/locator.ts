import Entity from '../models/Entity';
import Room from '../models/Room';

import logger from './logger';

interface EntitiesList {
    [entityID: string]: Room | undefined
}

let allEntities: Array<Entity> = [];
let entitiesList: EntitiesList = {};

const follow = (entity: Entity, initialRoom: Room) => {
    allEntities = [...allEntities, entity];

    entitiesList = Object.assign({}, entitiesList, {
        [entity.name]: initialRoom,
    })
}

const move = (entityID: string, direction: string): boolean => {
    const currentRoom = entitiesList[entityID];

    // If no room is found, that means that the ID doens't exist in the entitiesList
    if (!currentRoom) {
        throw new Error('Entity with that ID isn\'t being followed by the locator');
    }

    const nextRoom = currentRoom.getRoom(direction);
    if (!nextRoom) {
        return false;
    }

    entitiesList[entityID] = nextRoom;

    let enemies: Array<Entity> = [];

    allEntities.map((entity) => {
        const room = entitiesList[entity.name];

        if (!room)
            return;

        if (room.name === nextRoom.name)
            enemies = [...enemies, entity];
    })

    return true;
}

const findRoom = (entityID: string): Room => {
    const currentRoom = entitiesList[entityID];
    if (!currentRoom)
        throw new Error('Entity with that ID isn\'t being followed by the locator');

    return currentRoom;
}

const findEntity = (entityID: string): Entity => {
    const entity = allEntities.find((entity) => {
        return entity.name === entityID;
    })

    if (!entity)
        throw new Error('Entity with such ID is not being followed by the locator');

    return entity;
}

export default {
    follow,
    move,
    findRoom,
    findEntity,
}
