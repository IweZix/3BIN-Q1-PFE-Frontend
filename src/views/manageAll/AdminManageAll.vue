<script>
import { getTemplates } from '@/services/templatesService';
import { getGroupIssues } from '@/services/groupIssuesService';
import { getIssues } from '@/services/issuesService';
import { deleteTemplate } from '@/services/templatesService';

export default {
  name: 'ManageAll',
  data() {
    return {
      isLoading: true, // Indicateur de chargement
      templates: [], // Liste des templates
      groupIssues: [], // Liste des Group Issues
      issues: [], // Liste des Issues
      errorMessage: '' // Message d'erreur global
    };
  },
  async mounted() {
    try {
      // Charger les données
      this.templates = await getTemplates();
      this.groupIssues = await getGroupIssues();
      this.issues = await getIssues();
      this.isLoading = false; // Chargement terminé
    } catch (error) {
      this.errorMessage = 'Erreur lors du chargement des données.';
      this.isLoading = false;
    }
  },
  methods: {
    editTemplate(templateId) {
      this.$router.push(`/admin/template/${templateId}`);
    },
    addTemplate() {
      this.$router.push('/admin/add-template');
    },
    editGroupIssue(groupIssueId) {
      this.$router.push(`/admin/group-issue/${groupIssueId}`);
    },
    addGroupIssue() {
      this.$router.push('/admin/add-group-issue');
    },
    viewIssues(groupIssueId) {
      this.$router.push(`/admin/issues/${groupIssueId}`);
    },
    async deleteTemplate(templateId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce template ?')) {
        try {
          await deleteTemplate(templateId);
          this.templates = this.templates.filter((template) => template._id !== templateId);
        } catch (error) {
          this.errorMessage = 'Erreur lors de la suppression du template.';
        }
      }
    }
  }
};
</script>

<template>
  <div class="manage-container">
    <h1>Vue d'ensemble des catégories du scoring</h1>

    <!-- Indicateur de chargement -->
    <p v-if="isLoading" class="loading-message">Chargement des données...</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Section Templates -->
    <div v-if="!isLoading" class="dashboard-container">
      <h2>Templates</h2>
      <table v-if="templates.length">
        <thead>
          <tr>
            <th>Nom du Template</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="template in templates" :key="template.id">
            <td>{{ template.templateName }}</td>
            <td>
              <button @click="editTemplate(template._id)">Modifier</button>
              <button @click="deleteTemplate(template._id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Aucun template disponible.</p>
      <div class="add-template">
        <button @click="addTemplate">Ajouter un Template</button>
      </div>
    </div>

    <!-- Section Group Issues -->
    <div v-if="!isLoading" class="dashboard-container">
      <h2>Group Issues et Issues</h2>
      <table v-if="groupIssues.length">
        <thead>
          <tr>
            <th>Nom du Group Issue</th>
            <th>Voir Issues</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="groupIssue in groupIssues" :key="groupIssue.id">
            <td>{{ groupIssue.groupIssueName }}</td>
            <td>
              <button @click="viewIssues(groupIssue._id)">Voir</button>
            </td>
            <td>
              <button @click="editGroupIssue(groupIssue._id)">Modifier</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Aucun Group Issue disponible.</p>
      <div class="add-group-issue">
        <button @click="addGroupIssue">Ajouter un Group Issue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Conteneur principal */
.manage-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Titres */
h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  color: #013238;
}

h2 {
  color: #013238;
  margin-bottom: 15px;
  font-size: 22px;
}

/* Indicateur de chargement et messages */
.loading-message {
  text-align: center;
  font-size: 18px;
  color: #666;
  margin: 20px 0;
}

.error-message {
  text-align: center;
  font-size: 18px;
  color: red;
  margin: 20px 0;
}

/* Tableaux */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  font-size: 14px;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

td {
  background-color: #f9f9f9;
}

table tr:hover td {
  background-color: #eaf4f8;
}

/* Boutons */
button {
  padding: 8px 16px;
  background-color: #013238;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 14px;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Section Ajouter */
.add-template,
.add-group-issue {
  text-align: right;
  margin-top: 10px;
}

.dashboard-container {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-container h2 {
  font-size: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  table {
    font-size: 12px;
  }

  button {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
