import { createWebHashHistory, RouteRecordRaw, createRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import auth from '~/utils/auth'
import { authRoutes } from './routes/auth'
import { profileRoutes } from './routes/profile'

declare module 'vue-router' {
    interface RouteMeta {
        loginRequired: boolean
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '',
        component: () => import('~/views/index.vue'),
        name: 'home',
        children: [
            { path: '/auth/', children: authRoutes },
            { path: '/profile/', children: profileRoutes },
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
    if (to.meta.loginRequired && !userStore.isAuthenticated) {
        return {
            name: 'login',
        }
    }
})

export default router
