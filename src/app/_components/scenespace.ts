import {
    Color4,
    CubeTexture,
    FlyCamera,
    HemisphericLight,
    Mesh,
    Scene,
    SceneLoader,
    Vector3
} from '@babylonjs/core'
import '@babylonjs/loaders/glTF'
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

let box: Mesh | undefined
let rocket: any

let x_pos: number
let y_pos: number
let z_pos: number

let x_start: number
let y_start: number
let z_start: number

const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new FlyCamera('camera1', new Vector3(0, 1, -3), scene)
    const envTexture = new CubeTexture("space", scene);
    scene.createDefaultSkybox(envTexture, true, 1000);
    // This targets the camera to scene origin
    camera.setTarget(Vector3.Up())


    // This attaches the camera to the canvas
    camera.attachControl(true)

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

    // Create a background sprite
    scene.clearColor = new Color4(0, 0, 0, 0)

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.1


    SceneLoader.ImportMesh("", "animations/", "rocket.glb", scene, function(newMeshes) { // 
        // Set the target of the camera to the first imported mesh

        if (newMeshes[0])
            rocket = newMeshes[0]
        x_start = rocket.position.x
        y_start = rocket.position.y
        z_start = rocket.position.z
        rocket.position.z = rocket.position.z + 2
        rocket.position.y = rocket.position.y + 1
        // Set the scaling of the root mesh to make the object smaller
        rocket.scaling.scaleInPlace(0.007)
    });
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {
    if (rocket) {
        const deltaTimeInMillis = scene.getEngine().getDeltaTime()

        const rpm = 20
        rocket.position.z = rocket.position.z
        rocket.rotate(
            Vector3.Right(),
            (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
        )
        rocket.rotate(
            Vector3.Up(),
            (10 / 60) * Math.PI * 2 * (deltaTimeInMillis / 800)
        )
    }
}

export { onRender, onSceneReady }

