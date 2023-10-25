<script lang="ts" setup>
import { FwbButton } from "flowbite-vue";

export type Props = {
    actionDisabled: boolean;
};

export type Emits = {
    (e: "action"): void;
    (e: "cancel"): void;
};

const emits = defineEmits<Emits>();
withDefaults(defineProps<Props>(), {
    actionDisabled: false,
});
</script>

<template>
    <div class="gap-8 justify-center flex">
        <FwbButton
            v-if="$slots.action"
            :disabled="actionDisabled"
            @click="emits('action')"
        >
            <slot name="action" />
        </FwbButton>
        <FwbButton
            v-if="$slots.cancel"
            color="alternative"
            @click="emits('cancel')"
        >
            <slot name="cancel" />
        </FwbButton>
    </div>
</template>
