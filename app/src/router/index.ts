import { createWebHashHistory, RouteRecordRaw, createRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import auth from '../utils/auth'

declare module 'vue-router' {
    interface RouteMeta {
        loginRequired: boolean
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../views/index.vue'),
        name: 'home',
        meta: {
            loginRequired: true,
        },
        children: [
            {
                path: '/create-account',
                component: () => import('../views/signup.vue'),
                name: 'create-account',
                meta: {
                    loginRequired: false,
                },
            },
            {
                path: '/login',
                component: () => import('../views/login.vue'),
                name: 'login',
                meta: {
                    loginRequired: false,
                },
            },
            {
                path: '/confirm-account',
                component: () => import('../views/confirm-account.vue'),
                name: 'confirm-account',
                meta: {
                    loginRequired: false,
                },
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
    if (to.meta.isRequired && !userStore.isAuthenticated) {
        return {
            name: 'login',
        }
    }
})

export default router
