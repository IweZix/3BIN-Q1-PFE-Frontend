<script lang="ts">
import { adminVerif, adminVerifBoolean, checkPasswordUpdated } from '@/services/authAdminService';
import { checkFormCompletedESG, checkPasswordUpdatedCompany } from '@/services/authCompanyService';
import GlossaireModalComponent from '@/components/Modal/GlossaireModalComponent.vue';
export default {
  name: 'NavbarComponent',
  components: {
    GlossaireModalComponent
  },
  async mounted() {
    await this.checkLoginStatus();
    
    if(!this.admin){
      
      await this.checkIsFormCompletedESG();
    }
    
  },

  data() {
    return {
      isLoggedIn: false,
      admin: false,
      isPasswordUpdated: false,
      path: '/login',
      isGlossaireModalVisible: false,
      formCompletedESG: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('company');
      this.isLoggedIn = false;
      this.admin = false;
      this.path = '/login'; 
      this.$router.push({ name: 'Login' });
    },
    async checkLoginStatus() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn = true;
        try {
          const verifAdmin = await adminVerifBoolean(token); 
          if (verifAdmin) {
            this.admin = true;
          }
          await this.checkIfPasswordUpdated();
        } catch (error) {
          // Erreur silencieuse, ne rien faire
        }
      }
      this.redirectPath(); // Détermine le chemin après la vérification
    },
    async checkIsFormCompletedESG() {
      const token = localStorage.getItem('token');
      if (token) {
        this.formCompletedESG = !!(await checkFormCompletedESG(token));
        
      }
    },

    async checkIfPasswordUpdated() {
      const email = localStorage.getItem('email');
      if (email) {
        if (this.admin) {
          this.isPasswordUpdated = await checkPasswordUpdated(email);
        } else {
          this.isPasswordUpdated = await checkPasswordUpdatedCompany(email);
        }
      }
    },
    redirectPath() {
      if (this.isLoggedIn) {
        if (this.isPasswordUpdated) {
          this.path = this.admin ? '/admin' : '/company';
        } else {
          this.path = '/changePassword';
        }
      } else {
        this.path = '/login';
      }
    },
    openGlossaireModal() {
      this.isGlossaireModalVisible = true;
    },
    closeGlossaireModal() {
      this.isGlossaireModalVisible = false;
    }
  }
};
</script>

<template>
  <div class="p-3" id="navbarWrapper">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link :to="path" class="navbar-brand nav-link" id="demonopediaLogo">
          <img src="../assets/logo/logo_shiftingpact_verteau_blanc.png" alt="Logo" class="logo" />
        </router-link>
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
              <!-- Utilise path pour la redirection -->
              <router-link :to="path" class="nav-link">Accueil</router-link>
            </li>
            <li v-if="isLoggedIn && admin && isPasswordUpdated" class="nav-item">
              <router-link to="/createCredentials" class="nav-link">Créer un compte</router-link>
            </li>
            <li v-if="isLoggedIn && admin && isPasswordUpdated" class="nav-item">
              <router-link to="/manageAll" class="nav-link">Tableau de bord de gestion</router-link>
            </li>
            <li v-if="isLoggedIn && !isPasswordUpdated" class="nav-item">
              <router-link to="/changePassword" class="nav-link">Modification du mot de passe</router-link>
            </li>
            <li
              v-if="isLoggedIn && !admin && isPasswordUpdated && !formCompletedESG"
              class="nav-item"
            >
              <router-link to="/moduleESG" class="nav-link">Module ESG</router-link>
            </li>
            <!-- Bouton pour ouvrir le glossaire -->
            <li v-if="isLoggedIn && isPasswordUpdated" class="nav-item">
              <button class="nav-link" @click="openGlossaireModal">Glossaire</button>
            </li>
          </ul>
          <div class="navbar-icons">
            <!-- Icône pour se connecter ou se déconnecter -->
            <router-link v-if="!isLoggedIn" to="/login" class="nav-link">
              <img src="../assets/icons/profil-de-lutilisateur.png" alt="User Icon" class="icon" />
            </router-link>
            <img
              v-if="isLoggedIn"
              src="../assets/icons/se-deconnecter.png"
              alt="exit Icon"
              class="icon"
              @click="logout"
            />
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
      <template #default> </template>
    </GlossaireModalComponent>
  </div>
</template>

<style scoped>
#navbarWrapper {
  background-color: #013238;
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
  color: #b5cdbf;
  font-size: 18px;
  font-weight: 500 bold;
  
}
.btn {
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}


.nav-item {
  display: flex;
  align-items: center;
  font-weight: bold;
}

</style>
