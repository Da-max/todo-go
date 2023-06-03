<script setup lang="ts">
import { ref } from 'vue'
import { useTodo } from '../../hooks/todo'
import { useTodoStore } from '../../stores/todo'
import { TodoFragment } from '../../types/generated'
import TodoInput from './TodoInput.vue'

const props = defineProps<{ todo: TodoFragment }>()
const edit = ref<boolean>(false)

const todoStore = useTodoStore()

todoStore.$onAction(({ name }) => {
    if (name === 'endEdit') {
        edit.value = false
    }
})

const { removeTodo, markDoneTodo, markUndoneTodo } = useTodo(props.todo.id)

function toggleEdit() {
    if (!edit.value) {
        todoStore.startEdit()
    }
    edit.value = !edit.value
}
</script>

<template>
    <div class="todo__item mb-8">
        <article v-if="!edit" class="todo__item__content flex">
            <div v-if="!todo.done">
                <button @click.prevent="markDoneTodo">
                    <FontAwesomeIcon :icon="['far', 'circle']" />
                </button>
                <h2
                    class="todo__item__title ml-4 inline"
                    @dblclick="toggleEdit"
                >
                    {{ todo.text }}
                </h2>
            </div>
            <div v-else>
                <button @click.prevent="markUndoneTodo">
                    <FontAwesomeIcon
                        class="todo__item__check"
                        :icon="['fas', 'circle-check']"
                    />
                </button>
                <h2
                    class="todo__item__title ml-4 inline line-through"
                    @dblclick="toggleEdit"
                >
                    <span class="text-secondary">{{ todo.text }}</span>
                </h2>
            </div>

            <button
                class="todo-actions ml-5 opacity-0 transition-all duration-500 focus:opacity-100 focus:text-gray-600"
                @click.prevent="removeTodo"
            >
                <FontAwesomeIcon :icon="['fas', 'close']" class="fa-lg" />
            </button>
            <button
                class="todo-actions ml-5 opacity-0 transition-all duration-500 focus:opacity-100 focus:text-gray-600"
                @click.prevent="toggleEdit"
            >
                <FontAwesomeIcon :icon="['fas', 'pencil']" />
            </button>
        </article>
        <TodoInput
            v-if="edit"
            :update="true"
            :todo-id="props.todo.id.toString()"
            @keyup.escape="toggleEdit"
            @save="(val: boolean) => (val ? toggleEdit() : null)"
        />
    </div>
</template>

<style scoped>
.todo__item:hover .todo-actions {
    @apply opacity-100 text-gray-600;
}
</style>
