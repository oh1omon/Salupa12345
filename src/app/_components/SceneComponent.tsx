import { Engine, EngineOptions, Scene, SceneOptions, WebGPUEngine } from '@babylonjs/core'
import { useEffect, useRef } from 'react'

interface BabylonSceneProps {
    antialias?: boolean
    engineOptions?: EngineOptions
    adaptToDeviceRatio?: boolean
    sceneOptions?: SceneOptions
    onRender?: (scene: Scene) => void
    onSceneReady: (scene: Scene) => void
}
const SceneComponent = ({
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
}: BabylonSceneProps) => {
    const reactCanvas = useRef(null)

    // set up basic engine and scene
    useEffect(() => {
        const initAll = async () => {

            const { current: canvas } = reactCanvas

            if (!canvas) return

            let engine: any;
            engine = new Engine(canvas, false)
            const scene = new Scene(engine, sceneOptions)
            if (scene.isReady()) {
                onSceneReady(scene)
            } else {
                scene.onReadyObservable.addOnce((scene) => onSceneReady(scene))
            }

            engine.runRenderLoop(() => {
                if (typeof onRender === 'function') onRender(scene)
                scene.render()
            })

            const resize = () => {
                scene.getEngine().resize()
            }

            if (window) {
                window.addEventListener('resize', resize)
            }

            return () => {
                scene.getEngine().dispose()

                if (window) {
                    window.removeEventListener('resize', resize)
                }
            }

        }
        initAll();
    }, [
    ])

    return <canvas className="h-screen" ref={reactCanvas} {...rest} />
}
export default SceneComponent
