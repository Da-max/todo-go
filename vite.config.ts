import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import graphqlPlugin from '@rollup/plugin-graphql'

// https://vitejs.dev/config/
export default defineConfig({
    root: 'app',
    plugins: [vue(), graphqlPlugin()],
    server: {
        port: 3000,
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
})
