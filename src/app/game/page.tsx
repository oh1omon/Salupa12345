'use client'

import { useEffect, useState } from 'react'
import { SessionState } from '~/types/game'
import ChatComponent from '../_components/ChatComponent'
import GuessComponent from '../_components/GuessComponent'
import LoadingComponent from '../_components/LoadingComponent'
import SceneComponent from '../_components/SceneComponent'
import { onRender, onSceneReady } from '../_components/scene'

const Game = () => {
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
    return (
        <div className="h-screen w-screen relative">
            <SceneComponent
                antialias
                onSceneReady={onSceneReady}
                onRender={onRender}
                engineOptions={undefined}
                adaptToDeviceRatio={undefined}
            />
            <div className="absolute top-0 left-0 z-10 flex h-screen w-screen flex-row p-5 pointer-events-none">
                <div className="w-3/5" />
                <div className="flex1-2 w-2/5 pointer-events-auto">
                    {sessionState === SessionState.WAITING_FOR_OPPONENT && (
                        <LoadingComponent />
                    )}
                    {sessionState === SessionState.GAME_IN_PROGRESS && (
                        <ChatComponent onSessionStateChange={setSessionState} />
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
