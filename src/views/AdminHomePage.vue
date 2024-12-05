<script lang="ts">

import GetCompanyButton from '../components/buttons/GetCompanyButtonComponent.vue';

export default {
    name: 'AdminHomePage',
    components: {
        GetCompanyButton
    },
    data() {
        return {
            companies: [
                { id: 1, name: 'Entreprise A', completed: true, validated: false, score: 85 },
                { id: 2, name: 'Entreprise B', completed: false, validated: false, score: null },
                // Ajoutez plus d'entreprises ici
            ]
        };
    },
    methods: {
        editCompany(id) {
            // Logique pour modifier l'entreprise
            console.log(`Modifier l'entreprise avec l'ID: ${id}`);
        }
    }
};
</script>

<template>
    <div class="admin-home-page">
        <h1>Liste des entreprises</h1>
        <div class="table-container">
            <table class="company-table">
                <thead>
                    <tr>
                        <th>Nom Entreprise</th>
                        <th>Terminé</th>
                        <th>Validé</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="company in companies" :key="company.id">
                        <td>{{ company.name }}</td>
                        <td>
                            <span 
                                :class="{'badge': true, 'badge-green': company.completed, 'badge-red': !company.completed}">
                                {{ company.completed ? 'Oui' : 'Non' }}
                            </span>
                        </td>
                        <td>
                            <span 
                                :class="{'badge': true, 'badge-green': company.validated, 'badge-red': !company.validated}">
                                {{ company.validated ? 'Oui' : 'Non' }}
                            </span>
                        </td>
                        <td>{{ company.score ?? "/" }}</td>
                        <td>
                            <GetCompanyButton 
                                :companyId="company.id" 
                                @edit-company="editCompany" 
                                :disabled="!company.completed"
                                :title="company.completed ? 'Visualiser réponses de l\'entreprise' : 'Terminer avant d\'éditer'" 
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
/* Global page styles */
.admin-home-page {
    padding: 20px;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
}

/* Table container */
.table-container {
    overflow-x: auto;
}

/* Table styles */
.company-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.company-table th,
.company-table td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: left;
}

.company-table th {
    background-color: #025959;
    color: white;
    text-transform: uppercase;
    font-size: 14px;
}

.company-table tbody tr:nth-child(even) {
    background-color: #f8f8f8;
}

/* Badge styles for statuses */
.badge {
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    text-align: center;
    display: inline-block;
}

.badge-green {
    background-color: #28a745;
    color: white;
}

.badge-red {
    background-color: #dc3545;
    color: white;
}

/* Button styles */
button {
    cursor: pointer;
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    color: white;
}

button[disabled] {
    cursor: not-allowed;
    background-color: #ccc;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .company-table th,
    .company-table td {
        font-size: 14px;
    }
}
</style>
