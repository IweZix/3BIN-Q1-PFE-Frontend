<script>
import { updateTemplate } from '@/services/templatesService';
export default {
  name: 'TemplateEdit',
  data() {
    return {
      templateName: '', // Nom du template
      errorMessage: '',
      successMessage: ''
    };
  },
  async mounted() {
    this.templateName = this.$route.params.templateName;
  },
  methods: {
    async saveTemplate() {
      try {
        // Appel d'une méthode pour mettre à jour le template
        await updateTemplate(this.$route.params.templateName, this.templateName);
        this.successMessage = 'Template mis à jour avec succès !';
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = 'Erreur lors de la mise à jour du template.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<template>
  <div class="template-edit">
    <h1>Modifier Template</h1>

    <!-- Affichage des erreurs -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <!-- Formulaire pour modifier le nom -->
    <form @submit.prevent="saveTemplate">
      <div class="form-group">
        <label for="template-name">Nom du Template :</label>
        <input id="_id" type="text" v-model="templateName" placeholder="Nom du Template" required />
      </div>
      <button type="submit" class="btn-primary">Enregistrer</button>
    </form>
  </div>
</template>

<style scoped>
.template-edit {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}

.success-message {
  color: green;
  margin-bottom: 10px;
}
</style>
