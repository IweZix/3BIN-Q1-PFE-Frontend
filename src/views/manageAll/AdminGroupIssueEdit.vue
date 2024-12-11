<script>
import { updateGroupIssue } from '@/services/groupIssuesService';

export default {
  name: 'GroupIssueEdit',
  data() {
    return {
      isLoading: true, // Indicateur de chargement
      groupIssueName: '', // Nom du Group Issue
      errorMessage: '',
      successMessage: ''
    };
  },
  async mounted() {
    this.groupIssueName = this.$route.params.groupIssueName;

    try {
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Erreur lors du chargement des données.';
      this.isLoading = false;
    }
  },
  methods: {
    async saveGroupIssue() {
      try {
        if (this.groupIssueName.trim() === '') {
          this.errorMessage = 'Le nom du Group Issue est requis.';
          return;
        }

        await updateGroupIssue(this.$route.params.groupIssueName, this.groupIssueName
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
  <div class="group-issue-edit">
    <h1>Modifier le groupe d'enjeux</h1>

    <!-- Indicateur de chargement -->
    <p v-if="isLoading">Chargement des données...</p>

    <!-- Contenu principal -->
    <div v-else>
      <!-- Messages -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

      <!-- Formulaire -->
      <form @submit.prevent="saveGroupIssue">
        <div class="form-group">
          <label for="group-issue-name">Nom du Group Issue :</label>
          <input
            id="group-issue-name"
            type="text"
            v-model="groupIssueName"
            placeholder="Nom du Group Issue"
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
.group-issue-edit {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #faf5dc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 2%;
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

.issue-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.issue-item {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
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
