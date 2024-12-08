<script lang="ts">
import SearchBarComponent from '@/components/Modal/searchBarComponent.vue';

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
      sections: [
        {
          title: 'Analyse de Double Matérialité',
          definition:
            "L'Analyse de Double Matérialité, dans le cadre de la directive CSRD (Corporate Sustainability Reporting Directive) de l'Union européenne, est une approche qui aide les entreprises à évaluer et à communiquer les impacts de leurs activités en matière de durabilité de manière plus complète.",
          remarque: '',
          plusInfo: ''
        },
        {
          title: 'Biodiversité',
          definition:
            'La biodiversité désigne la variété et la variabilité des formes de vie sur Terre, en ce compris la diversité des espèces, la diversité génétique et la diversité des écosystèmes.',
          remarque: '',
          plusInfo: ''
        }
      ]
    };
  },
  computed: {
    filteredSections() {
      if (this.query) {
        // Filtre les sections en fonction de la requête
        return this.sections.filter(
          (section) =>
            section.title.toLowerCase().includes(this.query.toLowerCase()) ||
            section.definition.toLowerCase().includes(this.query.toLowerCase()) ||
            section.remarque.toLowerCase().includes(this.query.toLowerCase()) ||
            section.plusInfo.toLowerCase().includes(this.query.toLowerCase())
        );
      }
      return this.sections; // Retourne toutes les sections si aucune recherche
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
        <h3>Definition</h3>
        <p v-html="highlightText(section.definition)"></p>
        <h3>Remarque</h3>
        <p v-if="section.remarque" v-html="highlightText(section.remarque)"></p>
        <p v-else>pas de remarque</p>
        <h3>plus d'information</h3>
        <p v-if="section.plusInfo" v-html="highlightText(section.plusInfo)"></p>
        <p v-else>pas d'information complementaire</p>
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
</style>
