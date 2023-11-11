import { gameRouter } from './routes/game'
import { router } from './trpc'

export const appRouter = router({
    game: gameRouter
})

export type AppRouter = typeof appRouter
