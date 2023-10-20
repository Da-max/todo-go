<script setup lang="ts">
import { UserFragment } from '@todo-go/core'
import Badge from '../Utils/Badge.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Button } from 'flowbite-vue'

type Props = {
    user: UserFragment
}
defineProps<Props>()
</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="flex justify-around">
            <div class="flex flex-col gap-10">
                <p>
                    <Badge type="secondary" class="mx-2">Email</Badge>
                    {{ user.email }}
                </p>
                <p>
                    <Badge type="secondary" class="mx-2"
                        >Nom d’utilisateur</Badge
                    >
                    {{ user.username }}
                </p>
            </div>
            <div class="flex flex-col gap-10">
                <p>
                    <Badge type="secondary" class="mx-2">Est actif</Badge>
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
                <p>
                    <Badge type="secondary" class="mx-2"
                        >Est administrateur</Badge
                    >
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
                <Button>
                    <font-awesome-icon class="mr-2" :icon="['fas', 'pencil']" />
                    Modifier mes informations</Button
                >
            </router-link>
            <router-link :to="{ name: 'profile:delete' }">
                <Button color="red"
                    ><FontAwesomeIcon class="mr-2" :icon="['fas', 'trash']" />
                    Supprimer mon compte</Button
                ></router-link
            >
            <router-link :to="{ name: 'auth:change-password' }">
                <Button color="yellow"
                    ><FontAwesomeIcon class="mr-2" :icon="['fas', 'key']" />
                    Modifier mon mot de passe
                </Button>
            </router-link>
        </div>
    </div>
</template>
