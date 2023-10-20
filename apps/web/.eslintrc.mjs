export default {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "@todo-go",
        "plugin:vue/base",
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-strongly-recommended",
        "plugin:vue/vue3-recommended",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module",
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
    },
};
