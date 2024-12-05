<script lang="ts">
import { adminVerif } from '@/services/authAdminService';
import GlossaireModalComponent from '@/components/Modal/GlossaireModalComponent.vue';
export default {
  name: 'NavbarComponent',
  components: {
    GlossaireModalComponent,
  },
  async mounted() {
    this.checkLoginStatus();
  },
  
  data() {
    return {
      isLoggedIn: false,
      admin: false,
      isGlossaireModalVisible: false, // Contrôle la visibilité du modal
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('company');
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
    openGlossaireModal() {
      this.isGlossaireModalVisible = true;
    },
    closeGlossaireModal() {
      this.isGlossaireModalVisible = false;
    },
  },
};
</script>

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
            <!-- Bouton pour ouvrir le glossaire -->
             
            <li class="nav-item">
              <button class="nav-link btn btn-link" @click="openGlossaireModal">Glossaire</button>
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
     <!-- Modal pour le glossaire -->
     <GlossaireModalComponent
      :isVisible="isGlossaireModalVisible"
      @close="closeGlossaireModal"
      title="Glossaire"
    >
      <template #default>
      </template>
    </GlossaireModalComponent>
  </div>
</template>

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
.btn {
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}
</style>