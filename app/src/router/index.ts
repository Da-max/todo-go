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
                path: '/auth/create-account',
                component: () => import('../views/signup.vue'),
                name: 'create-account',
                meta: {
                    loginRequired: false,
                },
            },
            {
                path: '/auth/login',
                component: () => import('../views/login.vue'),
                name: 'login',
                meta: {
                    loginRequired: false,
                },
            },
            {
                path: '/auth/confirm-account',
                component: () => import('../views/confirm-account.vue'),
                name: 'confirm-account',
                meta: {
                    loginRequired: false,
                },
            },
            {
                name: 'profile',
                path: '/profile',
                component: () => import('../views/profile.vue'),
                meta: {
                    loginRequired: true,
                },
            },
            {
                name: 'request-reset-password',
                path: '/auth/request-reset-password',
                component: () => import('../views/request-reset-password.vue'),
                meta: {
                    loginRequired: false,
                },
            },
            {
                name: 'reset-password',
                path: '/auth/reset-password',
                component: () => import('../views/reset-password.vue'),
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
