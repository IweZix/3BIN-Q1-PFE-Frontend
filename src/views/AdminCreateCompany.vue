<script lang="ts">
import { renderPageTitle } from '@/utils/render/render';
import { registerCompany } from '@/services/authCompanyService';
import { generateRandomPassword } from '@/utils/passwordUtils';
import { getTemplates } from '@/services/templatesService';

export default {
  name: 'CreateCompany',
  data() {
    return {
      companyName: '',
      email: '',
      password: '',
      templates: [],
      availableTemplates: [{ _id: '', templateName: '' }],
      isPasswordVisible: true,
      errors: {
        companyName: '',
        email: '',
        password: '',
        templates: ''
      },
      successMessage: '',
      credentials: { email: '', password: '' } // Objet pour stocker les credentials créés
    };
  },
  async mounted() {
    renderPageTitle('CreateCompany');
    try {
      this.availableTemplates = await getTemplates() as { _id: string; templateName: string }[];
    } catch (error) {
      console.error('Failed to fetch templates', error);
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    validateForm() {
      this.errors.companyName = '';
      this.errors.email = '';
      this.errors.password = '';
      this.errors.templates = '';

      if (this.companyName.trim() === '') {
        this.errors.companyName = "Veuillez entrer un nom d'entreprise.";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.errors.email = 'Veuillez entrer un email valide.';
      }

      if (this.password.length < 8) {
        this.errors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
      }

      if (this.templates.length === 0) {
        this.errors.templates = 'Veuillez sélectionner au moins un template.';
      }

      return (
        !this.errors.companyName &&
        !this.errors.email &&
        !this.errors.password &&
        !this.errors.templates
      );
    },
    async handleSubmit() {
      if (this.validateForm()) {
        try {
          const response = await registerCompany(
            this.companyName,
            this.email,
            this.password,
            this.templates
          );

          // Stockage des credentials après la création réussie
          this.credentials = {
            email: response.email,
            password: this.password
          };

          this.successMessage = 'Entreprise créée avec succès !';
        } catch (error: any) {
          if (error.response && error.response.status === 409) {
            this.errors.email = 'Cet email est déjà utilisé.';
          }
        }
      }
    },
    generateRandomPassword() {
      this.password = generateRandomPassword();
    },
    copyToClipboard(text = '') {
      navigator.clipboard.writeText(text).then(() => {
        alert('Copié dans le presse-papier !');
      });
    }
  }
};
</script>

<template>
  <div class="create-company-page">
    <div class="card">
      <h1>Création d'une entreprise</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="company-name">Nom <span class="required">*</span> :</label>
          <input
            id="company-name"
            type="text"
            placeholder="Nom de l'entreprise"
            v-model="companyName"
            aria-describedby="company-name-error"
            :class="{ 'error-border': errors.companyName }"
            required
          />
          <p id="company-name-error" v-if="errors.companyName" class="error-message">
            {{ errors.companyName }}
          </p>
        </div>

        <div class="form-group">
          <label for="email">Email <span class="required">*</span> :</label>
          <input
            id="email"
            type="text"
            placeholder="Email de l'entreprise"
            v-model="email"
            aria-describedby="email-error"
            :class="{ 'error-border': errors.email }"
            required
          />
          <p id="email-error" v-if="errors.email" class="error-message">{{ errors.email }}</p>
        </div>

        <div class="form-group">
          <label for="password">Mot de passe <span class="required">*</span> :</label>
          <div class="password-group">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              id="password"
              placeholder="Mot de passe généré"
              v-model="password"
              aria-describedby="password-error"
              :class="{ 'error-border': errors.password }"
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
                src="../assets/icons/show.png"
                alt="Masquer le mot de passe"
                class="visibility-icon"
              />
              <img
                v-else
                src="../assets/icons/hide.png"
                alt="Afficher le mot de passe"
                class="visibility-icon"
              />
            </button>
            <button
              type="button"
              class="refresh-button"
              @click="generateRandomPassword"
              aria-label="Générer un nouveau mot de passe"
            >
              🔄
            </button>
          </div>
          <p id="password-error" v-if="errors.password" class="error-message">
            {{ errors.password }}
          </p>
        </div>

        <div class="form-group">
          <label for="templates">Templates disponibles <span class="required">*</span> :</label>
          <div class="checkbox-list">
            <ul>
              <li
                v-for="(template, index) in availableTemplates"
                :key="index"
                class="template-option"
              >
                <label>
                  <input type="checkbox" :value="template._id" v-model="templates" />
                  {{ template.templateName }}
                </label>
              </li>
            </ul>
          </div>
          <p id="templates-error" class="error-message" v-if="!templates.length">
            Veuillez sélectionner au moins un template.
          </p>
        </div>

        <button type="submit" class="btn-primary">Créer</button>
      </form>
      <!-- Section pour afficher les credentials -->
      <div v-if="credentials" class="credentials-section">
        <h2>Credentials générés</h2>
        <p>Email : {{ credentials.email }}</p>
        <p>Mot de passe : {{ credentials.password }}</p>
        <button @click="copyToClipboard(`${credentials.email} : ${credentials.password}`)">
          Copier les credentials
        </button>
        <p class="success-message">{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-company-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 20px;
  background-color: #f5f5f5;
}

.card {
  background-color: #faf5dc;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px;
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
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

label .required {
  color: red;
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
.toggle-visibility-btn {
  position: absolute;
  right: 90px; /* Distance du bord droit */
  top: 320px; /* Centre verticalement */
  background: none; /* Suppression du fond */
  border: none; /* Suppression de la bordure */
  font-size: 18px; /* Taille de l'icône */
  cursor: pointer;
  user-select: none; /* Empêche la sélection du texte */
  color: #666; /* Couleur du bouton */
  padding: 0;
}
.visibility-icon {
  width: 30px;
  height: 30px;
}

.refresh-button {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 5px 10px;
  color: #666;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.refresh-button:hover,
.toggle-visibility-btn:hover {
  background-color: #e0e0e0;
}

.template-option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.template-option input {
  margin-right: 10px;
}

.btn-primary {
  padding: 10px 20px;
  background-color: #013238;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}

.btn-primary:hover {
  background-color: #876cc7;
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

.checkbox-list {
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 200px; /* Limite la hauteur de la liste */
  padding: 10px;
  background-color: #f9f9f9;
}

.checkbox-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.checkbox-list label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-list label {
  display: flex;
  align-items: center;
  gap: 10px; /* Espace entre la checkbox et le texte */
  cursor: pointer;
  white-space: nowrap; /* Empêche le retour à la ligne */
}

.template-option {
  display: flex;
  align-items: center;
}

.credentials-section {
  margin-top: 20px;
  text-align: left;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.credentials-section h2 {
  margin-bottom: 10px;
}

.credentials-section p {
  margin: 5px 0;
  font-size: 16px;
}

.credentials-section button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.credentials-section button:hover {
  background-color: #0056b3;
}
</style>
