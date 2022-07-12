/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/index.html', './app/src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
    purge: ['./app/index.html', './app/src/**/*.{vue,js,ts,jsx,tsx}'],
}
