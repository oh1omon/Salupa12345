import { Scene } from "@babylonjs/core";
import { createAnimation } from "./cameraanim";

const FRAMES_PER_SECOND = 60;
const SPEED_RATIO = 1;
const LOOP_MODE = false;
const FROM_FRAME = 0;
const TO_FRAME = 400;


function throwOutAi(scene: Scene) {
    const opponentMesh: any = scene.getMeshByName('playerthrowout');
    const shipdoor: any = scene.getMeshByName('shipdoor');
    opponentMesh.animations = [
        createAnimation({
            property: "position.z",
            from: -7,
            to: -200,
        }),

        createAnimation({
            property: "rotation.z",
            from: 0,
            to: 8*Math.PI,
        }),
    ]

    shipdoor.animations = [
        createAnimation({
            property: "position.y",
            from: 4,
            to: -10,
        }),

    ]
    scene.beginAnimation(shipdoor, 0, 600, LOOP_MODE, SPEED_RATIO, () => {

        scene.beginAnimation(opponentMesh, 0, 600, LOOP_MODE, SPEED_RATIO);
    });


};

export { throwOutAi };

