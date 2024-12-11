<script>
import { createTemplate } from '@/services/templatesService';
import BackManageAllBoutonComponent from '@/components/buttons/BackManageAllBoutonComponent.vue';

export default {
  name: 'TemplateAdd',
  components: {
    BackManageAllBoutonComponent
  },
  data() {
    return {
      templateName: '', // Nom du nouveau template
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    back(){
      this.$router.push('/manageAll');
    },
    async saveTemplate() {
      try {
        // Validation simple (le nom ne doit pas être vide)
        if (this.templateName.trim() === '') {
          this.errorMessage = 'Le nom du template est requis.';
          return;
        }

        // Appel du service pour créer le template
        await createTemplate(this.templateName);

        // Réinitialisation des champs et affichage du message de succès
        this.successMessage = 'Template créé avec succès !';
        this.errorMessage = '';
        this.templateName = '';
      } catch (error) {
        this.errorMessage = 'Erreur lors de la création du template.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<template>
  <div class="button-back">
    <BackManageAllBoutonComponent />
  </div>
  

  <div class="template-add">
    <h1>Créer un nouveau Template</h1>

    <!-- Affichage des messages d'erreur et de succès -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <!-- Formulaire pour ajouter un template -->
    <form @submit.prevent="saveTemplate">
      <div class="form-group">
        <label for="template-name">Nom du Template :</label>
        <input
          id="template-name"
          type="text"
          v-model="templateName"
          placeholder="Nom du Template"
          required
        />
      </div>
      <button type="submit" class="btn-primary">Créer</button>
    </form>
  </div>
</template>

<style scoped>
.template-add {
  max-width: 400px;
  margin: 20px auto;
  margin-top: 50px;
  padding: 20px;
  background-color: #faf5dc;
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
  background-color: #b5cdbf;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #013238;
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
