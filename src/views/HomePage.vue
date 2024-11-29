<script lang="ts">
/**
 * Import of HomePage component
 */
import { renderPageTitle } from '@/utils/render/render';

export default {
  /**
   * Name of the component
   */
  name: 'HomePage',

  /**
   * Data of the component
   */
  data() {
    return {
      integer: 0 as number
    };
  },

  /**
   * Mounted lifecycle hook
   * This function is called when the component is mounted
   */
  async mounted() {
    renderPageTitle('Home');
  },

  /**
   * Methods of the component
   */
  methods: {
    /**
     * Increment the integer value
     */
    incrementInteger() {
      this.integer++;
    }
  }
};
</script>

<template>
  <div class="text-center my-4 title-search">
    <h1>This is the HomePage</h1>
  </div>
  <div v-if="integer === 0" class="text-center my-4">
    <h2 class="text-center my-4">The value of the integer is {{ integer }}</h2>
    <p>Click on the button to increment</p>
    <button @click="incrementInteger" class="btn btn-primary">Increment</button>
  </div>
  <div v-else-if="integer > 0 && integer < 10" class="text-center my-4">
    <h2 class="text-center my-4">The value of the integer is {{ integer }}</h2>
    <p>Click on the button to increment</p>
    <p>You can go up to 10</p>
    <button @click="incrementInteger" class="btn btn-primary">Increment</button>
  </div>
  <div v-else class="text-center my-4">
    <h2 class="text-center my-4">The value of the integer is {{ integer }}</h2>
    <p>You reached the maximum value</p>
    <button @click="integer = 0" class="btn btn-primary">Reset</button>
  </div>
</template>

<style></style>
