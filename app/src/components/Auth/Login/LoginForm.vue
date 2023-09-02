<script lang="ts" setup>
import { useLogin } from '../../../hooks/auth/login'
import FormInput from '../../Utils/Form/FormInput.vue'
import { computed, ref } from 'vue'

const { fields, login, error } = useLogin()

const errorValue = ref(false)
const errorComputed = computed({
    get: () => {
        return errorValue.value || !!error.value
    },
    set: (newError) => {
        errorValue.value = newError
    },
})

defineExpose({
    login,
})
</script>
<template>
    <form
        action="#"
        class="h-full text-md flex flex-col justify-center mx-20 mt-8 gap-8"
        @keyup.enter="login"
    >
        <FormInput
            v-model="fields.username"
            v-model:error="errorComputed"
            type="text"
            label="Nom d’utilisateur"
        />

        <FormInput
            v-model="fields.password"
            v-model:error="errorComputed"
            type="password"
            label="Mot de passe"
        >
        </FormInput>
        <p class="text-error my-4">
            {{ error?.text }}
        </p>
    </form>
</template>
