import EventEmitter from 'events'
import { z } from 'zod'
import { generateValidResponse } from '../services/openai'
import { publicProcedure, router } from '../trpc'
import { constructQuestionPrompt } from '../utils'

const ee = new EventEmitter()

export const gameRouter = router({
    generate: publicProcedure
        .input(
            z.string()
        )
        .mutation(async ({ input }) => {
            if (!input) return
            const prompt = constructQuestionPrompt(input)
            if (!prompt) {
                console.error('Unexpected error while creating prompt')
                return null
            }

            const response = await generateValidResponse(prompt);

            return response
        }),
})
