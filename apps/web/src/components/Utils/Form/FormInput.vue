<script lang="ts" setup>
import { useAttrs } from "vue";
import { FwbInput } from "flowbite-vue";
import { useVModel } from "@vueuse/core";
import { useField } from "vee-validate";

type Props = {
    error?: boolean;
    name?: string;
};

type Emits = {
    (e: "update:error", value: boolean): void;
};

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
    name: "test",
});
const attrs = useAttrs();

const error = useVModel(props, "error", emit);
const { value, errors } = useField<string>(() => props.name);
</script>
<template>
    <FwbInput
        v-model="value"
        :class="{ '!border-error': errors.length > 0 }"
        :name="name"
        :validation-status="errors.length > 0 ? 'error' : undefined"
        v-bind="{ ...attrs }"
    >
        <template v-for="(_, slot) in $slots" #[slot]>
            <slot :name="slot"></slot>
        </template>
        <template v-if="errors.length > 0" #validationMessage>
            {{ errors[0] }}
        </template>
    </FwbInput>
</template>
