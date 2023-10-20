module.exports = {
    globals: {
        MyGlobal: true,
    },
    env: {
        browser: true,
        es2021: true,
    },
    plugins: ["@stylistic"],
    parser: "@typescript-eslint/parser",
    rules: {
        "@stylistic/semi": ["error", "never"],
        "@stylistic/quotes": ["error", "single"],
        "@stylistic/indent": ["error", 4],
    },
};
