import Context from './_components/Context'

import { onRender, onSceneReady } from "./_components/scene"
import type { Metadata } from 'next'

// These styles apply to every route in the application
import '../styles/globals.css'

import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
    weight: ['600'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'RoboGuesser',
    description: '1 vs 1 online touring test-like game',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" className={urbanist.className}>
            <body className="relative m-0 flex min-h-screen w-full flex-col overflow-x-hidden bg-neutral-950 text-neutral-50">
                <Context>
                    <div className="flex flex-1 flex-col items-center justify-center">
                        <div className="flex w-full flex-1 flex-col items-center justify-center">
                            {children}
                        </div>
                    </div>
                </Context>
            </body>
        </html>
    )
}

export default RootLayout
