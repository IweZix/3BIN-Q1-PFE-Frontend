<script>
import { getScoringByEmail } from '@/services/scoringService';
import { getIssues } from '@/services/issuesService';

export default {
  data() {
    return {
      companyEmail: this.$route.params.email,
      scoreTotalNow: 0,
      scoreTotalEngagement: 0,
      scoreTotalTotal: 0,
      // issues
      issues: [],
      issuesList: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await getScoringByEmail(this.companyEmail);
        this.scoreTotalNow = response[0].scoreTotalNow;
        this.scoreTotalEngagement = response[0].scoreTotal2Years;
        this.scoreTotalTotal = response[0].totalTotal;
        for (let i = 0; i < response[0].issuesList.length; i++) {         
          this.issues.push({
            id: i,
            name: '',
            scoreTotalNow: response[0].issuesList[i].scoreTotalNow,
            scoreTotal2Years: response[0].issuesList[i].scoreTotal2Years
          });
        }
        // issues
        const responseIssues = await getIssues();
        for (let i = 0; i < responseIssues.length; i++) {
          this.issuesList.push({
            _id: i,
            name: responseIssues[i].issueName
          });
        }
        for (let i = 0; i < this.issues.length; i++) {
          for (let j = 0; j < this.issuesList.length; j++) {
            if (this.issues[i].id === this.issuesList[j]._id) {
              this.issues[i].name = this.issuesList[j].name;
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>

<template>
  <div class="details-scoring-page">
    <h1>Scoring de {{ companyEmail }}</h1>

    <!-- Informations sur l'entreprise -->
    <div class="table-container">
      <h2>Résumé des scores</h2>
      <table class="company-table">
        <thead>
          <tr>
            <th>Score Now</th>
            <th>Score Engagement</th>
            <th>Score Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span
              :class="{
                badge: true,
                'badge-green': scoreTotalNow > 45,
                'badge-red': scoreTotalNow <= 45
              }">
              {{ scoreTotalNow }}
              </span>
            </td>
            <td>
              <span
              :class="{
                badge: true,
                'badge-green': scoreTotalEngagement > 45,
                'badge-red': scoreTotalEngagement <= 45
              }">
                {{ scoreTotalEngagement }}
              </span>
            </td>
            <td>
              <span
              :class="{
                badge: true,
                'badge-green': scoreTotalTotal > 45,
                'badge-red': scoreTotalTotal <= 45
              }">
                {{ scoreTotalTotal }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Liste des issues -->
    <div class="table-container mt-4">
      <h2>Scores par enjeux</h2>
      <table class="company-table">
        <thead>
          <tr>
            <th>Enjeux</th>
            <th>Score Now</th>
            <th>Score Engagement</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="issue in issues" :key="issue.id">
            <td>{{ issue.name }}</td>
            <td>
                {{ issue.scoreTotalNow }}
            </td>
            <td>
              {{ issue.scoreTotal2Years }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>
/* Page styling */
.details-scoring-page {
  padding: 20px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

/* Table container */
.table-container {
  margin-top: 20px;
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

/* Badge styles */
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .company-table th,
  .company-table td {
    font-size: 14px;
  }
}

.mt-4 {
  margin-top: 16px;
}
</style>
