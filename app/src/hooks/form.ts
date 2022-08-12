import { Ref } from 'vue'

export function useForm<T extends { [key: string]: string }>(fields: Ref<T>) {
    function onInput(name: any, e: Event) {
        if (fields.value[name] !== undefined) {
            fields.value[name as keyof T] = (e.target as HTMLInputElement)
                .value as any
        }
    }

    return {
        onInput,
    }
}
