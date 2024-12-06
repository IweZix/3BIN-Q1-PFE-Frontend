<script lang="ts">

export default {
    name: 'GetScoringCompanyButton',
    props: {
        companyEmail: {
            type: String,
            required: true
        },
    },
    methods: {
        async handleClick() {
            // redirect to page : /scoring with the Company Email
            this.$router.push({
                name: 'scoringCompany',
                params: { email: this.companyEmail } });
        }
    }
};
</script>

<template>
    <button @click="handleClick">Visualiser détails</button>
</template>

<style scoped>
button {
    background-color: #013238;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

button:hover:enabled {
    background-color: #45a049;
}
</style>