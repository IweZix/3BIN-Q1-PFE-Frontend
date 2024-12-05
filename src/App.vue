<script setup lang="ts">
/**
 * Import of App component
 */
import NavbarComponent from '@/layouts/NavbarComponent.vue';
import FooterComponent from '@/layouts/FooterComponent.vue';
</script>

<template>
  <NavbarComponent :key="$route.fullPath" />
  <div class="content">
    <router-view />
  </div>
  <FooterComponent />
</template>

<style scoped>
.content {
  padding-bottom: 50px;
}
</style>