<script>
import { createGroupIssues } from '@/services/groupIssuesService';

export default {
  name: 'GroupIssueAdd',
  data() {
    return {
      groupIssueName: '', // Nom du nouveau template
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async saveGroupIssue() {
      try {
        // Validation simple (le nom ne doit pas être vide)
        if (this.groupIssueName.trim() === '') {
          this.errorMessage = 'Le nom du groupe est requis.';
          return;
        }

        await createGroupIssues(this.groupIssueName);

        // Réinitialisation des champs et affichage du message de succès
        this.successMessage = 'Groupe créé avec succès !';
        this.errorMessage = '';
        this.groupIssueName = '';
      } catch (error) {
        this.errorMessage = 'Erreur lors de la création du groupe.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<template>
  <div class="groupIssue-add mt-3">
    <h1>Créer un nouveau groupe d'enjeux</h1>

    <!-- Affichage des messages d'erreur et de succès -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <!-- Formulaire pour ajouter un template -->
    <form @submit.prevent="saveGroupIssue">
      <div class="form-group">
        <label for="groupIssue-name">Nom du groupe :</label>
        <input
          id="groupIssue-name"
          type="text"
          v-model="groupIssueName"
          placeholder="Nom du groupe"
          required
        />
      </div>
      <button type="submit" class="btn-primary">Créer</button>
    </form>
  </div>
</template>

<style scoped>
.groupIssue-add {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #faf5dc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20%;
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
