<script>
import { getTemplates } from '@/services/templatesService';
import { getGroupIssues } from '@/services/groupIssuesService';
import { getIssues } from '@/services/issuesService';
import { deleteTemplate } from '@/services/templatesService';
import { deleteGroupIssue } from '@/services/groupIssuesService';

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
    editTemplate(templateName) {
      this.$router.push(`/admin/template/${templateName}`);
    },
    addTemplate() {
      this.$router.push('/admin/add-template');
    },
    editGroupIssue(groupIssueName) {
      this.$router.push(`/admin/group-issue/${groupIssueName}`);
    },
    addGroupIssue() {
      this.$router.push('/admin/add-group-issue');
    },
    async deleteGroupIssue(groupIssueName) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce groupe d\'enjeu ?')) {
        try {
          await deleteGroupIssue(groupIssueName);
          this.groupIssues = this.groupIssues.filter((groupIssue) => groupIssue.groupIssueName !== groupIssueName);
        } catch (error) {
          this.errorMessage = 'Erreur lors de la suppression du groupe d\'enjeu.';
        }
      }
    },
    viewIssues(groupIssueName) {
      this.$router.push(`admin/issuesByGroup/${groupIssueName}`);
    },
    async deleteTemplate(templateName) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce template ?')) {
        try {
          await deleteTemplate(templateName);
          this.templates = this.templates.filter((template) => template.templateName !== templateName);
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
              <button class="btn btn-edit" @click="editTemplate(template.templateName)">
                <i class="fas fa-edit"></i> Modifier
              </button>
              <button class="btn btn-delete" @click="deleteTemplate(template.templateName)">
                <i class="fas fa-trash-alt"></i> Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Aucun template disponible.</p>
      <div class="add-template">
        <button @click="addTemplate"><i class="fas fa-plus"></i> Ajouter un Template</button>
      </div>
    </div>

    <!-- Section Group Issues -->
    <div v-if="!isLoading" class="dashboard-container">
      <h2>Groupe d'enjeux & Enjeux</h2>
      <table v-if="groupIssues.length">
        <thead>
          <tr>
            <th>Nom du groupe d'enjeux</th>
            <th>Voir les enjeux</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="groupIssue in groupIssues" :key="groupIssue.id" class="issueName">
            <td >{{ groupIssue.groupIssueName }}</td>
            <td>
              <button class="btn btn-view" @click="viewIssues(groupIssue.groupIssueName)">
                <i class="fas fa-eye"></i> Voir
              </button>
            </td>
            <td>
              <button class="btn btn-edit" @click="editGroupIssue(groupIssue.groupIssueName)">
                <i class="fas fa-edit"></i> Modifier
              </button>
              <button class="btn btn-delete" @click="deleteGroupIssue(groupIssue.groupIssueName)">
                <i class="fas fa-trash-alt"></i> Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Aucun groupe d'enjeu disponible.</p>
      <div class="add-group-issue">
        <button @click="addGroupIssue"><i class="fas fa-plus"></i> Ajouter un Groupe d'enjeux</button>
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
  background-color: #025959;
  font-weight: bold;
  color : white;
}

td {
  background-color: #f9f9f9;
}
.issueName:nth-child(3n+1) td {
  background-color: #c5fddf; /* Vert */
}

.issueName:nth-child(3n+2) td {
  background-color: #dfd4fb; /* Jaune */
}

.issueName:nth-child(3n+0) td {
  background-color: #fde791; /* Mauve */
}

table tr:hover td {
  background-color: #eaf4f8;
}

/* Boutons */
button {
  padding: 8px 16px;
  background-color: #b5cdbf;
  background-color: #b5cdbf;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 14px;
}

button:hover {
  background-color: #013238;
  background-color: #013238;
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
/* Boutons */
.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
  color: white;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn i {
  margin-right: 5px;
  font-size: 14px;
}

/* Modifier (bleu) */
.btn-edit {
  background-color: #013238;
  
  
}

.btn-edit:hover {
  background-color: #b5cdbf;
  transform: scale(1.05);
}

/* Supprimer (rouge) */
.btn-delete {
  background-color: #dc3545;
  margin-left: 8px;
}

.btn-delete:hover {
  background-color: #b52a37;
  transform: scale(1.05);
}

/* Voir (vert) */
.btn-view {
  background-color: #28a745;
}

.btn-view:hover {
  background-color: #218838;
  transform: scale(1.05);
}

</style>
