import { ref } from 'vue'

export function useUtils() {
    const loading = ref<boolean>(false)

    function startLoading() {
        loading.value = true
    }

    function endLoading() {
        loading.value = false
    }

    return {
        loading,
        startLoading,
        endLoading,
    }
}
