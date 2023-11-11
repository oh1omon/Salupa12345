'use client'
import { onRender, onSceneReady } from './scene.ts'
import SceneComponent from './SceneComponent'

const Home = () => {
    return (
        <div className="flex h-full w-96 max-w-4xl flex-1 flex-col justify-center gap-1 md:w-full">
            <p>Hello</p>
            <SceneComponent
                antialias
                onSceneReady={onSceneReady}
                onRender={onRender}
                id="my-canvas"
            />
        </div>
    )
}

export default Home
