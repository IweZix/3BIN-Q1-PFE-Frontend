<script lang="ts">
/**
 * Import of NotFoundPage component
 */
import { renderPageTitle } from '@/utils/render/render';

export default {
  /**
   * Name of the component
   */
  name: 'NotFoundPage',

  /**
   * Mounted lifecycle hook
   */
  mounted() {
    renderPageTitle('404 - Not found');
  },
};
</script>

<template>
  <div class="text-center">
    <h1>Not Found</h1>
  </div>
</template>

<style>

</style>