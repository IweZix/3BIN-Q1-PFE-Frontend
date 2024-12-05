<script lang="ts">
import { adminVerif } from '@/services/authAdminService';
import GlossaireModalComponent from '@/components/Modal/GlossaireModalComponent.vue';
export default {
  name: 'NavbarComponent',
  components: {
    GlossaireModalComponent,
  },
  async mounted() {
    await this.checkLoginStatus();
  },
  
  data() {
    return {
      isLoggedIn: false,
      admin: false,
      path: '/login',
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
      this.path = '/login'; // Réinitialise le chemin
      this.$router.push({ name: 'Login' });
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
        } catch (error) {
          console.error(error);
        }
      }
      this.redirectPath(); // Détermine le chemin après la vérification
    },
    redirectPath() {
      if (this.isLoggedIn) {
        this.path = this.admin ? '/admin' : '/company';
      } else {
        this.path = '/login';
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
        <router-link :to="path" class="navbar-brand nav-link" id="demonopediaLogo">
          <img src="../assets/logo/logo_shiftingpact_vert_verteau.png" alt="Logo" class="logo" />
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <!-- Utilise path pour la redirection -->
              <router-link :to="path" class="nav-link">Home</router-link>
            </li>
            <li v-if="isLoggedIn && admin" class="nav-item">
              <router-link to="/createCredentials" class="nav-link">Créer un compte</router-link>
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
            <!-- Icône pour se connecter ou se déconnecter -->
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
.btn {
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
  text-decoration: none;

}
</style>