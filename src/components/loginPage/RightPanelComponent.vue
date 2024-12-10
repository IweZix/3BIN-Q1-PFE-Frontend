<script lang="ts">
import { defineComponent } from 'vue';
import { loginAdmin, checkPasswordUpdated } from '@/services/authAdminService';
import { loginCompany, checkPasswordUpdatedCompany } from '@/services/authCompanyService';

export default defineComponent({
  name: 'RightPanel',
  data() {
    return {
      email: '' as string,
      password: '' as string,
      showPassword: false
    };
  },
  methods: {
    async login() {
      try {
        const responseAdmin = await loginAdmin(this.email, this.password);
        if (responseAdmin?.token) {
          await this.handleLoginSuccess(responseAdmin, 'AdminHome', true);
          return;
        }
      } catch (error) {
        try {
          const responseCompany = await loginCompany(this.email, this.password);
          if (responseCompany?.token) {
            await this.handleLoginSuccess(responseCompany, 'CompanyHome', false);
            localStorage.setItem('company', JSON.stringify(responseCompany));
            return;
          }
        } catch (error) {
          const alert: HTMLElement | null = document.querySelector('.alert');
          if (alert) {
            alert.innerHTML = 'Invalid email or password ';
          }
        }
      }
    },
    async handleLoginSuccess(response: any, routeName: string, isAdmin: boolean) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.email);

      let isPasswordUpdated = false;
      if (isAdmin) {
        isPasswordUpdated = await checkPasswordUpdated(response.email);
      } else {
        isPasswordUpdated = await checkPasswordUpdatedCompany(response.email);
      }

      if (!isPasswordUpdated) {
        this.$router.push({ name: 'ChangePassword' });
      } else {
        this.$router.push({ name: routeName });
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  }
});
</script>

<template>
  <div class="right-panel">
    <h2>Connexion</h2>
    
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="Entrez votre email" v-model="email" required />

      <div class="input-group">
      <label for="password">Mot de passe</label>
      

      <div class="input-wrapper">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          placeholder="Entrez votre mot de passe"
          required
        />
        <button
          @click="togglePasswordVisibility"
          class="toggle-visibility-btn"
          type="button"
        >
          <img
            v-if="showPassword"
            src="@/assets/icons/show.png"
            class="visibility-icon"
          />
          <img
            v-else
            src="@/assets/icons/hide.png"
            class="visibility-icon"
          />
        </button>
      </div>
    </div>
      <button class="rightButton" type="submit">Connexion</button>
    </form>
    <div class="alert"></div>
  </div>
</template>

<style scoped>
.right-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f1e8cb;
  padding: 20px;
  border-radius: 5px;
  width: 50%;
   box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1); /* Ombre interne pour un effet de relief */
  transition: box-shadow 0.3s ease-in-out; /* Animation fluide pour l'ombre */
}

.right-panel h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  font-weight: bold;
}

button {
  background-color: #b5cdbf;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  width: auto;
  align-self: center;
  margin-top: 2em;
  font-weight: bold;
}

button:hover {
  background-color: #013238;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px 0 5px;
}

input {
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  background-color: white;
}

.alert {
  color: red;
  margin-top: 10px;
  
}


.visibility-icon {
  width: 30px;
  height: 30px;
  bottom: 20px;
  position: absolute;
  right: 10px
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

/* Input mot de passe */
.input-wrapper input {
  width: 100%; /* Laisser de l'espace pour le bouton */
  height: 50px;
  border-radius: 5px;
  font-size: 16px;
}

/* Bouton dans le champ */
.toggle-visibility-btn {
  position: absolute;
  right: 10px; /* Distance depuis le bord droit */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}



.input-group {
  margin-bottom: 20px; /* Espace entre chaque groupe */
  display: flex; /* Positionne le h2 au-dessus de l'input */
  flex-direction: column; 
}
</style>
