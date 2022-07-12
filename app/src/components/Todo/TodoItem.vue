<script setup lang="ts">
import { ref } from 'vue'
import { TodoFragment } from '../../types/generated'
import TodoInput from './TodoInput.vue'

const props = defineProps<{ todo: TodoFragment }>()
const edit = ref<boolean>(false)

function toggleEdit() {
    edit.value = !edit.value
}
</script>

<template>
    <div>
        <article v-if="!edit" class="todo__item">
            <h2 class="todo__item__title" @dblclick="toggleEdit">
                {{ todo.text }}
            </h2>
            <button class="todo__item__remove">
                <FontAwesomeIcon :icon="['fas', 'close']" />
            </button>
            <button class="todo__item__update" @click.prevent="toggleEdit">
                <FontAwesomeIcon :icon="['fas', 'pencil']" class="fa-xs" />
            </button>
        </article>
        <TodoInput
            v-if="edit"
            :update="true"
            :todo-id="props.todo.id.toString()"
            @keyup.escape="toggleEdit"
            @save="toggleEdit"
        />
    </div>
</template>

<style scoped>
.todo__item {
    @apply flex justify-center;
}

.todo__item:hover .todo__item__remove,
.todo__item:hover .todo__item__update {
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
