import { type Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundColor: {
                'dark-gray': '#282828',
                'medium-gray': '#474747',
                'light-gray': '#CCCCCC',
                'lighter-gray': '#D9D9D9',
                'medium-green': '#00CF53',
            }
        },
    },
    plugins: [],
} satisfies Config
