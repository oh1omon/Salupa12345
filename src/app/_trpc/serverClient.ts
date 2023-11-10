import { httpBatchLink } from '@trpc/client'
import { appRouter } from '~/server'
import { getBaseUrl } from './utils/trpc'

// This API handler is used in SSR components
export const serverApi = appRouter.createCaller({
    links: [
        httpBatchLink({
            url: getBaseUrl() + '/api/trpc',
        }),
    ],
})
