<script lang="ts">
import { renderPageTitle } from '@/utils/render/render';
import { registerAdmin } from '@/services/authAdminService';
import { generateRandomPassword } from '@/utils/passwordUtils';

//import components
import CredentialsDisplay from '@/components/CredentialsDisplay.vue';

export default {
  name: 'CreateAdmin',
  components: {
    CredentialsDisplay
  },
  data() {
    return {
      adminName: '',
      email: '',
      password: '',
      isPasswordVisible: true,
      passwordError: null as string | null,
      errors: {
        adminName: '',
        email: '',
        password: ''
      },
      successMessage: '',
      credentials: { email: '', password: '' }
    };
  },
  mounted() {
    renderPageTitle('CreateAdmin');
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    generateRandomPassword() {
      this.password = generateRandomPassword();
      this.validatePassword(this.password);
    },
    validatePassword(password: string) {
      let errorMessage = '';

      if (password.length < 8) {
        errorMessage = 'Le mot de passe doit contenir au moins 8 caractères.';
      }
      if (!/[A-Z]/.test(password)) {
        errorMessage = 'Le mot de passe doit contenir au moins une majuscule.';
      }

      this.passwordError = errorMessage;
      this.errors.password = errorMessage;
      return !errorMessage;
    },
    validateForm() {
      this.errors.adminName = '';
      this.errors.email = '';
      this.errors.password = '';

      const adminNameRegex = /^[A-Z][a-z]*$/;
      if (!adminNameRegex.test(this.adminName)) {
        this.errors.adminName =
          'Veuillez entrer un nom valide avec comme premier lettre une majuscule.';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.errors.email = 'Veuillez entrer un email valide.';
      }

      this.validatePassword(this.password);

      return !this.errors.adminName && !this.errors.email && !this.passwordError;
    },
    async handleSubmit() {
      if (this.validateForm()) {
          const response = await registerAdmin(
            this.adminName, 
            this.email, 
            this.password);

            console.log(response);
            if (response.statusCode === 409){
              this.errors.email = 'Cet email est déjà utilisé.';
              return;
            }
          
          this.credentials = { email: this.email, password: this.password };
          this.successMessage = 'Administrateur créé avec succès !';
        } else {
          console.error('Erreur lors de la création de l\'administrateur.');
      }
    }
  }
};
</script>

<template>
  <div class="create-admin-page">
    <div class="card">
      <h1>Création d'un administrateur</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="adminName">Nom</label>
          <input
            id="adminName"
            type="text"
            placeholder="Nom de l'utilisateur"
            v-model="adminName"
            aria-describedby="adminName-error"
            :class="{ 'error-border': errors.adminName }"
            required
          />
          <p id="adminName-error" v-if="errors.adminName" class="error-message">
            {{ errors.adminName }}
          </p>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
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
              @input="validatePassword(password)"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="toggle-visibility-btn"
              aria-label="Afficher ou masquer le mot de passe"
            >
              <img
                v-if="isPasswordVisible"
                src="../assets/icons/hide.png"
                alt="Masquer le mot de passe"
                class="visibility-icon"
              />
              <img
                v-else
                src="../assets/icons/show.png"
                alt="Afficher le mot de passe"
                class="visibility-icon"
              />
            </button>
            <button type="button" class="refresh-button" @click="generateRandomPassword">🔄</button>
          </div>
          <p id="password-error" v-if="passwordError" class="error-message">{{ passwordError }}</p>
        </div>
        <button type="submit" class="btn btn-primary">Créer</button>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      </form>
      <!-- Display the credentials -->
      <CredentialsDisplay
        v-if="successMessage"
        :credentials="credentials"
        :successMessage="successMessage"
      />
    </div>
  </div>
</template>

<style scoped>
/* Global styles */
.create-admin-page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px 10px 0px;
}

.card {
  background-color: #faf5dc;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

input.error-border {
  border-color: red;
}

.password-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.password-group {
  position: relative; /* Nécessaire pour positionner le bouton "Afficher" à l'intérieur */
  display: flex;
  align-items: center; /* Aligne le contenu verticalement */
}
.password-group input {
  flex-grow: 1; /* Permet au champ de saisie de prendre tout l'espace disponible */
}

.toggle-visibility-btn {
  position: absolute;
  right: 65px; /* Distance du bord droit */
  top: 50%; /* Centre verticalement */
  transform: translateY(-50%);
  background: none; /* Suppression du fond */
  border: none; /* Suppression de la bordure */
  font-size: 18px; /* Taille de l'icône */
  cursor: pointer;
  user-select: none; /* Empêche la sélection du texte */
  color: #666; /* Couleur du bouton */
  padding: 0;
}

.refresh-button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.refresh-button:hover {
  background-color: #e0e0e0;
}

.btn-primary {
  padding: 10px 20px;
  background-color: #b5cdbf;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #013238;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.success-message {
  color: green;
  font-size: 14px;
  margin-top: 10px;
}
</style>
