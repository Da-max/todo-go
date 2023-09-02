<script lang="ts" setup>
import Todo from '../components/Todo/Todo.vue'
import { Alert } from 'flowbite-vue'
import { useUserStore } from '../stores/user'
import { useRequestConfirmAccount } from '../hooks/auth/requestConfirmAccount'
import { storeToRefs } from 'pinia'

const { user, isAuthenticated } = storeToRefs(useUserStore())
const { requestConfirmAccount, error } = useRequestConfirmAccount()
</script>

<template>
    <div class="bg-gray-100 flex flex-col">
        <Alert
            v-if="isAuthenticated && user && !user.isActive"
            class="mb-8"
            type="warning"
            :inline="false"
            title="Confirmer votre email"
        >
            <p class="text-center">
                Attention !
                <span class="font-bold"
                    >Votre compte n’est pas encore actif</span
                >, pour l’activer, vous devez cliquer sur le lien envoyé à
                l’adresse <span class="font-bold">{{ user.email }}</span
                >. Si vous n’avez pas reçu le mail,
                <a
                    href="#"
                    class="font-medium text-primary dark:text-primary hover:underline"
                    @click.prevent="requestConfirmAccount"
                    >vous pouvez cliquer ici afin de renvoyer un mail</a
                >.
            </p>
        </Alert>

        <Alert v-if="error" type="danger">
            {{ error.text }}
        </Alert>
        <Todo />
        <RouterView />
    </div>
</template>
