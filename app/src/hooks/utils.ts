import { ref } from 'vue'
import { AlertTypes, ErrorTypes, IAlert, IError } from '../types/utils'

export function useUtils() {
    const loading = ref<boolean>(false)
    const error = ref<IError | null>(null)
    const alert = ref<IAlert | null>(null)

    function startLoading() {
        loading.value = true
    }

    function endLoading() {
        loading.value = false
    }

    function setAlert(type: AlertTypes, text: string) {
        alert.value = {
            id: new Date().toDateString(),
            text,
            type,
        }
    }

    function setError(type: ErrorTypes, text: string) {
        error.value = {
            id: new Date().toDateString(),
            type,
            text,
        }
    }
    return {
        alert,
        endLoading,
        error,
        loading,
        startLoading,
        setAlert,
        setError,
    }
}
