'use client'

import React from "react"
import SceneComponent from "../_components/SceneComponent"
import { onRender, onSceneReady } from "../_components/scene"
import { moveActiveCamera } from "../_components/cameraanim"


const Game = () => {
    return (
        <div className="w-screen h-screen ">
            <button onClick={() =>
                moveActiveCamera(scene, {
                    alpha: 0.8,
                    beta: 0.7,
                    radius: 10,
                    target: {
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                })

            }></button>
            <SceneComponent
                antialias
                onSceneReady={onSceneReady}
                onRender={onRender}
                engineOptions={undefined}
                adaptToDeviceRatio={undefined}
                sceneOptions={undefined}
            />

        </div>
    )
}

export default Game
