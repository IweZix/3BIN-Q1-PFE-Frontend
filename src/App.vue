<script setup lang="ts">
/**
 * Import of App component
 */
import NavbarComponent from '@/layouts/NavbarComponent.vue';
</script>

<template>
  <NavbarComponent :key="$route.fullPath" />
  <router-view />
</template>

<style scoped></style>
