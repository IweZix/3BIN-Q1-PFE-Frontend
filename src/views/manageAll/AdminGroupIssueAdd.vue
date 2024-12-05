<script>
import { getIssueById, updateIssue } from '@/services/issuesService';

export default {
  name: 'IssueEdit',
  data() {
    return {
      isLoading: true, // Indicateur de chargement
      issueId: null, // ID de l'issue
      issueName: '', // Nom de l'issue
      issueDescription: '', // Description de l'issue
      errorMessage: '',
      successMessage: ''
    };
  },
  async mounted() {
    this.issueId = this.$route.params.id;

    try {
      // Charger les données de l'issue
      const issue = await getIssueById(this.issueId);
      this.issueName = issue.name;
      this.issueDescription = issue.description;
      this.isLoading = false; // Chargement terminé
    } catch (error) {
      this.errorMessage = 'Erreur lors du chargement des données.';
      this.isLoading = false;
    }
  },
  methods: {
    async saveIssue() {
      try {
        // Validation des champs
        if (this.issueName.trim() === '' || this.issueDescription.trim() === '') {
          this.errorMessage = 'Tous les champs sont requis.';
          return;
        }

        // Mise à jour de l'issue
        await updateIssue(this.issueId, {
          name: this.issueName,
          description: this.issueDescription
        });

        this.successMessage = 'Issue mise à jour avec succès !';
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = 'Erreur lors de la mise à jour de l\'issue.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<template>
  <div class="issue-edit">
    <h1>Modifier l'Issue</h1>

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
          <label for="issue-name">Nom du groupe :</label>
          <input
            id="issue-name"
            type="text"
            v-model="issueName"
            placeholder="Entrez le nom de l'Issue"
            required
          />
        </div>

        <div class="form-group">
          <label for="issue-description">Liste des issues :</label>
            <table class="issue-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="issue in issues" :key="issue.id">
                  <td>{{ issue.name }}</td>
                <td>
                    <button @click="editIssue(issue.id)">Modifier</button>
                </td>
                </tr>
              </tbody>
            </table>
        </div>

        <button
          type="submit"
          class="btn-primary"
          :disabled="isLoading || issueName.trim() === '' || issueDescription.trim() === ''"
        >
          Enregistrer
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.issue-edit {
  max-width: 600px;
  margin: 20px auto;
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

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

textarea {
  resize: vertical;
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
