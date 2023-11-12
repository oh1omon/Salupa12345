import {
    AbstractMesh,
    Color4,
    CubeTexture,
    FlyCamera,
    HemisphericLight,
    Mesh,
    Nullable,
    Scene,
    SceneLoader,
    Vector3
} from '@babylonjs/core'
import '@babylonjs/loaders/glTF'
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

let rocket: AbstractMesh
let frame = 0

const max_angle = (2 * Math.PI * 30) / 360
let x_start: Number
let angle = 0.0
let angleMultiplier: Number = 1
let envTexture: CubeTexture
let angle_y = 0.0
let back_mesh: Nullable<Mesh>

const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new FlyCamera('camera1', new Vector3(0, 1, -3), scene)
    envTexture = new CubeTexture('space', scene)
    //var envTexture = new CubeTexture('space', scene)
    back_mesh = scene.createDefaultSkybox(envTexture, true, 1000)
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

    SceneLoader.ImportMesh(
        '',
        'animations/',
        'rocket.glb',
        scene,
        function (newMeshes) {
            // Set the target of the camera to the first imported mesh

            if (newMeshes[0])
                rocket = newMeshes[0]

            rocket.position.z = rocket.position.z + 140
            rocket.position.y = rocket.position.y + 1
            rocket.rotate(Vector3.Right(), Math.PI / 4)
            // Set the scaling of the root mesh to make the object smaller
            rocket.scaling.scaleInPlace(0.15)
        }
    )
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {
    if (rocket) {
        frame += 1
        // Update the z position based on constant speed
        // rocket.position.z += 0.25

        // Update the x position based on the angle
        //const xOffset = angleMultiplier * speed * Math.cos(angle)
        /* angle = angle + (angleMultiplier * Math.PI) / (30 * 20)
        if (angle >= Math.PI / 4) {
			//rocket.rotate(Vector3.Right(), (angleMultiplier * Math.PI) / 2)
            angleMultiplier = -1
        } else if (angle <= (-1 * Math.PI) / 4) {
			//rocket.rotate(Vector3.Down(), (angleMultiplier * Math.PI) / 2)
            angleMultiplier = 1
        }*/

        const fps = 30
        const period = 12 // seconds

        const max_displacement = 100
        rocket.position.x =
            max_displacement * Math.sin((frame * 2 * Math.PI) / (period * fps))

        const max_angle = Math.PI / 12
        rocket.rotation = new Vector3(
            -0.3,
            0,
            -1 * max_angle * Math.cos((frame * 2 * Math.PI) / (period * fps))
        )
        //const rotateSpeedZ = 0.01 // Adjust the rotation speed as needed
        //const skybox = scene.getMeshByName('skyBox')

        if(back_mesh)
        back_mesh.rotate(Vector3.Right(), Math.PI / 400)

        // Check if the skybox mesh exists
        /*if (skybox) {
            // Attach a rotation animation to the skybox
            const rotateAnimation = new Animation(
                'rotateSkybox',
                'rotation.y',
                30,
                Animation.ANIMATIONTYPE_FLOAT,
                Animation.ANIMATIONLOOPMODE_CYCLE
            )

            // Define keyframes for the rotation animation
            const keyFrames = [
                { frame: 0, value: 0 },
                { frame: 30, value: 2 * Math.PI }, // Adjust the frame and value as needed
            ]

            // Set the keyframes
            rotateAnimation.setKeys(keyFrames)

            // Attach the animation to the skybox
            skybox.animations = [rotateAnimation]

            // Run the animation
            scene.beginAnimation(skybox, 0, 30, true)
        }*/
    }
}

export { onRender, onSceneReady }

