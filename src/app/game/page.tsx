'use client'

import React from "react"
import SceneComponent from "../_components/SceneComponent"
import { onRender, onSceneReady } from "../_components/scene"


const Game = () => {
    return (
        <div className="w-screen h-screen ">

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
