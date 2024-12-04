<template>
    <button @click="handleClick" :disabled="disabled">Visualiser</button>
</template>

<script>
export default {
    props: {
        companyId: {
            type: Number,
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
                this.$emit('edit-company', this.companyId);
            }
        }
    }
};
</script>

<style scoped>
button {
    background-color: #4CAF50;
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