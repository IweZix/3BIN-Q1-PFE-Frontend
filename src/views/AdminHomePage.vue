<template>
    <div class="admin-home-page">
        <h1>Liste des entreprises</h1>
        <table class="company-table">
            <thead>
                <tr>
                    <th>Nom Entreprise</th>
                    <th>Terminé</th>
                    <th>Validé</th>
                    <th>Score</th>
                    <th>Visualiser</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="company in companies" :key="company.id">
                    <td>{{ company.name }}</td>
                    <td :class="{'bg-green': company.completed, 'bg-red': !company.completed}">
                        {{ company.completed ? 'Oui' : 'Non' }}
                    </td>
                    <td :class="{'bg-green': company.validated, 'bg-red': !company.validated}">
                        {{ company.validated ? 'Oui' : 'Non' }}
                    </td>
                    <td>{{ company.score ?? "/" }}</td>
                    <td>
                        <ButtonEditCompany :companyId="company.id" @edit-company="editCompany" :disabled="!company.completed" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import ButtonEditCompany from '@/components/buttons/GetCompanyButtonComponent.vue';

export default {
    components: {
        ButtonEditCompany
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

<style scoped>
.admin-home-page {
    padding: 20px;
}

.company-table {
    width: 100%;
    border-collapse: collapse;
}

.company-table th,
.company-table td {
    border: 1px solid #ddd;
    padding: 8px;
}

.company-table th {
    background-color: #f2f2f2;
    text-align: left;
}

.bg-green {
    background-color: rgba(75, 160, 75, 0.562);
}

.bg-red {
    background-color: rgba(241, 35, 35, 0.555);
}
</style>