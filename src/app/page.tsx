'use client'

import SceneComponent from "./_components/SceneComponent"
import { onRender, onSceneReady } from "./_components/scenespace"

const Home = () => {
    return (
        <div className="flex h-full w-100 flex-1 flex-col justify-center gap-1 md:w-full">
            <header className='text-center justify-center absolute m-auto left-0 right-0 top-8 '>
                <h1 className="text-4xl">Robot<span className='text-emerald-500'>Guesser</span></h1>
                <h3>Guess who you are chatting with and win prizes!</h3>
            </header>
            <SceneComponent
                antialias
                onSceneReady={onSceneReady}
                onRender={onRender}
                engineOptions={undefined} adaptToDeviceRatio={undefined} sceneOptions={undefined}            />
            <div className='text-center flex justify-center absolute m-auto left-0 right-0 bottom-8'>
                <button className='border mr-4 p-2 rounded-lg border-emerald-500'>Become the guesser</button>
                <button className='border p-2 rounded-lg border-emerald-500'>Play as the robot</button>
            </div>
        </div>
    )
}

export default Home
