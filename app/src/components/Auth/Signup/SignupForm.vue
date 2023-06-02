<script lang="ts" setup>
import FormInput from '../../Utils/Form/FormInput.vue'
import { useSignUp } from '../../../hooks/auth/signup'

const { fields, signUp, onInput, error } = useSignUp()

defineExpose({
    signUp,
})
</script>

<template>
    <form
        class="h-full text-xl flex flex-wrap flex-col xl:flex-row xl:justify-around items-center"
        action="#"
    >
        <div>
            <FormInput
                id="username"
                :value="fields.username"
                class="flex flex-col mt-4"
                type="text"
                :error="!!error"
                @input="onInput"
                >Nom d’utilisateur</FormInput
            >
            <FormInput
                id="email"
                class="flex flex-col mt-4"
                :value="fields.email"
                type="text"
                :error="!!error"
                @input="onInput"
                >Email</FormInput
            >
        </div>
        <div>
            <FormInput
                id="password"
                class="flex flex-col mt-4"
                :value="fields.password"
                type="password"
                :error="!!error"
                @input="onInput"
                >Mot de passe</FormInput
            >
            <FormInput
                id="confirmPassword"
                class="flex flex-col mt-4"
                :value="fields.confirmPassword"
                type="password"
                :error="!!error"
                @input="onInput"
                >Confirmation du mot de passe</FormInput
            >
        </div>
        <p class="text-error mt-4 p-4 min-w-full">
            {{ error?.text }}
        </p>
    </form>
</template>
