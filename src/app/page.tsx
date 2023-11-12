'use client'

import { useRouter } from "next/navigation"
import SceneComponent from "./_components/SceneComponent"
import { onRender, onSceneReady } from "./_components/scenespace"

const Home = () => {

    const router = useRouter()
    return (
        <div className="flex h-full w-full flex-col justify-center">
            <header className='text-center justify-center absolute m-auto left-0 right-0 top-8 '>
                <h1 className="text-4xl">Robo<span className='text-blue-600'>Guesser</span></h1>
                <h3 className='mx-8 mt-4'>It's year 2137. People have started integrating with AI a couple of centuries ago, but nowadays, it has gone to the point where people can look like robots and robots can look like humans.
                    You've been mistaken for a robo-criminal who has done some disgraceful things on a <span className='text-blue-600'>space ship</span> and is now sentenced to capital punishment. Even if you may not look like one. Prove you're a human and get your freedom or become the crowd who is deciding you fate.</h3>
            </header>
            <SceneComponent
                antialias
                onSceneReady={onSceneReady}
                onRender={onRender}
                engineOptions={undefined}
                adaptToDeviceRatio={undefined}
                sceneOptions={undefined}
            />
            <div className="absolute bottom-8 left-0 right-0 m-auto flex justify-center text-center">
                <button type="button" className="mr-4 rounded-lg border border-blue-600 p-2" onClick={() => router.push('/game')}>
                    Become the guessing crowd
                </button>
                <button className="disabled rounded-lg border border-gray-600 text-gray-400 p-2">
                    Play the prisoner, prove you're a human*
                </button>
            </div>
            <div className="bottom-8 right-4 absolute">
                *WIP feature
            </div>
        </div>
    )
}

export default Home
