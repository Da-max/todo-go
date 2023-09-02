import { RouteRecordRaw } from 'vue-router'

export const profileRoutes: RouteRecordRaw[] = [
    {
        name: 'profile',
        path: '',
        component: () => import('~/views/profile/index.vue'),
        meta: {
            loginRequired: true,
        },
    },
    {
        name: 'profile:update',
        path: 'update',
        component: () => import('~/views/profile/update.vue'),
        meta: {
            loginRequired: true,
        },
    },
]
