<script lang="ts" setup>
import { onMounted } from 'vue'
import {
    LocationQuery,
    LocationQueryValue,
    useRoute,
    useRouter,
} from 'vue-router'
import { useConfirmAccount } from '~/hooks/auth/confirmAccount'
import Message from '~/components/Utils/Message.vue'

const { query }: { query: LocationQuery } = useRoute()
const router = useRouter()
const token: LocationQueryValue | LocationQueryValue[] = query.token
const { confirmAccount, alert, error } = useConfirmAccount()

onMounted(async () => {
    if (token && !(token instanceof Array)) {
        await confirmAccount(token)
        await router.push({ name: 'home' })
    }
})
</script>

<template>
    <Message v-if="alert" :message="alert" />
    <Message v-if="error" :message="error" />
</template>
