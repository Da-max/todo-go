import type { RouteLocationRaw } from "vue-router";

export type NavItem = {
    title: string;
    icon?: string[];
    onClick: RouteLocationRaw | (() => void);
};

export type NavItems = NavItem[];
