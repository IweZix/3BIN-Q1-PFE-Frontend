<template>
  <div class="p-4" id="navbarWrapper">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand nav-link" id="demonopediaLogo">Vue.js</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/createAdmin" class="nav-link">CreateAdmin</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/changePassword" class="nav-link">changePassword</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
          </ul>
          <div class="navbar-icons">
            <img src="../assets/icons/profil-de-lutilisateur.png" alt="User Icon" class="icon" />
            <img src="../assets/icons/se-deconnecter.png" alt="exit Icon" class="icon" />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NavbarComponent',
  mounted() {
    console.log('NavbarComponent mounted');
  }
};
</script>

<style scoped>
nav {
  background-color: #f8f9fa;
}

.navbar-icons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>