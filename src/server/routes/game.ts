import { observable } from '@trpc/server/observable'
import EventEmitter from 'events'
import { z } from 'zod'
import { Message, message } from '~/types/game'
import { db } from '../db'
import { publicProcedure, router } from '../trpc'

const ee = new EventEmitter()

export const gameRouter = router({
    onAdd: publicProcedure.subscription(() => {
        // return an `observable` with a callback which is triggered immediately
        return observable<Message>((emit) => {
            const onAdd = (data: Message) => {
                // emit data to client
                emit.next(data)
            }
            // trigger `onAdd()` when `add` is triggered in our event emitter
            ee.on('add', onAdd)
            // unsubscribe function when client disconnects or stops subscribing
            return () => {
                ee.off('add', onAdd)
            }
        })
    }),
    add: publicProcedure
        .input(z.object({ newMessage: message }))
        .mutation(async ({ input }) => {
            const { newMessage } = input
            const savedMessage = await db.message.create({
                data: {
                    ...newMessage,
                },
            })
            ee.emit('add', savedMessage)
            return savedMessage
        }),
    infinite: publicProcedure
        .input(z.object({ gameId: z.number() }))
        .query(async ({ input }) => {
            const { gameId } = input
            const messages = await db.message.findMany({
                where: {
                    gameId: gameId,
                },
            })
            return messages
        }),
    // Assign user to some session (new or existing)
    handleSessionStart: publicProcedure
        .input(z.object({ userId: z.number() }))
        .mutation(async ({ input }) => {
            const { userId } = input

            const existingSession = await db.gameSession.findFirst({
                where: {
                    playerId: userId,
                    gameId: null,
                    opponentId: null
                },
            })

            if (existingSession) return existingSession

            const gameSession = await db.gameSession.findFirst({
                where: {
                    opponentId: null,
                    isVerusPlayer: true,
                },
            })

            if (gameSession && gameSession.playerId === userId) {
                return gameSession;
            }

            // session found, assign user as an opponent and return session
            if (gameSession && gameSession.playerId !== userId) {
                const updatedGameSession = await db.gameSession.update({
                    where: {
                        id: gameSession.id,
                        gameId: null,
                        opponentId: null
                    },
                    data: {
                        opponentId: userId,
                    },
                })
                return updatedGameSession
            }

            // if session not found create a new one and return it
            const createdSession = await db.gameSession.create({
                data: {
                    playerId: userId,
                    isVerusPlayer: true,
                },
            })
            return createdSession
        }),
    // check session state, wait for an opponent, create game
    fetchGame: publicProcedure
        .input(z.object({ sessionId: z.number() }))
        .mutation(async ({ input }) => {

            const { sessionId } = input

            // check session state
            const gameSession = await db.gameSession.findFirst({
                where: {
                    id: sessionId,
                },
            })

            // session not fulfilled, waiting
            if (!gameSession?.opponentId) return null

            // return game if it was already created by another user
            if (gameSession.gameId) {
                const game = await db.game.findFirst({
                    where: {
                        id: gameSession.gameId,
                    },
                })
                return game
            }

            // create game if not exist and return it
            const game = await db.game.create({
                data: {
                    isGuessMade: false,
                    playerId: gameSession.playerId,
                    opponentId: gameSession.opponentId,
                },
            })

            await db.gameSession.update({
                where: {
                    id: sessionId,
                },
                data: {
                    gameId: game.id
                }
            })

            return game
        }),
})
