import Entity from '../models/Entity';
import Room from '../models/Room';

import logger from './logger';

interface EntitiesList {
    [entity: Entity]: Room | undefined
}

let entitiesList: EntitiesList = {}

const follow = (entity: Entity, initialRoom: Room) => {
    entitiesList = Object.assign({}, entitiesList, {
        [entity.name]: initialRoom,
    })
}

const move = (entity: Entity, direction: string): boolean => {
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
    let enemies = [];

    for (let entityID in entitiesList) {
        const entityRoom = entitiesList[entityID];
        if (
            entityRoom !== undefined &&
            entityRoom.name === nextRoom.name
        ) {
            
        }
    }


    return true;
}

const find = (entityID: string): Room => {
    const currentRoom = entitiesList[entityID];
    if (!currentRoom)
        throw new Error('Entity with that ID isn\'t being followed by the locator');

    return currentRoom;
}

export default {
    follow,
    move,
    find,
}
