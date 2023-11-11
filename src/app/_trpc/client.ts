import { httpLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { type AppRouter } from '~/server'
import { getBaseUrl } from './utils/trpc'

// This API handler is used in CSR components
export const clientApi = createTRPCReact<AppRouter>({})
export const createTrpcClient = () =>
    clientApi.createClient({
        links: [
            httpLink({
                url: getBaseUrl() + '/api/trpc',
            }),
        ],
    })
