<script lang="ts" setup>
import type { UserFragment } from "@todo-go/core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { FwbButton, FwbBadge } from "flowbite-vue";

type Props = {
    user: UserFragment;
};
defineProps<Props>();
</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="flex justify-around">
            <div class="flex flex-col gap-10">
                <p class="flex">
                    <FwbBadge>Email</FwbBadge>
                    {{ user.email }}
                </p>
                <p class="flex">
                    <FwbBadge>Nom d’utilisateur</FwbBadge>
                    {{ user.username }}
                </p>
            </div>
            <div class="flex flex-col gap-10">
                <p class="flex">
                    <FwbBadge>Actif</FwbBadge>
                    <FontAwesomeIcon
                        v-if="user.isActive"
                        :icon="['fas', 'check']"
                        class="text-success"
                    />
                    <FontAwesomeIcon
                        v-else
                        :icon="['fas', 'close']"
                        class="text-error"
                    />
                </p>
                <p class="flex">
                    <FwbBadge>Administrateur⋅ice</FwbBadge>
                    <FontAwesomeIcon
                        v-if="user.isAdmin"
                        :icon="['fas', 'check']"
                        class="text-success"
                    />
                    <FontAwesomeIcon
                        v-else
                        :icon="['fas', 'close']"
                        class="text-error"
                    />
                </p>
            </div>
        </div>
        <div class="mt-10 flex justify-around gap-8 flex-wrap">
            <router-link :to="{ name: 'profile:update' }">
                <FwbButton>
                    <FontAwesomeIcon :icon="['fas', 'pencil']" class="mr-2" />
                    Modifier mes informations
                </FwbButton>
            </router-link>
            <router-link :to="{ name: 'profile:delete' }">
                <FwbButton color="red">
                    <FontAwesomeIcon :icon="['fas', 'trash']" class="mr-2" />
                    Supprimer mon compte
                </FwbButton>
            </router-link>
            <router-link :to="{ name: 'auth:change-password' }">
                <FwbButton color="yellow">
                    <FontAwesomeIcon :icon="['fas', 'key']" class="mr-2" />
                    Modifier mon mot de passe
                </FwbButton>
            </router-link>
        </div>
    </div>
</template>
