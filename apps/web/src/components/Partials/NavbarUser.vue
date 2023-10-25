<script lang="ts" setup>
import { computed } from "vue";
import { useUserStore } from "~/stores/user";
import type { NavItems } from "~/types/nav";
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from "flowbite-vue";

const userStore = useUserStore();

const navItems = computed<NavItems>(() => {
    let items: NavItems = [];
    if (userStore.isAuthenticated) {
        items = [
            {
                icon: ["fas", "user"],
                title: "Mon profil",
                onClick: { name: "profile" },
            },
            {
                icon: ["fas", "right-from-bracket"],
                title: "Se déconnecter",
                onClick: userStore.disconnect,
            },
        ];
    } else {
        items = [
            {
                title: "Se connecter",
                onClick: { name: "login" },
            },
            {
                title: "Se créer un compte",
                onClick: { name: "create-account" },
            },
        ];
    }

    return items;
});

const dropdownText = computed(() => {
    if (userStore.isAuthenticated) {
        return userStore.user?.username ?? "Username";
    }
    return "🧑";
});
</script>

<template>
    <div ref="target">
        <FwbDropdown :text="dropdownText" placement="left">
            <FwbListGroup>
                <FwbListGroupItem v-for="item in navItems" :key="item.title">
                    <a
                        v-if="typeof item.onClick === 'function'"
                        class="flex-1"
                        href="#"
                        @click="item.onClick"
                    >
                        <FontAwesomeIcon v-if="item.icon" :icon="item.icon" />
                        {{ item.title }}</a
                    >
                    <router-link
                        v-else-if="item.onClick"
                        :to="item.onClick"
                        class="flex-1"
                    >
                        <FontAwesomeIcon v-if="item.icon" :icon="item.icon" />
                        {{ item.title }}
                    </router-link>
                </FwbListGroupItem>
            </FwbListGroup>
        </FwbDropdown>
    </div>
</template>
