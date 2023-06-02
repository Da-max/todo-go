<script lang="ts" setup>
import { useLogin } from '../../../hooks/auth/login'
import FormInput from '../../Utils/Form/FormInput.vue'

const { fields, login, error, onInput } = useLogin()

defineExpose({
    login,
})
</script>
<template>
    <form
        action="#"
        class="h-full text-xl flex flex-col justify-center items-center"
        @keyup.enter="login"
    >
        <FormInput
            id="username"
            class="flex flex-col mt-4"
            :value="fields.username"
            type="text"
            :error="!!error"
            @input="onInput"
            >Nom d’utilisateur
        </FormInput>
        <FormInput
            id="password"
            class="flex flex-col mt-4"
            :value="fields.password"
            type="password"
            :error="!!error"
            @input="onInput"
            >Mot de passe
        </FormInput>
        <p class="text-error mt-4">
            {{ error?.text }}
        </p>
    </form>
</template>
