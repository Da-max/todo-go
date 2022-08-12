<script lang="ts" setup>
import { useLogin } from '../../../hooks/auth/login'
import FormInput from '../../Utils/Form/FormInput.vue'

const { fields, login, error, onInput } = useLogin()

defineExpose({
    login,
})
</script>
<template>
    <form action="#" @keyup.enter="login" class="login-form">
        <FormInput
            class="login-form__field"
            :value="fields.username"
            @input="onInput"
            id="username"
            type="text"
            :error="!!error"
            >Nom d’utilisateur</FormInput
        >
        <FormInput
            class="login-form__field"
            :value="fields.password"
            @input="onInput"
            id="password"
            type="password"
            :error="!!error"
            >Mot de passe</FormInput
        >
        <p class="login-form__error">
            {{ error?.text }}
        </p>
    </form>
</template>

<style scoped>
.login-form {
    @apply h-full text-xl flex flex-col justify-center items-center;
}

.login-form__field {
    @apply flex flex-col mt-4;
}

.login-form__error {
    @apply text-error mt-4;
}
</style>
