import { controller, Dsync, log } from "..";
import { ActionType, Items, ItemType } from "../constants/Items";
import { Animals, ELayer, LayerObjects } from "../constants/LayerData";
import { teammates } from "../hooks/clanHandler";
import Vector from "../modules/Vector";
import { Scale } from "../modules/zoomHandler";
import { EWeapons, Hit } from "../types";
import { Formatter, IEntity, IPlayer, TypeEntity } from "./Common";

const getAngleDist = (a: number, b: number) => {
    const p = Math.abs(b - a) % (Math.PI * 2);
    return (p > Math.PI ? (Math.PI * 2) - p : p);
}

export class EntityManager {

    static isPlayer(entity: TypeEntity): entity is IPlayer {
        return entity.type === ELayer.PLAYER;
    }

    static animals() {
        const layers = Dsync.saves.entityList();
        const animals: IEntity[] = [];
        
        for (let i=0;i<Animals.length;i++) {
            const layer = layers[Animals[i].id];
            const formatted = layer.map(target => Formatter.entity(target));
            animals.push(...formatted);
        }

        return animals;
    }

    static enemies() {
        const players = Dsync.saves.entityList()[ELayer.PLAYER];
        const enemies: IPlayer[] = [];

        for (let i=0;i<players.length;i++) {
            const player = Formatter.player(players[i]);
            if (controller.isEnemy(player)) enemies.push(player);
        }

        return enemies;
    }

    static distance(a: TypeEntity, b: TypeEntity): number {
        return new Vector(a.x2, a.y2).distance(new Vector(b.x2, b.y2));
    }

    static angle(a: TypeEntity, b: TypeEntity): number {
        return new Vector(a.x2, a.y2).angle(new Vector(b.x2, b.y2));
    }

    static sortDistance(a: TypeEntity, b: TypeEntity, sorted?: TypeEntity) {
        const target = sorted || Dsync.myPlayer;
        return this.distance(a, target) - this.distance(b, target);
    }

    static shield(a: IPlayer, b: IPlayer, sorted?: TypeEntity) {
        const target = sorted || Dsync.myPlayer;
        const shieldA = this.lookingAt(a, target, 1.58927) && a.currentItem === EWeapons.SHIELD;
        const shieldB = this.lookingAt(b, target, 1.58927) && b.currentItem === EWeapons.SHIELD;
        return shieldA ? 1 : shieldB ? -1 : 0;
    }

    static canHitEntity(a: TypeEntity, b: TypeEntity, sorted?: TypeEntity) {
        const target = sorted || Dsync.myPlayer;
        const hitA = this.projectileCanHitEntity(a, target);
        const hitB = this.projectileCanHitEntity(b, target);
        return hitA === Hit.NEEDDESTROY ? 1 : hitB === Hit.NEEDDESTROY ? -1 : 0;
    }

    static lookingAt(entity: TypeEntity, point: TypeEntity, angle: number) {
        const pos1 = new Vector(entity.x2, entity.y2);
        const pos2 = new Vector(point.x2, point.y2);
        const dir = getAngleDist(pos1.angle(pos2) + Math.PI, entity.angle2);
        return dir > angle;
    }

    static entities(sorted?: TypeEntity) {
        return [
            ...this.enemies().sort((a, b) => this.sortDistance(a, b, sorted)).sort((a, b) => this.shield(a, b, sorted)),
            ...this.animals().sort((a, b) => this.sortDistance(a, b, sorted))
        ]
    }

    static predict(entity: TypeEntity) {
        const pos1 = new Vector(entity.x1, entity.y1);
        const pos2 = new Vector(entity.x2, entity.y2);

        const distance = pos1.distance(pos2) * (entity === Dsync.myPlayer ? 1 : 2.2);
        const direction = Vector.fromAngle(pos1.angle(pos2));

        return pos2.add(direction.mult(distance));
    }

    static entityIn(entity: TypeEntity, layer: number) {
        const targets = Dsync.saves.entityList()[layer];
        return targets.some(target => {
            const object = Formatter.object(target);
            const radius = entity.radius + object.radius;
            return this.distance(entity, object) < radius;
        })
    }

    static intersects(pos1: Vector, pos2: Vector, pos3: Vector, r: number) {
        const linear = pos2.copy().sub(pos1);
        const constant = pos1.copy().sub(pos3);
        const a = linear.dot(linear);
        const b = linear.dot(constant);
        const c = constant.dot(constant) - r * r;

        return (
            b * b >= a * c &&
            (-b <= a || c + b + b + a <= 0) &&
            (b <= 0 || c <= 0)
        )
    }

    static projectileCanHitEntity(entity: TypeEntity, sorted?: TypeEntity) {
        const target = sorted || Dsync.myPlayer;
        if (!controller.canShoot()) return Hit.CANNOT;

        const pos1 = new Vector(target.x2, target.y2);
        const pos2 = new Vector(entity.x2, entity.y2);

        const myPlayerOnPlatform = this.entityIn(target, ELayer.PLATFORM);
        const entityInRoof = this.entityIn(entity, ELayer.ROOF);
        if (myPlayerOnPlatform && entityInRoof) return Hit.CANNOT;

        const layers = Dsync.saves.entityList();
        for (const layer of LayerObjects) {
            if (myPlayerOnPlatform && !layer.cannotShoot) continue;

            for (const target of layers[layer.id]) {
                const object = Formatter.object(target);
                const pos3 = new Vector(object.x2, object.y2);
                if (pos1.distance(pos3) > pos1.distance(pos2)) continue;

                if (this.intersects(pos1, pos2, pos3, object.radius)) {
                    if (object.layerData.maxHealth === undefined) return Hit.CANNOT;
                    return Hit.NEEDDESTROY;
                }
            }
        }
        return Hit.CAN;
    }

    static inWeaponRange(entity1: TypeEntity, entity2: TypeEntity, weapon: number) {
        const range = Items[weapon].range || 0;
        return this.distance(entity1, entity2) <= range + entity2.radius;
    }

    static inView(entity: TypeEntity) {
        const { w, h } = Scale.max;
        const scale = Math.max(innerHeight / h, innerWidth / w);
        const x = innerWidth / 2 / scale;
        const y = innerHeight / 2 / scale;
        const { x2, y2 } = Dsync.myPlayer;
        const inViewX = entity.x2 > (x2 - x) && entity.x2 < (x2 + x);
        const inViewY = entity.y2 > (y2 - y) && entity.y2 < (y2 + y);
        return inViewX && inViewY;
    }

    static nearestPossible(weapon: number, sorted?: TypeEntity): TypeEntity {
        const target = sorted || Dsync.myPlayer;
        const item = Items[weapon];
        const shoot = controller.canShoot() && item.actionType === ActionType.RANGED;

        const entities = this.entities().filter(entity => {
            return shoot ? this.projectileCanHitEntity(entity, target) : this.inWeaponRange(target, entity, weapon);
        })

        if (shoot) {
            entities.sort((a, b) => this.canHitEntity(a, b, target));
        }

        return entities.length ? entities[0] : null;
    }

    // static nearestPossible(weapon: boolean): TypeEntity {
    //     const range = Items[controller.itemBar[+weapon]].range || 0;
    //     const shoot = controller.canShoot() && weapon;

    //     const entities = this.entities().filter(entity => {
    //         return shoot ? this.projectileCanHitEntity(entity) : this.distance(Dsync.myPlayer, entity) <= range + entity.radius;
    //     })

    //     if (shoot) {
    //         entities.sort(this.canHitEntity.bind(this));
    //     }

    //     return entities.length ? entities[0] : null;
    // }
}