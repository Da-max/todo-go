<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import { useTodo } from '../../hooks/todo'
import { useTodoStore } from '../../stores/todo'
import { TodoFragment } from '../../types/generated'
import { TODO_STORE_NAME } from '../../types/todo'
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
    <div class="todo__item">
        <article v-if="!edit" class="todo__item__content">
            <div v-if="!todo.done">
                <button
                    class="todo__item__circle"
                    @click.prevent="markDoneTodo"
                >
                    <FontAwesomeIcon :icon="['far', 'circle']" />
                </button>
                <h2 class="todo__item__title" @dblclick="toggleEdit">
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
                    class="todo__item__title todo__item__title--done"
                    @dblclick="toggleEdit"
                >
                    <span>{{ todo.text }}</span>
                </h2>
            </div>

            <button class="todo__item__remove" @click.prevent="removeTodo">
                <FontAwesomeIcon :icon="['fas', 'close']" class="fa-lg" />
            </button>
            <button class="todo__item__update" @click.prevent="toggleEdit">
                <FontAwesomeIcon :icon="['fas', 'pencil']" />
            </button>
        </article>
        <TodoInput
            v-if="edit"
            :update="true"
            :todo-id="props.todo.id.toString()"
            @keyup.escape="toggleEdit"
            @save="(val: boolean) => val ? toggleEdit() : null"
        />
    </div>
</template>

<style scoped>
.todo__item {
    @apply mb-8;
}

.todo__item__content {
    @apply flex;
}

.todo__item__title {
    @apply ml-4 inline;
}

.todo__item__title--done {
    @apply line-through;
}

.todo__item__title--done > span {
    @apply text-secondary;
}

.todo__item:hover .todo__item__remove,
.todo__item:hover .todo__item__update,
.todo__item__remove:focus,
.todo__item__update:focus {
    @apply opacity-100 text-gray-600;
}

.todo__item__remove,
.todo__item__update,
.todo__item__loader {
    @apply ml-5;
}

.todo__item__remove,
.todo__item__update {
    @apply opacity-0 transition-all duration-500;
}

.todo__item__loader {
    @apply h-4 w-4 bg-cover;
}
</style>
