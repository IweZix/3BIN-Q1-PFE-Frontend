<script>
import { valitedForm } from '@/services/authAdminService';
import { answerForm } from '@/services/authCompanyService';

export default {
    data() {
        return {
            companyEmail: this.$route.params.email ,
            successMessage: '',
            errorMessage: '',
            questionsTable: [],
        };
    },
    methods: {
        async valitedForm() {
            console.log('Fetching validation data...');
            try {
                const response = await valitedForm(this.companyEmail);
                console.log("1111111111111111111111111111111111111111111111111111111111111111111111", valitedForm(this.companyEmail));
                this.questionsTable = response;
                this.successMessage = response.message;
                console.log(response, 'Data fetched successfully');
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Une erreur s\'est produite.';
                console.error('Error fetching data:', error);
            }
        }
    },
    mounted() {
        this.valitedForm();
    }
};
</script>

<template>
    <div>
        <h1>Validation Entreprise</h1>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

