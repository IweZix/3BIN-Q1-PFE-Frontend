<script lang="ts">
export default {
  name: 'GetCompanyButton',
  props: {
    companyEmail: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick() {

    console.log("Component button:",this.companyEmail);
      this.$router.push({
        name: 'answerFormUser',
        params: { email: this.companyEmail }
      });
}
  },
};
</script>

<template>
  <button @click="handleClick">Valider</button>
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
