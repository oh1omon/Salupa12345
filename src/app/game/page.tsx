'use client'

import { Engine, Scene } from '@babylonjs/core'
import { useEffect, useRef, useState } from 'react'
import { SessionState } from '~/types/game'
import ChatComponent from '../_components/ChatComponent'
import GuessComponent from '../_components/GuessComponent'
import LoadingComponent from '../_components/LoadingComponent'
import { focusOnTheCrowd, focusOnThePrisoner } from '../_components/cameraanim'
import { onRender, onSceneReady } from '../_components/scene'

let scene: Scene

const Game = () => {
    const reactCanvas = useRef(null)

    const [sessionState, setSessionState] = useState<SessionState>(
        SessionState.WAITING_FOR_OPPONENT
    )

    useEffect(() => {
        if (sessionState === SessionState.WAITING_FOR_OPPONENT) {
            setTimeout(() => {
                setSessionState(SessionState.GAME_IN_PROGRESS)
            }, 5000)
        }
    }, [sessionState])

    // set up basic engine and scene
    useEffect(() => {
        const { current: canvas } = reactCanvas

        if (!canvas) return

        const engine = new Engine(canvas, true)
        scene = new Scene(engine, undefined)

        if (scene.isReady()) {
            void onSceneReady(scene)
        } else {
            scene.onReadyObservable.addOnce((scene) => void onSceneReady(scene))
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

    const onResponderChange = (isAiAnswering: boolean) => {
        isAiAnswering ? focusOnTheCrowd(scene) : focusOnThePrisoner(scene)
    }

    return (
        <div className="relative h-screen w-screen">
            <canvas className="h-screen" ref={reactCanvas} />
            <div className="pointer-events-none absolute left-0 top-0 z-10 flex h-screen w-screen flex-row p-5">
                <div className="w-3/5">
                    <div className="flex w-fit flex-col rounded bg-neutral-800 p-3 text-sm font-medium">
                        <p>
                            You have an opportunity to ask 3 questions from your
                            opponent.
                        </p>
                        <p>
                            Then you will need to guess if it was an AI or a
                            fellow human being.
                        </p>
                        <p>
                            Note: Give your opponent some time to answer the
                            question.
                        </p>
                    </div>
                </div>
                <div className="flex1-2 pointer-events-auto w-2/5">
                    {sessionState === SessionState.WAITING_FOR_OPPONENT && (
                        <LoadingComponent />
                    )}
                    {sessionState === SessionState.GAME_IN_PROGRESS && (
                        <ChatComponent
                            onSessionStateChange={setSessionState}
                            onResponderChange={onResponderChange}
                        />
                    )}
                    {sessionState === SessionState.MAKE_GUESS && (
                        <GuessComponent
                            onSessionStateChange={setSessionState}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Game
