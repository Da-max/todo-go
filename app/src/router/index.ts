import { createWebHashHistory, RouteRecordRaw, createRouter } from 'vue-router'
import AppVue from '../App.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/create-account',
        component: () => import('../views/create-account.vue'),
        name: 'create-account',
    },
    {
        path: '/login',
        component: () => import('../views/login.vue'),
        name: 'login',
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
