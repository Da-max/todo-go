<template>
    <FwbToastProvider>
        <div class="min-h-screen flex flex-col text-sm">
            <Navbar />
            <RouterView class="flex-1" />
        </div>
    </FwbToastProvider>
</template>

<script setup lang="ts">
import Navbar from "./components/Partials/Navbar.vue";
import { FwbToastProvider } from "flowbite-vue";
</script>
