<script lang="ts">
export default {
  name: 'ChangePasswordPageInputComponent',
  props: {
    password: {
      type: String,
      required: true
    },
    confirmPassword: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localPassword: this.password,
      localConfirmPassword: this.confirmPassword, 
      showPassword: false,
      showConfirmPassword: false,
      passwordError: null as string | null
    };
  },
  watch: {
    // Mettez à jour les props si les variables locales changent
    localPassword(newValue: string) {
      this.$emit('update:password', newValue);
    },
    localConfirmPassword(newValue: string) {
      this.$emit('update:confirmPassword', newValue);
    }
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  }
};
</script>

<template>
  <div class="password-container">
    <div class="input-group">
      <h2>Mot de passe*</h2>
      <div class="input-wrapper">
        <input
          v-model="localPassword"
          :type="showPassword ? 'text' : 'password'"
          class="form-control"
          id="password"
          placeholder="Mot de passe"
          required
        />
        <button
          @click="togglePasswordVisibility"
          class="toggle-visibility-btn"
          type="button"
          aria-label="Afficher ou cacher le mot de passe"
        >
          <img
                v-if="showPassword"
                src="../../assets/icons/hide.png"
                alt="Afficher le mot de passe"
                class="visibility-icon"
              />
              <img
                v-else
                src="../../assets/icons/show.png"
                alt="Masquer le mot de passe"
                class="visibility-icon"
              />
        </button>
      </div>
      <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
    </div>
    <div class="input-group">
      <h2>Confirmation mot de passe*</h2>
      <div class="input-wrapper">
        <input
          v-model="localConfirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          class="form-control"
          id="password-confirm"
          placeholder="Confirmer le mot de passe"
          required
        />
        <button
          @click="toggleConfirmPasswordVisibility"
          class="toggle-visibility-btn"
          type="button"
          aria-label="Afficher ou cacher le mot de passe"
        >
          <img
            v-if="showConfirmPassword"
            src="../../assets/icons/hide.png"
            alt="Afficher le mot de passe"
            class="visibility-icon"
          />
          <img
            v-else
            src="../../assets/icons/show.png"
            alt="Masquer le mot de passe"
            class="visibility-icon"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.password-container {
  max-width: 500px; /* Largeur maximale pour le conteneur */
  margin: auto; /* Centrer le conteneur */
}

.input-group {
  margin-bottom: 20px; /* Espace entre chaque groupe */
  display: flex;
  flex-direction: column; /* Positionne le h2 au-dessus de l'input */
}

.input-group h2 {
  font-size: 20px; /* Taille augmentée pour les titres */
  margin-bottom: 10px; /* Espacement entre le titre et l'input */
  line-height: 1.4; /* Améliore la lisibilité */
}

.input-wrapper {
  position: relative; /* Nécessaire pour positionner l'icône correctement */
}

.form-control {
  width: 100%; /* Les champs occupent toute la largeur disponible */
  height: 50px; /* Augmente la hauteur des champs */
  padding: 10px 12px; /* Plus d'espace interne pour un confort visuel */
  font-size: 16px; /* Augmente la taille de la police */
  border: 1px solid #ccc; /* Ajout d'une bordure pour une meilleure visibilité */
  border-radius: 8px; /* Coins légèrement arrondis */
}

.toggle-visibility-btn {
  position: absolute;
  right: 12px; /* Distance du bord droit */
  top: 50%; /* Centre verticalement */
  transform: translateY(-50%);
  background: none; /* Suppression du fond */
  border: none; /* Suppression de la bordure */
  font-size: 18px; /* Taille de l'icône */
  cursor: pointer;
  user-select: none; /* Empêche la sélection du texte */
  color: #666; /* Couleur du bouton */
  padding: 0;
}

.visibility-icon {
  width: 30px;
  height: 30px;
}
</style>
