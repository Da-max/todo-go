import { reactive, toRefs } from 'vue'

export default function () {
    const state = reactive({
        loading: false
    })

    const startLoading = function () {
        state.loading = true
    }

    const endLoading = function () {
        state.loading = false
    }

    return {
        ...toRefs(state),
        startLoading,
        endLoading
    }
}
