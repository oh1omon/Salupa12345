'use client'
import { onRender, onSceneReady } from './scene.ts'
import SceneComponent from './SceneComponent'

const Home = () => {
    return (
        <div className="flex h-full w-96 max-w-4xl flex-1 flex-col justify-center gap-1 md:w-full">
            <header className='text-center'>
                <h1 className="text-4xl">Robot<span className='text-emerald-500'>Guesser</span></h1>
                <h3>Guess who you are chatting with and win prizes!</h3>
            </header>
            <SceneComponent
                antialias
                onSceneReady={onSceneReady}
                onRender={onRender}
                id="my-canvas"
            />
            <div className='text-center'>
                <button>Become the guesser</button>
                <button>Play as the robot</button>
            </div>
        </div>
    )
}

export default Home
