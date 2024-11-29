<script lang="ts">
import router from '@/router/router';

export default {
  /**
   * Name of the component
   */
  name: 'HomePageButtonComponent',

  /**
   * Mounted lifecycle hook
   * This function is called when the component is mounted
   */
  mounted() {
    console.log('HomePageButtonComponent mounted');
  },

  /**
   * Methods of the component
   */
  methods: {
    /**
     * Go to home page
     */
    goToHomePage() {
      router.push({
        name: 'Home'
      });
    }
  }
};
</script>


<template>
  <button @click="goToHomePage" class="btn btn-primary">Go to Home Page</button>
</template>

<style></style>
