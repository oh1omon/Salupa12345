/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { GameSession } from '@prisma/client'
import { useEffect, useState } from 'react'
import { Game, SessionState } from '~/types/game'
import { clientApi } from '../_trpc/client'

const Chat = () => {
    const newMessageMutation = clientApi.game.add.useMutation()
    const sessionStartMutation = clientApi.game.handleSessionStart.useMutation()
    const fetchGameMutation = clientApi.game.fetchGame.useMutation()

    const [userId] = useState<number>(Math.ceil(Math.random() * 1000))
    const [game, setGame] = useState<Game | null>(null)
    const [gameSession, setGameSession] = useState<GameSession | null>(null)
    const [sessionState, setSessionState] = useState<SessionState>(
        SessionState.WAITING_FOR_SESSION
    )
    const [messageText, setMessageText] = useState('')

    useEffect(() => {
        const getGame = async (sessionId: number) => {
            const foundGame = await fetchGameMutation.mutateAsync({ sessionId })
            if (!foundGame) return
            setGame({ ...foundGame, messages: [] })
            setSessionState(SessionState.GAME_IN_PROGRESS)
        }

        const interval = setInterval(async () => {
            if (!gameSession || game) return
            if (
                sessionState === SessionState.WAITING_FOR_OPPONENT
            ) {
                await getGame(gameSession.id)
                return
            }
        }, 5000)

        // return clearInterval(interval)
    }, [gameSession, game])


    useEffect(() => {
        if (gameSession) return
        const getGameSession = async () => {
            const gameSession = await sessionStartMutation.mutateAsync({
                userId,
            })
            setSessionState(SessionState.WAITING_FOR_OPPONENT)
            setGameSession(gameSession)
        }

        void getGameSession();
    }, [gameSession])

    // const messages = clientApi.chat.infinite.useQuery(
    //     { gameId: gameId },
    //     { refetchInterval: 1 }
    // ).data

    // const sendMessage = (gameId: number, userId: number) => {
    //     if (!messageText) return
    //     const timestamp = new Date()
    //     const time = timestamp.getTime();
    //     const newMessage: Message = {
    //         senderId: userId,
    //         gameId: gameId,
    //         content: messageText,
    //         timestamp: time,
    //     }
    //     newMessageMutation.mutate({ inputMessage: newMessage, userId })
    // }

    return (
        <div className="flex h-full w-96 max-w-4xl flex-1 flex-col justify-center gap-1 md:w-full">
            {/* {messages?.map((elem) => <p key={elem.id}>{elem.content}</p>)}
            <button
                className="bg-blue-500"
                onClick={() => sendMessage(gameId, userId)}
            >
                Send message
            </button> */}
            <p>{sessionState}</p>
        </div>
    )
}

export default Chat
