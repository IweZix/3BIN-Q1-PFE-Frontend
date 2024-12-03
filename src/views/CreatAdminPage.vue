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
      email: '',
      password: '',
      isPasswordVisible: false,
      errors: {
        email: '',
        password: ''
      }
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
    },
    generateRandomPassword() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!';
      this.password = Array(12)
        .fill('')
        .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('');
    },
    validateForm() {
      this.errors.email = '';
      this.errors.password = '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.errors.email = 'Veuillez entrer un email valide.';
      }

      if (this.password.length < 8) {
        this.errors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
      }

      return !this.errors.email && !this.errors.password;
    },
    handleSubmit() {
      if (this.validateForm()) {
        alert('Formulaire soumis avec succès !');
        // Ajouter ici l'appel à l'API ou une autre logique.
      }
    }
  }
};
</script>

<template>
  <div class="container">
    <main>
      <h1>Création d'un administrateur</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email :</label>
          <input 
            id="email" 
            type="text" 
            placeholder="Email de l'utilisateur"
            v-model="email"
            aria-describedby="email-error"
            :class="{ 'error-border': errors.email }"
            required
          />
          <p id="email-error" v-if="errors.email" class="error-message">{{ errors.email }}</p>
        </div>

        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <div class="password-group">
            <input 
              :type="isPasswordVisible ? 'text' : 'password'"
              id="password"
              placeholder="Mot de passe"
              v-model="password"
              aria-describedby="password-error"
              :class="{ 'error-border': errors.password }"
              required
            />
            <button type="button" @click="revealOrHidePassword">
              {{ isPasswordVisible ? 'Masquer' : 'Afficher' }}
            </button>
            <button type="button" class="refresh-button" @click="generateRandomPassword">🔄</button>
          </div>
          <p id="password-error" v-if="errors.password" class="error-message">{{ errors.password }}</p>
        </div>

        <button 
          type="submit" 
          class="submit-button"
        >
          Créer
        </button>
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

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


/* Form Styles */
form {
  background-color: #f9f9f9;
  padding: 10%;
  border-radius: 8%;
  box-shadow: 0 4% 8% rgba(0, 117, 90, 0.1);
  width: 75%;
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

input.error-border {
  border-color: red;
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
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
