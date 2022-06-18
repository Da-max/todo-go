import { defineStore } from 'pinia'
import useStore from '.'
import todo from '../hooks/todo'
import { AlertStatus } from '../types/alert'
import { TodoFragment } from '../types/graphql'

const useTodoStore = defineStore('todo', {
    state: (): {todos: TodoFragment[]} => ({
        todos: []
    }),
    actions: {
        async getAll () {
            const mainStore = useStore()
            const { getAll } = todo()
            const { refetch } = getAll()

            mainStore.$patch((state) => { state.loading = true })
            const res = await refetch()
            mainStore.$patch((state) => { state.loading = false })
            if (res) {
                this.todos = res.data.todos
            } else {
                mainStore.addAlert('Les tâches n’ont pas pu être récupéré.', AlertStatus.Warning)
            }
        }
    }
})

export default useTodoStore
