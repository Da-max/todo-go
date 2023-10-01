const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                blue: colors.indigo,
                primary: colors.indigo[700],
                secondary: colors.blue[100],
                error: colors.red[500],
                success: colors.green[500],
            },
        },
    },
    plugins: [require('flowbite/plugin')],
}
