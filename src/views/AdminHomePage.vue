<script lang="ts">

import GetScoringCompanyButton from '@/components/buttons/GetScoringButtonComponent.vue';
import ValidatebyCompanyButton from '@/components/buttons/ValidatebyCompanyButtonComponent.vue';

export default {
    name: 'AdminHomePage',
    components: {
        GetScoringCompanyButton,
        ValidatebyCompanyButton
    },
    data() {
        return {
            companies: [
                { id: 1, name: 'Entreprise A', email: "37pallele@hotmail.com", isCompleted: true, isValidated: false, score: 85 },
                { id: 2, name: 'Entreprise B', email: "test@test.com", isCompleted: false, isValidated: false, score: null },
                { id: 3, name: 'Entreprise C', email: "contact@steam.com", isCompleted: true, isValidated: true, score: 92 },
                // Ajoutez plus d'entreprises ici
            ]
        };
    },
    methods: {
        validateCompanyForm(id: number) {
            // Logique pour modifier l'entreprise
            console.log(`Modifier l'entreprise avec l'ID: ${id}`);

        },
        getScoringCompany(id: number) {
            // Logique pour obtenir le score de l'entreprise
            console.log(`Obtenir le score de l'entreprise avec l'ID: ${id}`);
        },
        shouldShowButtons(company: { isCompleted: boolean, isValidated: boolean }) {
            return company.isCompleted && !company.isValidated;
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
                                :class="{'badge': true, 'badge-green': company.isCompleted, 'badge-red': !company.isCompleted}">
                                {{ company.isCompleted ? 'Oui' : 'Non' }}
                            </span>
                        </td>
                        <td>
                            <span 
                                :class="{'badge': true, 'badge-green': company.isValidated, 'badge-red': !company.isValidated}">
                                {{ company.isValidated ? 'Oui' : 'Non' }}
                            </span>
                        </td>
                        <td>{{ company.score ?? "/" }}</td>
                        <td v-if="!company.isValidated">
                            <ValidatebyCompanyButton 
                                :companyEmail="company.email" 
                                @edit-company="validateCompanyForm" 
                                :disabled="!company.isCompleted"
                                :title="company.isCompleted ? 'Valider réponses de l\'entreprise' : 'Terminer avant d\'éditer'" 
                            />
                        </td>
                        <td v-if="company.isValidated">
                            <GetScoringCompanyButton 
                                :companyEmail="company.email" 
                                @edit-company="getScoringCompany" 
                                :disabled="!company.isValidated"
                                :title="company.isValidated ? 'Visualiser réponses de l\'entreprise' : 'Terminer avant d\'éditer'" 
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
