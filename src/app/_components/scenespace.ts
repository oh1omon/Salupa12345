import {
    Color4,
    FlyCamera,
    HemisphericLight,
    Mesh,
    Scene,
    SceneLoader,
    Vector3,
} from '@babylonjs/core'
import '@babylonjs/loaders/glTF'
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

let box: Mesh | undefined
let rocket: Mesh | undefined

let x_pos: Number
let y_pos: Number
let z_pos: Number

let x_start: Number
let y_start: Number
let z_start: Number

const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new FlyCamera('camera1', new Vector3(0, 1, -3), scene)

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Up())

    const canvas = scene.getEngine().getRenderingCanvas()

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true)

    SceneLoader.ImportMesh("", "animations/", "ship.glb", scene, function(newMeshes) {
        // Set the target of the camera to the first imported mesh
        const hero = newMeshes[0];
    });

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

    // Create a background sprite
    scene.clearColor = new Color4(0, 0, 0, 0)

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1.1

    SceneLoader.Append(
        'animations/',
        'rocket.glb',
        scene,
        function (loadedScene) {
            // Get the root mesh of the loaded scene
            rocket = scene.meshes[0]
            x_start = rocket.position.x
            y_start = rocket.position.y
            z_start = rocket.position.z
            rocket.position.z = rocket.position.z + 2
            rocket.position.y = rocket.position.y + 1
            // Set the scaling of the root mesh to make the object smaller
            rocket.scaling.scaleInPlace(0.007)
        }
    )

    // Our built-in 'box' shape.
    // box = MeshBuilder.CreateBox('box', { size: 0.5 }, scene)

    // Move the box upward 1/2 its height
    // box.position.y = 1
    // SceneLoader.ImportMesh("", "/animations/", "robot.glb", scene); //Empty string loads all meshes

    // if (hero) {
    //     hero.position.x = 1 + index;
    //     hero.rotation = new Vector3(0, Math.PI / 16, 0);
    // }

    // SceneLoader.ImportMesh("", "animations/", "hooman.glb", scene, function(newMeshes) {
    //     // Set the target of the camera to the first imported mesh
    //     const hero = newMeshes[0];
    //     if (hero) {
    //         hero.position.x = -1-index;
    //         hero.rotation = new Vector3(0, Math.PI / 16, 0);
    //         hero.scaling.scaleInPlace(0.5);
    //     }
    //     const idleAnim = scene.getAnimationGroupByName("defeated");
    //     // idleAnim?.stop();

    // Our built-in 'ground' shape.
    // MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
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
