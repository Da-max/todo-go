const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/index.html', './app/src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: colors.indigo[700],
                secondary: colors.blue[100],
                error: colors.red[500],
                success: colors.green[500],
            },
        },
    },
    plugins: [],
}
