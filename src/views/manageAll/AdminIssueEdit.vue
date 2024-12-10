<script>
import { updateIssue } from '@/services/issuesService';

export default {
  name: 'GroupIssueEdit',
  data() {
    return {
      isLoading: true, // Indicateur de chargement
      issueName: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  async mounted() {
    this.issueName = this.$route.params.issueName;

    try {
        this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Erreur lors du chargement des données.';
      this.isLoading = false;
    }
  },
  methods: {
    async saveIssue() {
      try {
        if (this.issueName.trim() === '') {
          this.errorMessage = 'Le nom du Group Issue est requis.';
          return;
        }

        await updateIssue(this.$route.params.issueName, this.issueName
        );

        this.successMessage = 'Group Issue mis à jour avec succès !';
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = 'Erreur lors de la mise à jour du Group Issue.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<template>
  <div class="issue-edit">
    <h1>Modifier l'enjeux</h1>

    <!-- Indicateur de chargement -->
    <p v-if="isLoading">Chargement des données...</p>

    <!-- Contenu principal -->
    <div v-else>
      <!-- Messages -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

      <!-- Formulaire -->
      <form @submit.prevent="saveIssue">
        <div class="form-group">
          <label for="issue-name">Nom de l'enjeux :</label>
          <input
            id="issue-name"
            type="text"
            v-model="issueName"
            placeholder="Nom de l'enjeux"
            required
          />
        </div>
        <button type="submit" class="btn-primary">
          Enregistrer
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.issue-edit {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type='text'] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #b5cdbf;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #013238;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}

.success-message {
  color: green;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
