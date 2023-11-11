import "@babylonjs/loaders/glTF";
import {
    AbstractMesh,
    ArcRotateCamera,
    Color3,
    Color4,
    CubeTexture,
    FlyCamera,
    FreeCamera,
    HDRCubeTexture,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    PBRMaterial,
    PointLight,
    Scene,
    SceneLoader,
    SpotLight,
    Sprite,
    SpriteManager,
    StandardMaterial,
    Texture,
    Vector3,
} from '@babylonjs/core'
import { Result } from "postcss";
import { randomInt } from "crypto";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.


let box: Mesh | undefined
let box2: Mesh | undefined

let camera:ArcRotateCamera

const onSceneReady = async (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    camera = new ArcRotateCamera('camera', -1.6, 1.6, 1, new Vector3(0,2,-5.5),scene);

    // This targets the camera to scene origin

    // const envTexture = new CubeTexture("space", scene);
    // scene.createDefaultSkybox(envTexture, true, 1000);
    const engine = scene.getEngine()

    SceneLoader.ImportMesh("", "animations/", "ship.glb", scene, function(newMeshes) {
        // Set the target of the camera to the first imported mesh
        const shuttle1 = newMeshes[0];

        const shuttle2 = shuttle1?.clone("shuttle2", null);
        if (shuttle2) {
            shuttle2.position.z = 10;
        }
    });
    // This attaches the camera to the canvas
    camera.attachControl(true)

    // const light2 = new PointLight("pointLight", new Vector3(4, 4, -5), scene);
    const light = new HemisphericLight('light', new Vector3(0, 3, 0), scene)

    // Create a background sprite
    scene.clearColor = new Color4(0, 0, 0, 0);
    // Default intensity is 1. Let's dim the light a small amount
    // light.intensity = 1.0

    // Create a background sprite
    scene.clearColor = new Color4(0, 0, 0, 0);

    // Default intensity is 1. Let's dim the light a small amount

    // Our built-in 'box' shape.
    // box = MeshBuilder.CreateBox('box', { size: 0.5 }, scene)

    // Move the box upward 1/2 its height
    // box.position.y = 1
    // SceneLoader.ImportMesh("", "/animations/", "robot.glb", scene); //Empty string loads all meshes
    // let spriteManager = new SpriteManager("spriteManager", "/space.jpg", 1, 2048, scene);


    const metalTexture = new StandardMaterial('metalTexture', scene);
    metalTexture.diffuseTexture = new Texture('metal.jpg', scene);
    // metalTexture.specularColor = new Color3(0.5, 0.5, 0.5); // Adjust the specular color for a metal appearance
    const rustyTexture = new StandardMaterial('rustyTexture', scene);
    rustyTexture.diffuseTexture = new Texture('rusty.jpg', scene);
    // rustyTexture.specularColor = new Color3(0.5, 0.5, 0.5); // Adjust the specular color for a metal appearance
    // let backgroundSprite = new Sprite("backgroundSprite", spriteManager);
    //
    //

    let robot: AbstractMesh = await SceneLoader.ImportMeshAsync("", "animations/", "robot.glb", scene).then((result) => {
        result.meshes[0].position.x = -100;
        result.meshes[0].rotation = new Vector3(0, Math.PI / 16, 0);
        return result.meshes[0]
    })
    // whenever you want to add the mesh to the scene
    let hooman: AbstractMesh = await SceneLoader.ImportMeshAsync("", "animations/", "hooman.glb", scene).then((result) => {
        result.meshes[0].scaling.scaleInPlace(0.5)
        result.meshes[0].rotation = new Vector3(0, Math.PI / 16, 0);
        result.meshes[0].position.x = -100;
        return result.meshes[0]
    })


    function putAnother(whatToClone: AbstractMesh, x: number, y: number, z: number) {
        const humclone = whatToClone.clone('chuj', null)
        humclone.position.x = x;
        humclone.position.y = y;
        humclone.position.z = z;
    }
    for (let index = 0; index < 6; index++) {

        box = MeshBuilder.CreateTiledBox('box', { pattern: Mesh.NO_FLIP, width: 15, height: 0.8 }, scene)
        box2 = MeshBuilder.CreateBox('box', { size: 1, width: 15, height: 0.2 }, scene)
        box.position.y = 0.0 + index;
        box.position.z = 1.6 + (1 * index);
        box2.position.y = 0.5 + index;
        box2.position.z = 1.4 + (1 * index);
        box.material = metalTexture;
        box2.material = rustyTexture;
    }
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    for (let index = 0; index < 6; index++) {

        for (let z = 0; z < 13; z++) {
            let i = getRandomInt(3);
            switch (i) {
                case 0:
                    putAnother(robot, -5 + z, -0.3 + index, 1.0 + index);
                    break;
                case 1:
                    putAnother(hooman, -5 + z, -0.3 + index, 1.0 + index);
                    break;
            }

            // SceneLoader.ImportMesh("", "animations/", "robot.glb", scene, function(newMeshes) {
            //     // Set the target of the camera to the first imported mesh
            //     const hero = newMeshes[0];
            //
            //     if (hero) {
            //         hero.position.x = -5 + z;
            //         hero.position.z = 1 + index;
            //         hero.position.y = -0.3 + index;
            //         hero.rotation = new Vector3(0, Math.PI / 16, 0);
            //     }
            // }
            // )
        }
    }

    // if (hero) {
    //     hero.position.x = 1 + index;
    //     hero.rotation = new Vector3(0, Math.PI / 16, 0);
    // }
    // idleAnim?.stop(true, 1.0, idleAnim.from, idleAnim.to, false);
    // idleAnim?.stop();
    const backdoorsTexture = new StandardMaterial('doorsTexture', scene);
    backdoorsTexture.diffuseTexture = new Texture('doors.jpg', scene);
    const backdoors = MeshBuilder.CreateBox('box', { size: 1, width: 13, height: 8 }, scene)
    backdoors.position.y = 4;
    backdoors.position.z = -10;
    backdoors.material = backdoorsTexture
    // Create materials
    var glass = new PBRMaterial("glass", scene);

    glass.indexOfRefraction = 0.82;
    glass.alpha = 0.3;
    glass.directIntensity = 0.0;
    glass.environmentIntensity = 0.7;
    glass.cameraExposure = 0.66;
    glass.cameraContrast = 1.66;
    glass.microSurface = 1;
    glass.reflectivityColor = new Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new Color3(0.95, 0.95, 0.95);

    const prisonwindow = MeshBuilder.CreateBox('box', { size: 1, width: 13, height: 8 }, scene)
    prisonwindow.position.y = 4;
    prisonwindow.position.z = -7;
    prisonwindow.material = backdoorsTexture

    prisonwindow.material = glass;

    // putHuman(0,0,0);
    // Our built-in 'ground' shape.
    // MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {
    // if (box !== undefined) {
    //     const deltaTimeInMillis = scene.getEngine().getDeltaTime()
    //
        const rpm = 1
    //     box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
    // }
    // 
    camera.alpha+=0.01;
    
}

export { onRender, onSceneReady }
