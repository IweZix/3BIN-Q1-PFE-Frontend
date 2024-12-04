<script lang="ts">
export default {
  name: 'GlossaireModalComponent',
  props: {
    isVisible: {
      type: Boolean,
      required: true, // Oblige le parent à passer une valeur
    },
    title: {
      type: String,
      default: 'Glossaire', // Titre par défaut
    },
  },
  emits: ['close'], // Définit l'événement "close" pour communiquer avec le parent
  methods: {
    closeModal() {
      this.$emit('close'); // Émet un événement pour fermer le modal
    },
  },
};
</script>

<template>
  <!-- Affiche le modal uniquement si `isVisible` est true -->
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Bouton pour fermer le modal -->
      <button class="close-button" @click="closeModal" aria-label="Close Modal">X</button>

      <!-- Titre du modal -->
      <h1 class="modal-title">{{ title }}</h1>

      <!-- Contenu passé via le slot -->
      <slot>
        <p>Contenu par défaut. Ajoutez vos sections ici en utilisant un slot dans le parent.</p>
      </slot>
    </div>
  </div>
</template>

<style scoped>
/* Styles pour le fond semi-transparent */
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
}

/* Conteneur principal du modal */
.modal-content {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 90%;
}

/* Bouton pour fermer le modal */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* Titre du modal */
.modal-title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
</style>
