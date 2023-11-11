import { useState } from 'react'
import { SessionState } from '~/types/game'
import { throwOutAi } from './throwoutai'
import { Scene } from '@babylonjs/core'
import { focusOnThePrisoner } from './cameraanim'

interface GuessComponentProps {
    onSessionStateChange: (stage: SessionState) => void,
    scene: Scene
}

const GuessComponent = ({ onSessionStateChange, scene }: GuessComponentProps) => {
    const [result, setResult] = useState<string | null>(null)

    return (
        <div className="bg-dark-gray h-full w-full rounded-3xl p-5">
            <div className="flex h-full w-full flex-col items-center justify-center gap-5">
                {!result ? (
                    <>
                        <p>Who was that?</p>
                        <div className="flex justify-between gap-3">
                            <button
                                onClick={() =>
                                    setResult('You are wrong! That was an AI')
                                }
                                className="bg-medium-green flex-1 rounded p-4"
                            >
                                Human
                            </button>
                            <button
                                onClick={() => {
                                    setResult('Who would have guessed! That was an AI, you are right!');
                                    focusOnThePrisoner(scene);
                                    throwOutAi(scene);
                                }
                                }
                                className="flex-1 rounded bg-blue-600 p-4"
                            >
                                AI
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p>{result}</p>
                        <button className="bg-medium-green w-1/2 rounded p-4" onClick={() => onSessionStateChange(SessionState.WAITING_FOR_OPPONENT)}>Start over</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default GuessComponent
