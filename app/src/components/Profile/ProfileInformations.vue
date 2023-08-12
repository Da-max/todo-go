<script setup lang="ts">
import { UserFragment } from '../../types/generated'
import Badge from '../Utils/Badge.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

type Props = {
    user: UserFragment
}
defineProps<Props>()
</script>

<template>
    <div class="flex justify-around">
        <div class="flex flex-col gap-10">
            <p>
                <Badge type="secondary" class="mx-2">Email</Badge>
                {{ user.email }}
            </p>
            <p>
                <Badge type="secondary" class="mx-2">Nom d’utilisateur</Badge>
                {{ user.username }}
            </p>
        </div>
        <div class="flex flex-col gap-10">
            <p>
                <Badge type="secondary" class="mx-2">Est actif</Badge>
                <FontAwesomeIcon
                    v-if="user.isActive"
                    :icon="['fas', 'check']"
                />
                <FontAwesomeIcon v-else :icon="['fas', 'close']" />
            </p>
            <p>
                <Badge type="secondary" class="mx-2">Est administrateur</Badge>
                <FontAwesomeIcon v-if="user.isAdmin" :icon="['fas', 'check']" />
                <FontAwesomeIcon v-else :icon="['fas', 'close']" />
            </p>
        </div>
    </div>
</template>

<style scoped></style>
