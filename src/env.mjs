import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        DATABASE_URL: z
            .string(),
        NODE_ENV: z
            .string(),
        SERVER_URL: z
        .string(),
        OPEN_AI_KEY: z.string(),
        OPEN_AI_PROMPT: z.string()
    },


    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        SERVER_URL:
            process.env.SERVER_URL,
        OPEN_AI_KEY: process.env.OPEN_AI_KEY,
        OPEN_AI_PROMPT: process.env.OPEN_AI_PROMPT

    },
})
