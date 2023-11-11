
import "@babylonjs/loaders/glTF";
import {
    Color3,
    Color4,
    CubeTexture,
    FlyCamera,
    FreeCamera,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    SceneLoader,
    Sprite,
    SpriteManager,
    StandardMaterial,
    Texture,
    Vector3,
} from '@babylonjs/core'
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

let box: Mesh | undefined


const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new FlyCamera('camera1', new Vector3(0, 1, -3), scene)
    camera.setTarget(Vector3.Up())
    const envTexture = new CubeTexture("space", scene);
    scene.createDefaultSkybox(envTexture, false, 10000);//
    camera.attachControl(true);

    SceneLoader.ImportMesh("", "animations/", "ship.glb", scene, function(newMeshes) {
        // Set the target of the camera to the first imported mesh
        const hero = newMeshes[0];
    });

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    // const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
    // Create a background sprite
    scene.clearColor = new Color4(0, 0, 0, 0);
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
