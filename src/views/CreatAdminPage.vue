<script lang="ts">
/**
 * Import of HomePage component
 */
import { renderPageTitle } from '@/utils/render/render';

export default {
  /**
   * Name of the component
   */
  name: 'CreateAdmin',

  /**
   * Data of the component
   */
  data() {
    return {
        password: '',
        isPasswordVisible: false
    };
  },

  /**
   * Mounted lifecycle hook
   * This function is called when the component is mounted
   */
  mounted() {
    renderPageTitle('CreateAdmin');
    
  },

  /**
   * Methods of the component
   */
  methods: {
    revealOrHidePassword() {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
  }
};
</script>

<template>
  <div class="container">
    <main>
      <h1>Création</h1>
      <form>
        <div class="form-group">
          <label for="email">Email :</label>
          <input 
            id="email" 
            type="text" 
            placeholder="Email de l'user"  
            required
            />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <div class="password-group">
            <input 
                :type="isPasswordVisible ? 'text' : 'password'"
                id="password"
                placeholder="mot de passe" 
                v-model="password"
                required
            />
            <button type="button" @click="revealOrHidePassword">
                {{ isPasswordVisible ? 'Masquer' : 'Afficher' }} 
            </button>
            <button type="button" class="refresh-button">🔄</button>
          </div>
        </div>
        <button type="submit" class="submit-button">Créer</button>
      </form>
    </main>
  </div>
</template>

<style>
/* Container and Layout */
.container {
  display: flex;
  flex-direction: column;
  min-height: 10vh;
}

.site-name {
  font-weight: bold;
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

/* Form Styles */
form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.password-group {
  display: flex;
  align-items: center;
}

.password-group input {
  flex: 1;
}

.refresh-button {
  margin-left: 5px;
  padding: 8px;
  border: none;
  background: #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
</style>
