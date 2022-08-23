import { Dsync, log } from ".."
import { teammates } from "../hooks/clanHandler";
import { EAnimals, EItems, EItemTypes, ELayer, EWeapons, IEntity, IPlayer, LayerExclude, LayerObjects } from "../types";
import { distance, formatEntity, formatObject, getAngle, sleep } from "./Common";

export const itemBar = (index: number) => {
    return Dsync.defaultData[Dsync.props.itemBar][index];
}
export const hasSecondary = () => {
    const item = Dsync.itemData[itemBar(1)];
    return item[Dsync.props.itemType] === EItems.SECONDARY;
}

export const canShoot = () => {
    const item = Dsync.itemData[itemBar(1)];
    return item[Dsync.props.itemDataType] === EItemTypes.SHOOTING;
}

export const hasItemByType = (type: number) => {
    const items: number[] = Dsync.defaultData[Dsync.props.itemBar];
    return items.some(id => Dsync.itemData[id][Dsync.props.itemType] === type);
}

export const isStoneGold = () => {
    const item = Dsync.itemData[itemBar(0)];
    return [1, 2].includes(item[Dsync.props.weaponType]);
}

let scytheToggle = false;
export const upgradeScythe = async () => {
    const goldenCowID = Dsync.goldenCowID();
    if (goldenCowID && itemBar(0) !== EWeapons.SCYTHE && !scytheToggle) {
        scytheToggle = true;
        Dsync.upgradeScythe(goldenCowID);
        await sleep(200);
        scytheToggle = false;
    }
}

export const getAnimals = (): IEntity[] => {
    const list = Dsync.entityList();
    return [
        ...list[EAnimals.COW],
        ...list[EAnimals.SHARK],
        ...list[EAnimals.WOLF],
        ...list[EAnimals.GOLDENCOW],
        ...list[EAnimals.DRAGON],
        ...list[EAnimals.MAMMOTH],
        ...list[EAnimals.DUCK],
    ].map(entity => formatEntity(entity));
}

export const getEnemies = (): IEntity[] => {
    const players = Dsync.entityList()[0];
    return players.map(player => formatEntity(player))
        .filter(({ id, ownerID }) => {
            const isMyPlayer = id === Dsync.myPlayerID();
            const isTeammate = teammates.includes(ownerID);
            return !isMyPlayer && !isTeammate; 
        })
}

export const getEntities = (): IEntity[] => {
    return [
        ...getEnemies(),
        ...getAnimals()
    ]
}

export const lineSegmentIntersectsCircle = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    cx: number,
    cy: number,
    r: number
) => {
    const xL = x2 - x1;
    const xC = x1 - cx;
    const yL = y2 - y1;
    const yC = y1 - cy;
    const a = xL * xL + yL * yL;
    const hB = xL * xC + yL * yC;
    const c = xC * xC + yC * yC - r * r;
    return (
        hB * hB >= a * c &&
        (-hB <= a || c + hB + hB + a <= 0) &&
        (hB <= 0 || c <= 0)
    )
}

interface IEnemy extends IEntity {
    dir: number;
    distance: number;
}

export const getNearestEntities = (shoot: boolean): IEnemy[] => {
    const enemies = getEnemies().map(enemy => {
        return {
            ...enemy,
            dir: getAngle(enemy, Dsync.myPlayer).angle,
            distance: distance(enemy, Dsync.myPlayer).dist
        }
    }).sort((a, b) => a.distance - b.distance);
    
    if (shoot) {
        enemies.sort((a, b) => {
            const hasShield1 = a.target[Dsync.props.currentItem] === EWeapons.SHIELD;
            const hasShield2 = b.target[Dsync.props.currentItem] === EWeapons.SHIELD;
            return hasShield1 ? 1 : hasShield2 ? -1 : 0;
        });
    }

    const animals = getAnimals().map(enemy => {
        return {
            ...enemy,
            dir: getAngle(enemy, Dsync.myPlayer).angle,
            distance: distance(enemy, Dsync.myPlayer).dist
        }
    }).sort((a, b) => a.distance - b.distance);
    return [ ...enemies, ...animals ];
}

export const entityIn = (entity: IEnemy | IEntity | IPlayer, layer: number) => {
    return Dsync.entityList()[layer].some(target => {
        const object = formatObject(target);
        return distance(entity, object).dist < entity.radius + object.radius;
    })
}


interface IHitData {
    canHit: boolean;
    needDestroy: boolean;
}

export const projectileCanHitEntity = (entity: IEntity): Readonly<IHitData> | false => {
    if (!canShoot()) return false;
    const range = Dsync.itemData[itemBar(EItems.SECONDARY)].range;
    const enemy: IEnemy = {
        ...entity,
        dir: getAngle(entity, Dsync.myPlayer).angle,
        distance: distance(entity, Dsync.myPlayer).dist
    }
    const x1 = Dsync.myPlayer.x2;
    const y1 = Dsync.myPlayer.y2;
    const x2 = x1 + range * Math.cos(enemy.dir);
    const y2 = y1 + range * Math.sin(enemy.dir);

    // if (enemy.distance > range) return false;

    const myPlayerOnPlatform = entityIn(Dsync.myPlayer, ELayer.PLATFORM);
    const entityInRoof = entityIn(entity, ELayer.ROOF);
    if (myPlayerOnPlatform && entityInRoof) return false;

    const layers = Dsync.entityList();
    for (const layer of LayerObjects) {
        if (myPlayerOnPlatform && !LayerExclude.includes(layer)) continue;

        for (const entity of layers[layer]) {
            const object = formatObject(entity);
            const dist = distance(object, Dsync.myPlayer).dist;
            if (dist > enemy.distance) continue;
            if (lineSegmentIntersectsCircle(
                x1, y1, x2, y2,
                object.x2,
                object.y2,
                object.radius
            )) {
                const objectData = Dsync.entityData[object.type];
                const maxHealth = objectData[Dsync.props.maxHealth];
                if (maxHealth === undefined) return false;
                return {
                    canHit: true,
                    needDestroy: true
                }
            }
        }
    }
    return {
        canHit: true,
        needDestroy: false
    }
}

export const getNearestPossibleEnemy = (index: number): IEnemy => {
    const range = Dsync.itemData[itemBar(index)].range;
    const shoot = canShoot() && index === 1;
    const enemies = getNearestEntities(shoot).filter(enemy => {
        const inDistance = enemy.distance < range + enemy.radius;
        if (shoot) {
            const entityHit = projectileCanHitEntity(enemy);
            return inDistance && typeof entityHit === "object" && entityHit.canHit;
        }
        return inDistance;
    });

    if (shoot) {
        enemies.sort((a, b) => {
            const canHitA = projectileCanHitEntity(a) as Readonly<IHitData>;
            const canHitB = projectileCanHitEntity(b) as Readonly<IHitData>;
            return canHitA.needDestroy ? 1 : canHitB.needDestroy ? -1 : 0;
        });
    }
    return enemies.length ? enemies[0] : null;
}