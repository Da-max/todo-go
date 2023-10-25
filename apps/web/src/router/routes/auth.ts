import type { RouteRecordRaw } from "vue-router";

export const authRoutes: RouteRecordRaw[] = [
    {
        path: "create-account",
        component: () => import("~/views/auth/signup.vue"),
        name: "create-account",
        meta: {
            loginRequired: false,
        },
    },
    {
        path: "login",
        component: () => import("~/views/auth/login.vue"),
        name: "login",
        meta: {
            loginRequired: false,
        },
    },
    {
        path: "confirm-account",
        component: () => import("~/views/auth/confirm-account.vue"),
        name: "confirm-account",
        meta: {
            loginRequired: false,
        },
    },
    {
        name: "request-reset-password",
        path: "request-reset-password",
        component: () => import("~/views/auth/request-reset-password.vue"),
        meta: {
            loginRequired: false,
        },
    },
    {
        name: "reset-password",
        path: "reset-password",
        component: () => import("~/views/auth/reset-password.vue"),
        meta: {
            loginRequired: false,
        },
    },
    {
        name: "auth:change-password",
        path: "change-password",
        component: () => import("~/views/auth/change-password.vue"),
        meta: {
            loginRequired: true,
        },
    },
];
