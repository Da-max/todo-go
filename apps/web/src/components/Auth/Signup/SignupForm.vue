<script lang="ts" setup>
import FormInput from '../../Utils/Form/FormInput.vue'
import { useSignUp } from '~/hooks/auth/signup'
import { computed, ref } from 'vue'

const { fields, signUp, onInput, error } = useSignUp()

const errorValue = ref<boolean>(false)

const errorComputed = computed<boolean>({
    get: () => errorValue.value || !!error.value,
    set: (newError: boolean) => {
        errorValue.value = newError
    },
})

defineExpose({
    signUp,
})
</script>

<template>
    <form
        class="h-full text-xl flex flex-wrap flex-col xl:flex-row xl:justify-around items-center gap-8"
        action="#"
    >
        <div class="flex flex-col gap-8">
            <FormInput
                v-model:error="errorComputed"
                v-model="fields.username"
                :error="!!error"
                label="Nom d’utilisateur"
            ></FormInput>
            <FormInput
                v-model:error="errorComputed"
                v-model="fields.email"
                label="Email"
                type="email"
                :error="!!error"
            />
        </div>
        <div class="flex flex-col gap-8">
            <FormInput
                v-model:error="errorComputed"
                v-model="fields.password"
                type="password"
                :error="!!error"
                label="Mot de passe"
            />
            <FormInput
                v-model:error="errorComputed"
                v-model="fields.confirmPassword"
                type="password"
                :error="!!error"
                label="Confirmation du mot de passe"
                @input="onInput"
            />
        </div>
        <p v-if="error?.text" class="text-error mt-4 p-4 min-w-full">
            {{ error?.text }}
        </p>
    </form>
</template>
