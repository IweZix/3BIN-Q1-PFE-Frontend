<script lang="ts">
export default {
  name: 'LeftNavBarComponent',
  props: {
    categorie: {
      type: String,
      required: true,
    },
    sousCategorie: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localCategorie: this.categorie,  // Crée une variable locale pour la categorie
      localSousCategorie: this.sousCategorie,  // Crée une variable locale pour la confirmation
      showPassword: false,
      showConfirmPassword: false,
      passwordError: null as string | null,
    };
  },
  watch: {
    // Mettez à jour les props si les variables locales changent
    localPassword(newValue: string) {
      this.$emit('update:password', newValue);
      this.checkPassword(newValue);
    },
    localConfirmPassword(newValue: string) {
      this.$emit('update:confirmPassword', newValue);
    },
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    checkPassword(input: string) {
      let errorMessage = '';

      // Vérification de la longueur
      if (input.length < 6) {
        errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
      }

      // Vérification de la présence d'une majuscule
      if (!/[A-Z]/.test(input)) {
        errorMessage = 'Le mot de passe doit contenir au moins une majuscule.';
      }

      // Vérification de la présence d'un caractère spécial
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(input)) {
        errorMessage = 'Le mot de passe doit contenir au moins un caractère spécial.';
      }

      this.passwordError = errorMessage;
      this.$emit('checkPassword', !errorMessage);
    }
  }
};
</script>