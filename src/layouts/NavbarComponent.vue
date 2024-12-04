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
              <router-link to="/changePassword" class="nav-link">ChangePassword</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <!-- Bouton pour ouvrir le glossaire -->
            <li class="nav-item">
              <button class="nav-link btn btn-link" @click="openGlossaireModal">Glossaire</button>
            </li>
          </ul>
          <div class="navbar-icons">
            <img src="../assets/icons/profil-de-lutilisateur.png" alt="User Icon" class="icon" />
            <img src="../assets/icons/se-deconnecter.png" alt="exit Icon" class="icon" />
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
        <!-- Sections personnalisées -->
        <section>
          <h2>Section 1</h2>
          <p>Description ou contenu pour la première section.</p>
        </section>
        <section>
          <h2>Section 2</h2>
          <p>Description ou contenu pour la deuxième section.</p>
        </section>
        <section>
          <h2>Section 3</h2>
          <p>Description ou contenu pour la troisième section.</p>
        </section>
      </template>
    </GlossaireModalComponent>
  </div>
</template>

<script lang="ts">
import GlossaireModalComponent from '@/components/Modal/GlossaireModalComponent.vue';

export default {
  name: 'NavbarComponent',
  components: {
    GlossaireModalComponent,
  },
  data() {
    return {
      isGlossaireModalVisible: false, // Contrôle la visibilité du modal
    };
  },
  methods: {
    openGlossaireModal() {
      this.isGlossaireModalVisible = true;
    },
    closeGlossaireModal() {
      this.isGlossaireModalVisible = false;
    },
  },
  mounted() {
    console.log('NavbarComponent mounted');
  },
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

.btn {
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}
</style>
