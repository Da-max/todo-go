<script setup lang="ts">
import { UserFragment } from "@todo-go/core";
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
                    <FwbBadge>Nom d’utilisateur </FwbBadge>
                    {{ user.username }}
                </p>
            </div>
            <div class="flex flex-col gap-10">
                <p class="flex">
                    <FwbBadge>Est actif</FwbBadge>
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
                    <FwbBadge>Est administrateur </FwbBadge>
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
                    <FontAwesomeIcon class="mr-2" :icon="['fas', 'pencil']" />
                    Modifier mes informations
                </FwbButton>
            </router-link>
            <router-link :to="{ name: 'profile:delete' }">
                <FwbButton color="red">
                    <FontAwesomeIcon class="mr-2" :icon="['fas', 'trash']" />
                    Supprimer mon compte
                </FwbButton>
            </router-link>
            <router-link :to="{ name: 'auth:change-password' }">
                <FwbButton color="yellow">
                    <FontAwesomeIcon class="mr-2" :icon="['fas', 'key']" />
                    Modifier mon mot de passe
                </FwbButton>
            </router-link>
        </div>
    </div>
</template>
