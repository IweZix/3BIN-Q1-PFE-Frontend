<script lang="ts">
export default {
  name: 'SearchBarComponent',
  data() {
    return {
      query: '', // Mot-clé de recherche
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.query); // Émet l'événement "search" avec la query
    },
  },
};

</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="query"
      @input="onSearch"
      placeholder="Rechercher dans le glossaire"
      class="form-control"
    />
  </div>
</template>

<style scoped>
.search-bar {
  position: sticky; /* Rend la barre de recherche "collante" */
  top: 0; /* La barre reste collée en haut */
  z-index: 10; /* Assure que la barre reste au-dessus des autres éléments */
  margin: 20px 0;
  background-color: white;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
}

.search-bar input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: none; /* Supprime la bordure du champ */
  border-bottom: 2px solid #ccc; /* Ajoute une ligne en bas pour indiquer une saisie */
  background: none; /* Retire l'arrière-plan */
  outline: none; /* Supprime l'effet de focus par défaut */
  transition: border-color 0.3s ease; /* Animation pour rendre le focus plus fluide */
}

.search-bar input:focus {
  border-bottom: 2px solid #3f907a; /* Change la couleur de la ligne en cas de focus */
}

</style>
