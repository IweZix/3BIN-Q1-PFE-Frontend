<script lang="ts">

export default {
    name: 'GetCompanyButton',
    props: {
        companyEmail: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            if (!this.disabled) {
                this.$emit('edit-company', this.companyEmail);
            }
        }
    }
};
</script>

<template>
    <button @click="handleClick" :disabled="disabled">Valider</button>
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