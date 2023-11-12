import {
    ArcRotateCamera,
    Color3,
    Color4,
    CubeTexture,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    PBRMaterial,
    Scene,
    SceneLoader,
    StandardMaterial,
    Texture,
    Vector3
} from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.


let box: Mesh | undefined
let box2: Mesh | undefined

let camera: ArcRotateCamera

const onSceneReady = async (scene: Scene) => {
    camera = new ArcRotateCamera('camera', -1.4, 1.6, 1.6, new Vector3(6, 2, -5.5), scene);
    // const envTexture = new CubeTexture("space", scene);
    // scene.createDefaultSkybox(envTexture, true, 1000);

    SceneLoader.ImportMesh("", "animations/", "ship.glb", scene, function(newMeshes) {
        // Set the target of the camera to the first imported mesh
        const shuttle1 = newMeshes[0];

        const shuttle2 = shuttle1?.clone("shuttle2", null);
        if (shuttle2) {
            shuttle2.position.z = 10;
        }
    });
    const light = new HemisphericLight('light', new Vector3(0, 3, 0), scene)

    // Create a background sprite
    scene.clearColor = new Color4(0, 0, 0, 0);

    // Create a background sprite
    scene.clearColor = new Color4(0, 0, 0, 0);



    const metalTexture = new StandardMaterial('metalTexture', scene);
    metalTexture.diffuseTexture = new Texture('metal.jpg', scene);
    const rustyTexture = new StandardMaterial('rustyTexture', scene);
    rustyTexture.diffuseTexture = new Texture('rusty.jpg', scene);

    let robot: any = await SceneLoader.ImportMeshAsync("", "animations/", "robot.glb", scene).then((result: any) => {
        result.meshes[0].position.x = -100;
        result.meshes[0].rotation = new Vector3(0, Math.PI / 16, 0);
        return result.meshes[0]
    })
    // TODO change this to hooman.glb
    let hooman: any = await SceneLoader.ImportMeshAsync("", "animations/", "defeated_boss.glb", scene).then((result: any) => {
        result.meshes[0].scaling.scaleInPlace(0.9)
        result.meshes[0].rotation = new Vector3(0, Math.PI / 16, 0);
        result.meshes[0].position.x = -100;
        return result.meshes[0]
    })

    let peasant: any = await SceneLoader.ImportMeshAsync("", "animations/", "peasant_girl.glb", scene).then((result: any) => {
        result.meshes[0].rotation = new Vector3(0, Math.PI / 16, 0);
        result.meshes[0].position.x = -100;
        return result.meshes[0]
    })

    let ely: any = await SceneLoader.ImportMeshAsync("", "animations/", "ely.glb", scene).then((result: any) => {
        result.meshes[0].rotation = new Vector3(0, Math.PI / 16, 0);
        result.meshes[0].position.x = -100;
        return result.meshes[0]
    })


    function putAnother(whatToClone: any, x: number, y: number, z: number, rotation?: number, name?: string) {
        const humclone = whatToClone.clone('chuj', null)
        humclone.position.x = x;
        humclone.position.y = y;
        humclone.position.z = z;
        if (rotation)
            humclone.rotation = new Vector3(0, Math.PI / rotation, 0);
        if (name)
            humclone.name = name
        return humclone;
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

    for (let index = 0; index < 6; index++) {

        for (let z = 0; z < 13; z++) {
            let i = getRandomInt(4);
            switch (i) {
                case 0:
                    putAnother(robot, -5 + z, -0.3 + index, 1.0 + index);
                    break;
                case 1:
                    putAnother(hooman, -5 + z, 0.6 + index, 1.2 + index);
                    break;
                case 2:
                    putAnother(peasant, -5 + z, -0.0 + index, 1.0 + index);
                    break;

                case 3:
                    putAnother(ely, -5 + z, 0.2 + index, 1.0 + index);
            }

        }
    }

    const backdoorsTexture = new StandardMaterial('doorsTexture', scene);
    backdoorsTexture.diffuseTexture = new Texture('doors.jpg', scene);
    const backdoors = MeshBuilder.CreateBox('shipdoor', { size: 1, width: 13, height: 8 }, scene)
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
    prisonwindow.position.y = 4; function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    prisonwindow.position.z = -7;
    prisonwindow.material = backdoorsTexture

    prisonwindow.material = glass;


    let i = getRandomInt(4);
    putAnother([hooman, ely, peasant, robot][i], 0, 0, -8, 1, "playerthrowout");
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {

}
export { onRender, onSceneReady };

