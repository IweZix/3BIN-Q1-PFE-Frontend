<script>
import { createIssue } from '@/services/issuesService';

export default {
  name: 'IssueAdd',
  data() {
    return {
      issueName: '',
      groupIssueName: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  mounted() {
    this.groupIssueName = this.$route.params.groupIssueName;
  },
  methods: {
    async saveIssue() {
      try {
        if (this.issueName.trim() === '') {
          this.errorMessage = 'Le nom du template est requis.';
          return;
        }
        await createIssue(this.issueName, this.groupIssueName);

        // Réinitialisation des champs et affichage du message de succès
        this.successMessage = 'Template créé avec succès !';
        this.errorMessage = '';
        this.templateName = '';
      } catch (error) {
        this.errorMessage = 'Erreur lors de la création du template.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<template>
  <div class="template-add">
    <h1>Créer un nouvel enjeu dans "{{ groupIssueName }}"</h1>

    <!-- Affichage des messages d'erreur et de succès -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <!-- Formulaire pour ajouter un template -->
    <form @submit.prevent="saveIssue">
      <div class="form-group">
        <label for="issue-name">Nom de l'enjeu :</label>
        <input
          id="issue-name"
          type="text"
          v-model="issueName"
          placeholder="Nom de l'enjeu"
          required
        />
      </div>
      <button type="submit" class="btn-primary">Créer</button>
    </form>
  </div>
</template>

<style scoped>
.template-add {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #faf5dc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #b5cdbf;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #013238;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}

.success-message {
  color: green;
  margin-bottom: 10px;
}
</style>
