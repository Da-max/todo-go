<script setup lang="ts">
import { defineProps } from 'vue'
import { Todo } from '../../types/graphql'

defineProps<{ todo: Todo }>()

</script>

<template>
    <article class="todo__item">
        <h2 class="todo__item__title">
            {{ todo.text }}
        </h2>
        <button class="todo__item__remove">
            <FontAwesomeIcon :icon="['fas', 'close']" />
        </button>
    </article>
</template>

<style scoped>
.todo__item {
    @apply flex justify-center;
}

.todo__item:hover .todo__item__remove {
    @apply opacity-100 text-gray-600;
}

.todo__item__remove {
    @apply ml-5 opacity-0 transition-all duration-500;
}
</style>
