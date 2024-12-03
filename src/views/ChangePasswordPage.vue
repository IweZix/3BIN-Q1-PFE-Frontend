<script lang="ts">
/**
 * Import of AboutPage component
 */
import { renderPageTitle } from '@/utils/render/render';

import ChangePasswordPageInputComponent from '@/components/ChangePasswordPage/ChangePasswordPageInputComponent.vue';
// import AuthenticatedUser from '@/types/AuthenticatedUser';


export default {
  /**
   * Name of the component
   */
  name: 'ChangePasswordPage',
  components: {
    ChangePasswordPageInputComponent
  },
  data() {
    return {
      // user: AuthenticatedUser
      user : '',
      password : '',
      confirmPassword : '',
      isPasswordValid: false
    };
  },

  /**
   * Mounted lifecycle hook
   * This function is called when the component is mounted
   */
  mounted() {
    renderPageTitle('Change Password');
  },

  methods: {
    /**
     * Function to change the password
     */
    changePassword() {
      // Vérification si le mot de passe est valide
      if (!this.isPasswordValid) {
        alert('Veuillez corriger les erreurs de mot de passe.');
        return; // On arrête la fonction si le mot de passe est invalide
      }

      if (this.password === '' || this.confirmPassword === '') {
        // Display an error message
        alert('Veuillez remplir tous les champs');
        return;
      }
      // Check if the password and the confirm password are the same
      if (this.password === this.confirmPassword) {
        // Call the API to change the password
        // this.$api.auth.changePassword(this.user.id, this.password)
        //   .then(() => {
        //     // Redirect to the login page
        //     this.$router.push({ name: 'login' });
        //   })
        //   .catch((error) => {
        //     // Display an error message
        //     this.$toast.error(error.message);
        //   });
        alert('Mot de passe changé avec succès');
      } 
      else {
        alert('Les mots de passe ne correspondent pas');
      }
    },
    handlePasswordCheck(isValid: boolean) {
      this.isPasswordValid = isValid; 
    },
    
  },
};

</script>

<template>
  <div class="text-center my-4 title-search">
    <h1 class="title">Veuillez changer votre mot de passe</h1>
  </div>
  <div>
    <ChangePasswordPageInputComponent
      :password="password"
      :confirmPassword="confirmPassword"
      @update:password="password = $event"
      @update:confirmPassword="confirmPassword = $event"
      @checkPassword="handlePasswordCheck"
    />
  </div>
  <div class="text-center my-4">
    <button @click="changePassword" class="btn btn-primary" id="button">Changer le mot de passe</button>  
  </div>
  <div>
    <p>*champs obligatoires</p>
  </div>

</template>

<style>

.title {
  margin-top: 60px;
  margin-bottom: 70px;
}

#button {
  text-align: center;
  margin-top: 20px;
}

</style>