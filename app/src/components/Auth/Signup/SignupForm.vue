<script lang="ts" setup>
import FormInput from '../../Utils/Form/FormInput.vue'
import { useSignUp } from '../../../hooks/auth/signup'

const { fields, signUp, onInput, error } = useSignUp()

defineExpose({
    signUp,
})
</script>

<template>
    <form class="signup-form" action="#">
        <div>
            <FormInput
                :value="fields.username"
                @input="onInput"
                id="username"
                class="signup-form__field"
                type="text"
                :error="!!error"
                >Nom d’utilisateur</FormInput
            >
            <FormInput
                class="signup-form__field"
                :value="fields.email"
                @input="onInput"
                id="email"
                type="text"
                :error="!!error"
                >Email</FormInput
            >
        </div>
        <div>
            <FormInput
                class="signup-form__field"
                :value="fields.password"
                @input="onInput"
                id="password"
                type="password"
                :error="!!error"
                >Mot de passe</FormInput
            >
            <FormInput
                class="signup-form__field"
                :value="fields.confirmPassword"
                @input="onInput"
                id="confirmPassword"
                type="password"
                :error="!!error"
                >Confirmation du mot de passe</FormInput
            >
        </div>
        <p class="signup-form__error">
            {{ error?.text }}
        </p>
    </form>
</template>

<style scoped>
.signup-form {
    @apply h-full text-xl flex flex-wrap flex-col xl:flex-row xl:justify-around items-center;
}

.signup-form__field {
    @apply flex flex-col mt-4;
}

.signup-form__error {
    @apply text-error mt-4 p-4 min-w-full;
}
</style>
