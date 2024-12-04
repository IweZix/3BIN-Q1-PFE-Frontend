<script lang="ts">
import { adminVerif } from '@/services/authAdminService';
export default {
  name: 'NavbarComponent',
  async mounted() {
    this.checkLoginStatus();
  },
  
  data() {
    return {
      isLoggedIn: false,
      admin: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      this.isLoggedIn = false;
      this.admin = false;
      this.$router.push({ name: 'Home' });
    },
    async checkLoginStatus() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn = true;
        try {
          const verifAdmin = await adminVerif(token);
          if (verifAdmin) {
            this.admin = true;
          }
        } catch (error) { /* empty */ }
      }
    },
  },
};
</script>

<template>
  <div class="p-4" id="navbarWrapper">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand nav-link" id="demonopediaLogo">
          <img src="../assets/logo/logo_shiftingpact_vert_verteau.png" alt="Logo" class="logo" />
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link v-if="!isLoggedIn" to="/" class="nav-link">Home</router-link>
              <router-link v-if="isLoggedIn && admin" to="/admin" class="nav-link">Home</router-link>
              <router-link v-if="isLoggedIn && !admin" to="/company" class="nav-link">Home</router-link>
            </li>
            <li v-if="isLoggedIn && admin" class="nav-item">
              <router-link to="/createAdmin" class="nav-link">CreateAdmin</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/AdminCreateCompany" class="nav-link">AdminCreateCompany</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <router-link to="/changePassword" class="nav-link">Change Password</router-link>
            </li>
          </ul>
          <div class="navbar-icons">
            <router-link v-if="!isLoggedIn" to="/login" class="nav-link">
              <img src="../assets/icons/profil-de-lutilisateur.png" alt="User Icon" class="icon" />
            </router-link>
            <img v-if="isLoggedIn" src="../assets/icons/se-deconnecter.png" alt="exit Icon" class="icon" @click="logout" />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
nav {
  background-color: #f6f6f6;
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

.logo {
  height: 80px;
}

.nav-link {
  color: black;
  font-size: 18px;
  font-weight: 500;
}
</style>