'use client'

import React, { useEffect, useRef } from "react"
import SceneComponent from "../_components/SceneComponent"
import { onRender, onSceneReady } from "../_components/scene"
import { focusOnTheCrowd, focusOnThePrisoner, moveActiveCamera } from "../_components/cameraanim"
import { Engine, EngineOptions, Scene, SceneOptions } from '@babylonjs/core'

let scene : Scene;

const Game = () => {

    const reactCanvas = useRef(null)

    // set up basic engine and scene
    useEffect(() => {
        const { current: canvas } = reactCanvas

        if (!canvas) return

        const engine = new Engine(
            canvas,
            true,
        )
        scene = new Scene(engine, undefined)

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
    }, [])
    return (
        <div className="w-screen h-screen ">
            <button onClick={() =>
                focusOnThePrisoner(scene)
            }>kurwa</button>

            <button onClick={() =>
                focusOnTheCrowd(scene)
            }>kurwa</button>
            <canvas className="h-screen" ref={reactCanvas} />

        </div>
    )
}

export default Game
