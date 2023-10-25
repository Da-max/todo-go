import type { RouteRecordRaw } from "vue-router";

export const profileRoutes: RouteRecordRaw[] = [
    {
        name: "profile",
        path: "",
        component: () => import("~/views/profile/index.vue"),
        meta: {
            loginRequired: true,
        },
    },
    {
        name: "profile:update",
        path: "update",
        component: () => import("~/views/profile/update.vue"),
        meta: {
            loginRequired: true,
        },
    },
    {
        name: "profile:delete",
        path: "delete",
        component: () => import("~/views/profile/delete.vue"),
        meta: {
            loginRequired: true,
        },
    },
];
