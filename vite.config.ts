import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import graphql from '@rollup/plugin-graphql'

// https://vitejs.dev/config/
export default defineConfig({
    root: 'app',
    plugins: [vue(), graphql()],
    server: {
        port: parseInt(process.env.VITE_PORT || '3000')
    }
})
