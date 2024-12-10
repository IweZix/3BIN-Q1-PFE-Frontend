<script lang="ts">
export default {
  name: 'LeftPanel',
  methods: {
    contact() {
      window.location.href = 'https://betterbusiness.be/contact/';
    }
  }
};
</script>

<template>
  <div class="left-panel">
    <h2>Pas encore de compte ?</h2>
    <p style="padding-bottom: 2em">Contactez l’entreprise pour créer un compte</p>
    <button class="leftButton" @click="contact">Contact</button>
  </div>
</template>

<style scoped>
.left-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Centre verticalement les éléments */
  background-color: #f1e8cb;
  padding: 50px;
  border-radius: 5px 0 0 5px;
  /* Coins arrondis pour la gauche */
  width: 50%;
   box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1); /* Ombre interne pour un effet de relief */
  transition: box-shadow 0.3s ease-in-out; /* Animation fluide pour l'ombre */
}

.left-panel h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  font-weight: bold;
}

button {
  background-color: #b5cdbf;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  width: auto;
  /* Ajuste la largeur au contenu */
  align-self: flex-start;
  font-weight: bold;
}

button:hover {
  background-color: #013238;
}
</style>
