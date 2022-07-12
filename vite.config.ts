import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import graphqlPlugin from '@rollup/plugin-graphql'

// https://vitejs.dev/config/
export default defineConfig({
    root: 'app',
    plugins: [vue(), graphqlPlugin()],
    build: {
        sourcemap: true,
    },
})
