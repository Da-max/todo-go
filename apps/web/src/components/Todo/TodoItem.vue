<script setup lang="ts">
import { ref } from 'vue'
import { TodoFragment } from '@todo-go/core'
import TodoInput from './TodoInput.vue'
import { useMarkDoneTodo } from '../../hooks/todo/useMarkDoneTodo'
import { useMarkUndoneTodo } from '../../hooks/todo/useMarkUndoneTodo'
import { useRemoveTodo } from '../../hooks/todo/useRemoveTodo'
import { logicOr } from '@vueuse/math'
import Loader from '../Utils/Loader.vue'

const props = defineProps<{ todo: TodoFragment }>()
const edit = ref<boolean>(false)

const { markDoneTodo, loading: markDoneTodoLoading } = useMarkDoneTodo()
const { markUndoneTodo, loading: markUndoneTodoLoading } = useMarkUndoneTodo()
const { removeTodo, loading: removeTodoLoading } = useRemoveTodo()

const loading = logicOr(
    markDoneTodoLoading,
    markUndoneTodoLoading,
    removeTodoLoading,
)

function toggleEdit() {
    edit.value = !edit.value
}
</script>

<template>
    <div class="todo__item mb-8">
        <article v-if="!edit" class="flex">
            <div v-if="!todo.done">
                <button @click.prevent="markDoneTodo(props.todo.id)">
                    <FontAwesomeIcon :icon="['far', 'circle']" />
                </button>
                <h2 class="ml-4 inline" @dblclick="toggleEdit">
                    {{ todo.text }}
                </h2>
            </div>
            <div v-else>
                <button @click.prevent="markUndoneTodo(props.todo.id)">
                    <FontAwesomeIcon :icon="['fas', 'circle-check']" />
                </button>
                <h2 class="ml-4 inline line-through" @dblclick="toggleEdit">
                    <span class="text-secondary">{{ todo.text }}</span>
                </h2>
            </div>

            <button
                class="todo-actions ml-5 opacity-0 transition-all duration-500 focus:opacity-100 focus:text-gray-600"
                @click.prevent="removeTodo(props.todo.id)"
            >
                <FontAwesomeIcon :icon="['fas', 'close']" class="fa-lg" />
            </button>
            <button
                class="todo-actions ml-5 opacity-0 transition-all duration-500 focus:opacity-100 focus:text-gray-600"
                @click.prevent="toggleEdit"
            >
                <FontAwesomeIcon :icon="['fas', 'pencil']" />
            </button>
            <Loader v-show="loading" class="bg-[length:40px_40px] w-10 h-10" />
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
