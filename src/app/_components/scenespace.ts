
import "@babylonjs/loaders/glTF";
import {
    Color4,
    FlyCamera,
    FreeCamera,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    SceneLoader,
    Sprite,
    SpriteManager,
    Vector3,
} from '@babylonjs/core'
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

let box: Mesh | undefined


const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new FlyCamera('camera1', new Vector3(0, 1, -3), scene)

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Up())

    const canvas = scene.getEngine().getRenderingCanvas()

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true)

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

    // Create a background sprite
    scene.clearColor = new Color4(0, 0, 0, 0);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1.1

    // Our built-in 'box' shape.
    // box = MeshBuilder.CreateBox('box', { size: 0.5 }, scene)

    // Move the box upward 1/2 its height
    // box.position.y = 1
    // SceneLoader.ImportMesh("", "/animations/", "robot.glb", scene); //Empty string loads all meshes
      var spriteManager = new SpriteManager("spriteManager", "/space.jpg", 1, 2048, scene);

            var backgroundSprite = new Sprite("backgroundSprite", spriteManager);

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
    if (box !== undefined) {
        const deltaTimeInMillis = scene.getEngine().getDeltaTime()

        const rpm = 10
        box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
    }
}

export { onRender, onSceneReady }
