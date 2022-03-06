<script setup lang="ts">
import { Todo } from "../../types/graphql"


defineProps<{ todo: Todo }>()

</script>

<template>
    <article class="todo__item">
        <h2 class="todo__item__title">{{ todo.text }}</h2>
    </article>
</template>