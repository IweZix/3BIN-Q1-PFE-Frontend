<script lang="ts">
import { renderPageTitle } from '@/utils/render/render';
import ChangePasswordPageInputComponent from '@/components/ChangePasswordPage/ChangePasswordPageInputComponent.vue';
import { changepasswordCompany } from '@/services/authCompanyService';
import { updatePasswordAdmin } from '@/services/authAdminService';

export default {
  name: 'ChangePasswordPage',
  components: {
    ChangePasswordPageInputComponent
  },
  data() {
    return {
      user: '',
      password: '',
      confirmPassword: '',
      isPasswordValid: false,
      errorMessage: '',
      successMessage: '',
    };
  },
  mounted() {
    renderPageTitle('Change Password');
  },
  methods: {
    async changePassword() {
      
      this.errorMessage = '';
      this.successMessage = '';
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
        return;
      }
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const responseAdmin = await updatePasswordAdmin(token, this.password);
          if (responseAdmin) {
            this.successMessage = 'Votre mot de passe a été changé avec succès.';
            return;
          }
          try {
            const responseCompany = await changepasswordCompany(token, this.password);
            if (responseCompany) {
              this.successMessage = 'Votre mot de passe a été changé avec succès.';
              return;
            }
          } catch (error) {
            this.errorMessage = 'Une erreur s\'est produite lors de la modification de votre mot de passe.';
          }
        } else {
          this.errorMessage = 'Token non trouvé.';
        }
      } catch (error) {
        this.errorMessage = 'Une erreur s\'est produite lors de la modification de votre mot de passe.';
      }
    },

  },
};
</script>

<template>
  <div class="change-password-page">
    <div class="card">
      <div class="header">
        <h1>Changer votre mot de passe</h1>
        <p>Pour des raisons de sécurité, veuillez utiliser un mot de passe fort.</p>
      </div>

      <div class="form">
        <ChangePasswordPageInputComponent
          :password="password"
          :confirmPassword="confirmPassword"
          @update:password="password = $event"
          @update:confirmPassword="confirmPassword = $event"
        />
      </div>

      <div class="feedback">
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      </div>

      <div class="actions">
        <button @click="changePassword" class="btn btn-primary">Confirmer</button>
      </div>

      <div class="note">
        <p>* Tous les champs sont obligatoires</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.change-password-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.card {
  background-color: #fde7917c; 
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre subtile */
  max-width: 600px;
  width: 100%;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.header p {
  font-size: 16px;
  color: #666;
}

.form {
  margin-bottom: 20px;
}

.feedback {
  margin-bottom: 20px;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}

.success-message {
  color: green;
  font-size: 14px;
  text-align: center;
}

.actions {
  margin-bottom: 20px;
  text-align: center;
}

.actions .btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #013238;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #004d00;
}

.note {
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
