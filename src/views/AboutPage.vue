<script lang="ts">
/**
 * Import of AboutPage component
 */
import { renderPageTitle } from '@/utils/render/render';
import HomePageButtonComponent from '@/components/buttons/HomePageButtonComponent.vue';

export default {
  /**
   * Name of the component
   */
  name: 'AboutPage',

  /**
   * Components of the component
   */
  components: {
    HomePageButtonComponent
  },

  /**
   * Mounted lifecycle hook
   * This function is called when the component is mounted
   */
  mounted() {
    renderPageTitle('About');
  }
};
</script>

<template>
  <div class="text-center my-4 title-search">
    <h1>This is the AboutPage</h1>
    <HomePageButtonComponent />
  </div>
</template>

<style></style>
