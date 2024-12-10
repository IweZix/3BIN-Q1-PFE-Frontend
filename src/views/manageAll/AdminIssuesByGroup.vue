<script>
import { getIssuesByGroup } from '@/services/issuesService';
import { deleteIssue } from '@/services/issuesService';


export default {
    name: 'IssuesByGroup',
    data() {
        return {
            isLoading: true, // Indicateur de chargement
            errorMessage: '', // Message d'erreur global
            groupIssueName: '', // Nom du groupe de problèmes
            issuesByGroup: [], // Liste des problèmes
        };
    },
    async mounted() {
        this.groupIssueName = this.$route.params.groupIssueName;
        console.log(this.groupIssueName, 'groupIssueName');
        try {
            // Charger les problèmes par groupe
            this.issuesByGroup = await getIssuesByGroup(this.groupIssueName);
            this.isLoading = false; // Chargement terminé
        } catch (error) {
            this.errorMessage = 'Erreur lors du chargement des problèmes.';
        }
    },
methods: {
    addIssue() {
        this.$router.push(`/admin/add-issue/${this.groupIssueName}`);
    },
    editIssue(issueName) {
        this.$router.push(`/admin/edit-issue/${issueName}`);
    },
    async deleteIssue(issueName) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce problème ?')) {
            try {
                // Appel du service pour supprimer le problème
                await deleteIssue(issueName);
                this.issuesByGroup = this.issuesByGroup.filter((issue) => issue.issueName !== issueName);
            } catch (error) {
                this.errorMessage = 'Erreur lors de la suppression du problème.';
            }
        }
    }
}
};
</script>

<template>
    <div class="admin-issues-by-group mt-3">
        <h1>Gestion des Enjeux dans <span class="highlighted-group">{{ groupIssueName }}</span></h1>
        <!-- Indicateur de chargement -->
        <p v-if="isLoading" class="loading-message">Chargement des données...</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <!-- tableau des issues -->
         <div v-if="!isLoading" class="dashboard-container">
            <table v-if="issuesByGroup.length">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="issue in issuesByGroup" :key="issue.issueName">
                        <td>{{ issue.issueName }}</td>
                        <td>
                            <button class="btn btn-edit" @click="editIssue(issue.issueName)" >
                                <i class="fas fa-edit"></i>Modifier</button>
                            <button class="btn btn-delete" @click="deleteIssue(issue.issueName)" >
                                <i class="fas fa-trash-alt"></i>Supprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="add-issue">
                <button class="btn btn-primary" @click="addIssue">
                    <i class="fas fa-plus"></i>Ajouter un Enjeu à cette catégorie</button>
            </div>
         </div>

    </div>
</template>

<style scoped >
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
.highlighted-group {
   font-weight: 900; /* Texte ultra-gras */
  font-size: 1em; 
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
  color: white;
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