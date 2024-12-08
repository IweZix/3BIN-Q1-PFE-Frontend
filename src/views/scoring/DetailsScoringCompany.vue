<script>
import { getScoringByEmail } from '@/services/scoringService';
import { getIssues } from '@/services/issuesService';

export default {
    data() {
        return {
            companyEmail:this.$route.params.email,
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
                this.companyEmail = response[0].companyEmail;
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
                        name: responseIssues[i].name
                    });
                }
                for (let i = 0; i < this.issues.length; i++) {
                    for (let j = 0; j < this.issuesList.length; j++) {
                        if (this.issues[i].id === this.issuesList[j]._id ) {
                            this.issues[i].name = this.issuesList[j].name;
                        }
                    }
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
};
</script>

<template>
    <div>
        <h1>Details Scoring Company</h1>
        <h2>Company Information</h2>
        <table>
            <thead>
                <tr>
                    <th>Email de l'entreprise</th>
                    <th>Score Now</th>
                    <th>Score Engagement</th>
                    <th>Score Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ companyEmail }}</td>
                    <td>{{ scoreTotalNow }}</td>
                    <td>{{ scoreTotalEngagement }}</td>
                    <td>{{ scoreTotalTotal }}</td>
                </tr>
            </tbody>
        </table>

        <h2>Issues</h2>
        <table>
            <thead>
                <tr>
                    <th>Issue</th>
                    <th>Score Now</th>
                    <th>Score Engagement</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="issue in issues" :key="issue.id">
                    <td>{{ issue.name }}</td>
                    <td>{{ issue.scoreTotalNow }}</td>
                    <td>{{ issue.scoreTotal2Years }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
    text-align: left;
}
</style>