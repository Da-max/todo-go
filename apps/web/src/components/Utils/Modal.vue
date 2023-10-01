<script lang="ts" setup>
import { useTimeoutFn } from '@vueuse/shared'
import { computed, ref, watch } from 'vue'
import { Modal } from 'flowbite-vue'

type Props = {
    open: boolean
}

const props = withDefaults(defineProps<Props>(), {
    open: false,
})
const modal = ref<HTMLElement | null>(null)

const emit = defineEmits<{ (e: 'close'): void }>()

const open = computed({
    get: () => props.open,
    set: (val: boolean) => {
        if (!val) {
            emit('close')
        }
    },
})

watch(
    () => props.open,
    () => {
        if (props.open) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.removeProperty('overflowY')
            useTimeoutFn(() => {
                if (modal.value) {
                    modal.value.style.display = 'none'
                }
            }, 300)
        }
    },
)
</script>

<template>
    <Modal :class="['modal', { 'modal--close': !open }]">
        <aside class="modal__container">
            <header class="modal__header">
                <slot name="header"></slot>
                <button @click="open = false">
                    <FontAwesomeIcon :icon="['fas', 'close']" />
                </button>
            </header>
            <article class="modal__content">
                <slot name="content"></slot>
            </article>
            <footer class="modal__footer">
                <slot name="footer"></slot>
            </footer>
        </aside>
    </Modal>
</template>

<style scoped>
.modal {
    @apply h-screen flex justify-center items-center bg-secondary bg-opacity-80 z-50 absolute top-0 left-0 w-full opacity-100 transition-opacity;
}

.modal--close {
    @apply opacity-0;
}
.modal__container {
    @apply bg-gray-50 w-full min-h-min max-h-full m-4 rounded-lg shadow-lg md:w-2/4 border-2 border-primary flex flex-col;
}

.modal__header {
    @apply flex p-4 bg-secondary rounded-lg justify-between items-center border-b-primary border-b-2;
}

.modal__content {
    @apply flex-1;
}

.modal__footer {
    @apply mt-4;
}
</style>
