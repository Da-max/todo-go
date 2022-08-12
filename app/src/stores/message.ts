import { defineStore } from 'pinia'
import {
    messageStoreActions,
    messageStoreState,
    MessageTypes,
    MESSAGE_STORE_NAME,
} from '../types/utils'

export const useMessageStore = defineStore<
    typeof MESSAGE_STORE_NAME,
    messageStoreState,
    {},
    messageStoreActions
>(MESSAGE_STORE_NAME, {
    state: () => ({
        messages: [],
    }),
    actions: {
        add(text: string, type: MessageTypes) {
            this.$state.messages.push({
                text,
                type,
                id: new Date().toISOString(),
            })
        },
        remove(id: string): boolean {
            const findedIndex: number = this.$state.messages.findIndex(
                (m) => m.id === id
            )
            this.$state.messages = this.$state.messages.filter(
                (_, i) => i !== findedIndex
            )
            return findedIndex !== -1
        },
    },
})
