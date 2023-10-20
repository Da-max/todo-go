import * as colors from 'tailwindcss/colors'
import * as themeColors from '@todo-go/colors'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        '../../node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
        '../../node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                blue: colors.indigo,
                primary: themeColors['primary'],
                secondary: themeColors['secondary'],
                error: themeColors['error'],
                success: themeColors['success'],
            },
        },
    },
    plugins: [import('flowbite/plugin')],
}
