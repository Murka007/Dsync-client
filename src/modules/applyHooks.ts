import { Dsync, log } from "..";
import Regex from "./Regex";

const applyHooks = (code: string) => {

    const Hook = new Regex(code, true);

    // Save a copy of bundle
    window.COPY_CODE = (Hook.COPY_CODE.match(/^\((.+)\)\(.+\);$/) || [])[1];

    // Make it possible to modify the bundle
    Hook.append(
        "EXTERNAL fix",
        /\(function (\w+)\(\w+\)\{/,
        `EXTERNAL.__proto__.toString=()=>COPY_CODE;`
    );

    Hook.replace(
        "strict",
        /{QUOTE}use strict{QUOTE};/,
        ""
    );

    Hook.replace(
        "buffer",
        /((\w+)=new \w+\(NUMBER{4096}\).+?(\w+)=.+?)function/,
        `$1Dsync.saves.buffer=$2;Dsync.saves.byteLength=()=>$3;function`
    )

    Hook.append(
        "toggleRotation",
        /return (\w+)\?\w+:.+?\}/,
        `Dsync.saves.toggleRotation=(value)=>{$2=value};`
    )

    const acceptList = Hook.append(
        "clanData",
        /(\w+)\.(\w+)\.\w+\(\)\);.+?\}/,
        `Dsync.saves.clanData=$2;`
    )[3];
    Dsync.props.acceptList = acceptList;

    Hook.append(
        "upgradeItem",
        /\.001.+?for\(let \w+=0,.+?\w+\(new \w+\(\[.+?,(\w+)\]\)(,|;)?/,
        `,Dsync.controller.upgradeItem($2)$3`
    );

    Hook.replace(
        "zoom",
        /(\w+):NUMBER{1824},(\w+):NUMBER{1026}/,
        "get $1(){return Dsync.scale.lerp.w},get $2(){return Dsync.scale.lerp.h}"
    );

    Hook.insert(
        "send",
        /=NUMBER{9999}.+?\(null\).+?{INSERT}function (\w+)\(\w+\)\{/,
        `Dsync.saves.send=$3;`
    );

    Hook.replace(
        "toggleChat",
        /(return \(?(\w+&&\w+.+?)(?:,)?(?:\))?void.+?)function/,
        `$1Dsync.saves.toggleChat=()=>{$2};function`
    );

    Hook.replace(
        "updatePlayer",
        /(\w+\(ARGS{16}\).+?(\w+)\.\w+=0[,;]?)\}function/,
        `$1;Dsync.hooks.updatePlayer($2)}function`
    );

    Hook.replace(
        "createEntity",
        /(function \w+\((\w+),ARGS{16}\).+?\})(\}\w+\(\))/,
        `$1Dsync.hooks.createEntity($2)$3`
    );

    Hook.append(
        "drawEntityInfo",
        /-NUMBER{50},.+?function \w+\((ARGS{3})\)\{/,
        `Dsync.hooks.drawEntityInfo($2);`
    );

    const id = Hook.match("id", /-NUMBER{1}!==\w+\.(\w+)&&/)[1];
    Dsync.props.id = id;

    const [,
        x, x1, x2,
        y, y1, y2,
        angle, angle1, angle2
    ] = Hook.match(
        "PositionFormat",
        [
            /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+,/,
            /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+,/,
            /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+,/
        ]
    );
    Dsync.props.x = x;
    Dsync.props.x1 = x1;
    Dsync.props.x2 = x2;

    Dsync.props.y = y;
    Dsync.props.y1 = y1;
    Dsync.props.y2 = y2;

    Dsync.props.angle = angle;
    Dsync.props.angle1 = angle1;
    Dsync.props.angle2 = angle2;

    const ownerID = Hook.match("ownerID", /\|\|\w+&&\w+===\w+\.(\w+)\)/)[1];
    Dsync.props.ownerID = ownerID;

    const health = Hook.match("health", /\w+\.(\w+)\/NUMBER{255}\*/)[1];
    Dsync.props.health = health;

    const entityValue = Hook.match("entityValue", /!\(\w+\.(\w+)&/)[1];
    Dsync.props.entityValue = entityValue;

    const [, currentItem, hat] = Hook.match("hat", /\(\w+\.(\w+)\|\w+\.(\w+)<<NUMBER{8}\)/);
    Dsync.props.hat = hat;
    Dsync.props.currentItem = currentItem;

    const projectileType = Hook.match("projectileType", /,\w+\[\w+\]\.(\w+),/)[1];
    Dsync.props.projectileType = projectileType;

    Hook.prepend(
        "myPlayerID",
        /function \w+\(\)\{return \w+!==(\w+)/,
        `Dsync.saves.myPlayerID=()=>$2;`
    );

    const itemBar = Hook.replace(
        "defaultData",
        /(\W\w+>NUMBER{1}\W.+?(\w+)\.(\w+).+?)function/,
        "$1Dsync.saves.defaultData=$2;function"
    )[3];
    Dsync.props.itemBar = itemBar;

    const currentCount = Hook.match("currentCount", /(\w+):\[ARGS{11}\],/)[1];
    Dsync.props.currentCount = currentCount;

    Hook.replace(
        "entityList",
        /(\(this,.+?typeof window.+?(\w+)=\[\].+?)function/,
        `$1Dsync.saves.entityList=()=>$2;function`
    );

    const rotateSpeed = Hook.match("rotateSpeed", /\w+\(ARGS{17}\)\{.+?\/NUMBER{4}.+?\/NUMBER{4}.+?\w+\.(\w+)=/)[1];
    Dsync.props.rotateSpeed = rotateSpeed;

    Hook.append(
        "showHoods",
        /\w+\.\w+!==\w+\)/,
        `||Dsync.settings.showHoods`
    );

    Hook.append(
        "itemCounter",
        /AGE 0.+?\[(\w+)\][,;](\w+)\.\w+\((\w+)\)([,;])/,
        `Dsync.hooks.drawItemBar($4,$3,$2)$5`
    );

    Hook.replace(
        "renderItems",
        /(\(\w+\.\w+\+\w+,\w+\.\w+\+\w+\).+?\w+\(\).+?\w+\.\w+\.\w+\)([,;]))/,
        `$1Dsync.hooks.renderItems(...arguments)$2`
    );

    Hook.replace(
        "mousemove",
        /(\+NUMBER{110}.+?)(const \w+=\w+\(\).+?\w+!==\w+.+?\w+\(\w+\))/,
        `$1if(Dsync.controller.mousemove){$2}`
    );

    Hook.replace(
        "chatMessage",
        /(\.NUMBER{18},.+?)(\w+\.\w+\((\w+),\w+\))/,
        `$1if(pingCount!==$3&&!Dsync.settings.hideMessages){$2}`
    );

    Hook.replace(
        "clanMessage",
        /(NUMBER{1006}.+?)(\w+\.\w+\(\w+,.+?\+(\w+)\))/,
        `$1if(pingCount!==$3&&!Dsync.settings.hideMessages){$2}`
    )

    Hook.replace(
        "players",
        /(\)\)\(\).+?(\w+)=new.+?)function/,
        `$1Dsync.saves.players=()=>$2;function`
    )

    const [skin, accessory, back] = Hook.matchAll("skins", /=\w+\.(\w+)\|\|NUMBER{0}/).map(a => a[1]);
    Dsync.props.skin = skin;
    Dsync.props.accessory = accessory;
    Dsync.props.back = back;

    log("Total hooks: " + Hook.totalHooks);
    return Hook.code;
}

export default applyHooks;