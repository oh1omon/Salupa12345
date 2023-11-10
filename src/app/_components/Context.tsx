import { type ReactNode } from 'react'
import TrpcProvider from '../_trpc/components/TrpcProvider'

const Context = ({ children }: { children: ReactNode }) => {
    return (
            <TrpcProvider>{children}</TrpcProvider>
    )
}

export default Context
