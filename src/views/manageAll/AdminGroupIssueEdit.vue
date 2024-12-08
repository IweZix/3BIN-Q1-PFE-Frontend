<script>
import { getGroupIssueById, updateGroupIssue } from '@/services/groupIssuesService';
import { getIssues } from '@/services/issuesService';

export default {
  name: 'GroupIssueEdit',
  data() {
    return {
      isLoading: true, // Indicateur de chargement
      groupIssueId: null, // ID du Group Issue
      groupIssueName: '', // Nom du Group Issue
      associatedIssues: [], // Issues associées
      availableIssues: [], // Liste des issues disponibles
      selectedIssues: [], // Issues sélectionnées pour ce groupe
      errorMessage: '',
      successMessage: ''
    };
  },
  async mounted() {
    this.groupIssueId = this.$route.params.id;

    try {
      // Chargement des données
      const groupIssue = await getGroupIssueById(this.groupIssueId);
      this.groupIssueName = groupIssue.name;
      this.selectedIssues = groupIssue.issues;

      this.availableIssues = await getIssues();

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

        await updateGroupIssue(this.groupIssueId, {
          name: this.groupIssueName,
          issues: this.selectedIssues
        });

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
    <h1>Modifier Group Issue</h1>

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

        <div class="form-group">
          <label>Issues associées :</label>
          <div class="issue-list">
            <div v-for="issue in availableIssues" :key="issue.id" class="issue-item">
              <label>
                <input type="checkbox" :value="issue.id" v-model="selectedIssues" />
                {{ issue.name }}
              </label>
            </div>
          </div>
        </div>

        <button type="submit" class="btn-primary" :disabled="isLoading || errorMessage">
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
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
