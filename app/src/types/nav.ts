import { RouteLocationRaw } from 'vue-router'

export type NavItem = {
    title: string
    onClick: RouteLocationRaw | (() => void)
}

export type NavItems = NavItem[]
