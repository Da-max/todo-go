import {
    createWebHashHistory,
    RouteRecordRaw,
    createRouter,
    RouteLocationNormalized,
} from 'vue-router'
import { useUserStore } from '../stores/user'
import auth from '../utils/auth'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../views/index.vue'),
        name: 'home',
        children: [
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
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeResolve(async (to) => {
    const userStore = useUserStore()
    if (auth.token && !userStore.isAuthenticated) {
        await userStore.getCurrent()
    }
    if (
        ['login', 'create-account'].findIndex((v) => v === to.name) === -1 &&
        !userStore.isAuthenticated
    ) {
        return {
            name: 'login',
        }
    }
})

export default router
