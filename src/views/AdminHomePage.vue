<script lang="ts">
import GetScoringCompanyButton from '@/components/buttons/GetScoringButtonComponent.vue';
import GetCompanyButton from '@/components/buttons/ValidatebyCompanyButtonComponent.vue';
import { getAllCompanies } from '@/services/companyService';
import { getScoringByEmail } from '@/services/scoringService';

export default {
  name: 'AdminHomePage',
  components: {
    GetScoringCompanyButton,
    GetCompanyButton
  },
  data() {
    return {
      companies: [] as Array<{ email: string; name: string; formIsComplete: boolean; isValidated: boolean,  totalTotal: number }>
    };
  },
  methods: {
    async getList() {
      try {
        const result = await getAllCompanies() as Array<{ email: string; name: string; formIsComplete: boolean; isValidated: boolean }>;
        for (let i = 0; i < result.length; i++) {
          this.companies.push({
            email: result[i].email,
            name: result[i].name,
            formIsComplete: result[i].formIsComplete,
            isValidated: result[i].isValidated,
            totalTotal: 0
          });
        }
        console.log(this.companies);
        // recup score
        for (let i = 0; i < this.companies.length; i++) {
          const response = await getScoringByEmail(this.companies[i].email);
          const scoringResponse = response as Array<{ totalTotal: number }>;
          this.companies[i].totalTotal = scoringResponse[0].totalTotal;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    shouldShowButtons(company: { formIsComplete: boolean; isValidated: boolean }): boolean {
      return company.formIsComplete && !company.isValidated;
    },
  },
  async mounted() {
    await this.getList();
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
          <tr v-for="company in companies" :key="company.email">
            <td>{{ company.name }}</td>
            <td>
              <span
                :class="{
                  badge: true,
                  'badge-green': company.formIsComplete,
                  'badge-red': !company.formIsComplete
                }"
              >
                {{ company.formIsComplete ? 'Oui' : 'Non' }}
              </span>
            </td>
            <td>
              <span
                :class="{
                  badge: true,
                  'badge-green': company.isValidated,
                  'badge-red': !company.isValidated
                }"
              >
                {{ company.isValidated ? 'Oui' : 'Non' }}
              </span>
            </td>
            <td>{{ company.totalTotal ?? '/' }}%</td>
            <td v-if="!company.isValidated">
              <GetCompanyButton
                :companyEmail="company.email"
                :disabled="!company.formIsComplete"
                :title="
                  company.formIsComplete
                    ? 'Valider réponses de l\'entreprise'
                    : 'Terminer avant d\'éditer'
                "
              />
            </td>
            <td v-if="company.isValidated">
              <GetScoringCompanyButton
                :companyEmail="company.email"
                :disabled="!company.isValidated"
                :title="
                  company.isValidated
                    ? 'Visualiser réponses de l\'entreprise'
                    : 'Terminer avant d\'éditer'
                "
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
  background-color: #b5cdbf;
}
button:hover {
  background-color: #013238;
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
