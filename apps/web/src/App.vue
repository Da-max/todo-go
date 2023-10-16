<template>
    <toast-provider>
        <div class="min-h-screen flex flex-col text-sm">
            <Navbar />
            <RouterView class="flex-1" />
        </div>
    </toast-provider>
</template>

<script setup lang="ts">
import Navbar from './components/Partials/Navbar.vue'
import { ToastProvider } from 'flowbite-vue'
</script>
