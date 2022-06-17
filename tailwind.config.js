module.exports = {
    content: [
        './app/index.html',
        './app/src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    mode: 'jit',
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {}
    },
    variants: {
        extend: {}
    },
    plugins: [],
    purge: ['./app/index.html', './app/src/**/*.{vue,js,ts,jsx,tsx}']
}
