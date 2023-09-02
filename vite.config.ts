import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import graphqlPlugin from '@rollup/plugin-graphql'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    root: 'app',
    plugins: [vue(), graphqlPlugin() as Plugin],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, './app/src'),
        },
    },
    build: {
        sourcemap: true,
        target: 'es2020',
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'es2020',
        },
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
})
