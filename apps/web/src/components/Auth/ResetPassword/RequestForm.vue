<script setup lang="ts">
import FormInput from '../../Utils/Form/FormInput.vue'
import { useRequestResetPassword } from '~/hooks/auth/requestResetPassword'

const { email, sendRequestEmail, error } = useRequestResetPassword()

defineExpose({
    sendRequestEmail,
})
</script>

<template>
    <div>
        <FormInput v-model="email" label="Votre email" />
        <p v-if="error" class="text-error mt-4">{{ error.text }}</p>
    </div>
</template>
