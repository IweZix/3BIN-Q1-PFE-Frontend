<script lang="ts">
import { renderPageTitle } from '@/utils/render/render';

export default {
  name: 'CreateCredentials',
  mounted() {
    renderPageTitle('CreateCredentials');
  },
  methods: {
    navigateTo(option: string) {
      if (option === 'option1') {
        this.$router.push('/createAdmin');
      } else if (option === 'option2') {
        this.$router.push('/createCompany');
      }
    }
  }
};
</script>

<template>
  <div class="admin-create-credentials">
    <h1>Créer un compte</h1>
    <p>Choisissez le type de compte que vous souhaitez créer parmi les options ci-dessous.</p>
    <div class="options">
      <button @click="navigateTo('option1')" aria-label="Créer un compte administrateur">
        <span class="icon">&#128100;</span>
        <!-- Exemple d'icône -->
        Un administrateur
      </button>
      <button @click="navigateTo('option2')" aria-label="Créer un compte entreprise">
        <span class="icon">&#127970;</span>
        <!-- Exemple d'icône -->
        Une entreprise
      </button>
    </div>
  </div>
</template>

<style scoped>
.admin-create-credentials {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;
  background-color: #f5f5f5;
  text-align: center;
}

h1 {
  margin-bottom: 10px;
  font-size: 28px;
  color: #333;
  font-weight: bold;
}

p {
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
}

.options {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 25px;
  font-size: 16px;
  color: #fff;
  background-color: #31c46e;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #218c54;
  transform: translateY(-2px);
}

button:active {
  background-color: #004080;
  transform: translateY(0);
}

.icon {
  font-size: 20px;
}
</style>
