<script lang="ts">
/**
 * Import of HomePage component
 */
import { renderPageTitle } from '@/utils/render/render';

export default {
  /**
   * Name of the component
   */
  name: 'LoginPage',

  /**
   * Data of the component
   */
  data() {
    return {
        email: '',
        password: '',
    };
  },

  /**
   * Mounted lifecycle hook
   * This function is called when the component is mounted
   */
  mounted() {
    renderPageTitle('Login');
  },

  /**
   * Methods of the component
   */
  methods: {
     login() {
      // Simuler une action de connexion
      alert(`Connexion avec l'email : ${this.email}`);
    },
    contact() {
      // Simuler une action pour contacter l'entreprise
      window.location.href = "https://betterbusiness.be/contact/";
  }
};
</script>

<template>
  <div class="container">

    <div class="content">
      <!-- Section de gauche : Pas encore de compte -->
      <div class="left-panel">
        <h2>Pas encore de compte ?</h2>
        <p>Contactez l’entreprise pour créer un compte</p>
        <button @click="contact">Contact</button>
      </div>

      <!-- Section de droite : Connexion -->
      <div class="right-panel">
        <h2>Connexion</h2>
        <form @submit.prevent="login">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />

          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required />

          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  padding: 20px;
}


.content {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.left-panel,
.right-panel {
  background-color: #e6e6e6;
  padding: 20px;
  border-radius: 5px;
  width: 45%;
}

.left-panel h2,
.right-panel h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

button {
  background-color: #808080;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #666666;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px 0 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

