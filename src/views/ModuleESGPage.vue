<script lang="ts">
import LeftNavBarComponent from '@/components/moduleESGPage/LeftNavBarComponent.vue';



export default {
  name: 'LoginPage',
  components: {
    LeftNavBarComponent
  },
  data() {
    return {
      categoryTable: [
        {
          category: 'Environnement',
          subCategories: ['Énergie & Carbone', 'Eau, Matières & Fournitures', 'Déchets', 'Écosystèmes & Biodiversité'],
        },
        {
          category: 'Social',
          subCategories: ['Diversité, Inclusion & Équite', 'Sécurité, Santé & Bien-être', 'Emploi & Pratiques de travail', 'Engagement civique'],
        },
        {
          category: 'Gouvernance',
          subCategories: ['Conduite des affaires', 'Éthique des affaires', 'Protection des données', 'Certifications'],
        },
      ],
    };
  },
};

</script>
 
<template>
  <div>
    <LeftNavBarComponent :categoryTable="categoryTable" />
  </div>
</template>