<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    credentials: {
      type: Object as PropType<{ email: string; password: string }>,
      required: true
    },
    successMessage: {
      type: String,
      default: ''
    }
  },
  methods: {
    copyToClipboard(text: string) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Identifiants copiés dans le presse-papiers');
      });
    }
  }
});
</script>

<template>
    <div class="credentials-section">
      <h2>Identifiants générés</h2>
      <p>Email : {{ credentials.email }}</p>
      <p>Mot de passe : {{ credentials.password }}</p>
      <button @click="copyToClipboard(`Email : ${credentials.email} \nMot de passe : ${credentials.password}`)">
        Copier les Identifiants
      </button>
    </div>
  </template>

<style scoped>
.credentials-section {
  margin-top: 20px;
  text-align: left;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.credentials-section h2 {
  margin-bottom: 10px;
}

.credentials-section p {
  margin: 5px 0;
  font-size: 16px;
}

.credentials-section button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #b5cdbf;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.credentials-section button:hover {
  background-color: #013238;
}
</style>