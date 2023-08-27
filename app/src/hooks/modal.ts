import { isRef, MaybeRef, ref } from 'vue'

export const useModal = (initialValue: MaybeRef<boolean> = false) => {
    const modalOpen = isRef(initialValue) ? initialValue : ref(initialValue)

    const modalClose = () => {
        modalOpen.value = false
    }

    return {
        modalOpen,
        modalClose,
    }
}
