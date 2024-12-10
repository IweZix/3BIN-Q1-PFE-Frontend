<script lang="ts">
import SearchBarComponent from '@/components/Modal/searchBarComponent.vue';
import { getAllGlossaire } from '@/services/glossaireService';


export default {
  name: 'GlossaireModalComponent',
  components: {
    SearchBarComponent
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'Glossaire'
    }
  },

  data() {
    return {
      query: '', // Recherche de l'utilisateur
      sections: [] as Array<{ title: string; definition: string; remarque: string; plusInfo: string }>
    };
  },
  async created() {
    this.sections = await getAllGlossaire() as Array<{ title: string; definition: string; remarque: string; plusInfo: string }>;
  },
  computed: {
    filteredSections() {
      if (!this.query) {
        return this.sections;
      }

      const searchQuery = this.query.toLowerCase();
      return this.sections.filter((section) =>
        Object.values(section).some((value) =>
          value.toLowerCase().includes(searchQuery)
        )
      );
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    onSearch(query: string) {
      this.query = query; // Met à jour la requête de recherche
    },
    highlightText(text: string): string {
      if (!this.query) return text;
      const regex = new RegExp(`(${this.query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>'); // Surligne les mots correspondants
    }
  }
};
</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal" aria-label="Close Modal">X</button>
      <h1 class="modal-title">{{ title }}</h1>

      <!-- Ajouter le composant de recherche -->
      <SearchBarComponent @search="onSearch" />

      <!-- Sections filtrées -->
      <div v-for="(section, index) in filteredSections" :key="index">
        <h2 v-html="highlightText(section.title)"></h2>
        <h5>Definition</h5>
        <p v-html="highlightText(section.definition)"></p>
        <h5>Remarque</h5>
        <p v-if="section.remarque" v-html="highlightText(section.remarque)"></p>
        <p v-else>Pas de remarque</p>
        <h5>Plus d'information</h5>
        <p v-if="section.plusInfo" v-html="highlightText(section.plusInfo)"></p>
        <p v-else>as d'information complementaire</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
mark {
  background-color: yellow;
  color: black;
  font-weight: bold;
}

.modal-content {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  max-width: 800px; /* Augmente la largeur maximale */
  max-height: 80vh; /* Limite la hauteur maximale pour éviter de dépasser la fenêtre */
  overflow-y: auto; /* Ajoute une barre de défilement verticale si nécessaire */
  width: 90%;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden; /* Empêche le scrolling sur l'arrière-plan */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

h2 {
  font-weight: #013238;
  font-weight: bold;
}

h5 {
  text-decoration: underline;
}
</style>
