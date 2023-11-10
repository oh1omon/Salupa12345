'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

import { createTrpcClient, clientApi } from '../client'

const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({}))
    const [trpcClient] = useState(createTrpcClient())
    return (
        <clientApi.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </clientApi.Provider>
    )
}

export default TrpcProvider
