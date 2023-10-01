import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import graphqlPlugin from '@rollup/plugin-graphql'
import { resolve } from 'path'
import { PluginOption } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), graphqlPlugin() as PluginOption],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, './src'),
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
