<script lang="ts">

export default {
  /**
   * Name of the component
   */
  name: 'NavbarComponent',

  /**
   * Mounted lifecycle hook
   * This function is called when the component is mounted
   */
   mounted() {
    console.log('NavbarComponent mounted');
  },
};
</script>

<template>
  <div class="p-4" id="navbarWrapper">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand nav-link" id="demonopediaLogo">Vue.js</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
nav {
  background-color: #f8f9fa;
  padding: 10px;
}
</style>
