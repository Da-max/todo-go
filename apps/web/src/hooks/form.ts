import { Ref } from 'vue'

export function useForm<T extends { [key: string]: string }>(fields: Ref<T>) {
    function onInput(name: keyof T, e: Event) {
        if (fields.value[name] !== undefined) {
            fields.value[name] = (e.target as HTMLInputElement)
                .value as (typeof fields.value)[typeof name]
        }
    }

    return {
        onInput,
    }
}
