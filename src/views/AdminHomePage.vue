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
                    <th>Modifier</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="company in companies" :key="company.id">
                    <td>{{ company.name }}</td>
                    <td>{{ company.completed ? 'Oui' : 'Non' }}</td>
                    <td>{{ company.validated ? 'Oui' : 'Non' }}</td>
                    <td>{{ company.score }}</td>
                    <td><button @click="editCompany(company.id)">Modifier</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            companies: [
                { id: 1, name: 'Entreprise A', completed: true, validated: false, score: 85 },
                { id: 2, name: 'Entreprise B', completed: false, validated: true, score: 90 },
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

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>