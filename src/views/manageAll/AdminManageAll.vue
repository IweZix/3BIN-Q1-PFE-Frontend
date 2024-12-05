<script>
import { getTemplates} from '@/services/templatesService';
import { getGroupIssues } from '@/services/groupIssuesService';
import { getIssues } from '@/services/issuesService';

export default {
  name: 'ManageAll',
  data() {
    return {
      templates: [], // Liste des templates
      groupIssues: [],
      issues:[]
    };
  },
  async mounted() {
    try {
      this.templates = await getTemplates(); 
      this.groupIssues = await getGroupIssues();
      this.issues = await getIssues();
    } catch (error) {
      console.error('Erreur lors du chargement des données', error);
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
    }
  }
};
</script>

<template>
    <div class="manage-container">
      <h1>Vue d'ensemble des catégories du scoring</h1>
  
      <!-- Section Templates -->
      <div class="dashboard-container">
        <h2>Templates</h2>
        <table>
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
              </td>
            </tr>
          </tbody>
        </table>
        <div class="add-template">
          <button @click="addTemplate">Ajouter un Template</button>
        </div>
      </div>
  
      <!-- Section Group Issues -->
      <div class="dashboard-container">
        <h2>Group Issues et Issues</h2>
        <table>
          <thead>
            <tr>
              <th>Nom du Group Issue</th>
              <th>Voir Issues</th>
              <th>Modifier</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="groupIssue in groupIssues" :key="groupIssue.id">
              <td>{{ groupIssue.name }}</td>
              <td>
                <button @click="viewIssues(groupIssue.id)">Voir</button>
              </td>
              <td>
                <button @click="editGroupIssue(groupIssue.id)">Modifier</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="add-group-issue">
          <button @click="addGroupIssue">Ajouter un Group Issue</button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .manage-container {
    padding: 20px;
  }
  
  h1, h2 {
    color: #013238;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  button {
    padding: 8px 16px;
    background-color: #013238;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .add-template, .add-group-issue {
    margin-top: 20px;
    text-align: right;
  }
  
  .dashboard-container {
    margin-bottom: 40px;
  }
  
  .dashboard-container h2 {
    margin-bottom: 10px;
  }
  </style>
  