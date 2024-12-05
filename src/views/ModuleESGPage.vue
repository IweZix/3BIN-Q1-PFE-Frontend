<script lang="ts">
import LeftNavBarComponent from '@/components/moduleESGPage/LeftNavBarComponent.vue';
import QuestionComponent from '@/components/moduleESGPage/QuestionComponent.vue';


export default {
  name: 'ModuleESGPage',
  components: {
    LeftNavBarComponent,
    QuestionComponent,
  },
  data() {
    return {
      categoryTable: [
        {
          category: 'Environnement',
          subCategories: [
            { id: 1, name: 'Énergie & Carbone' },
            { id: 2, name: 'Eau, Matières & Fournitures' },
            { id: 3, name: 'Déchets' },
            { id: 4, name: 'Écosystèmes & Biodiversité' }
          ]
        },
        {
          category: 'Social',
          subCategories: [
            { id: 5, name: 'Diversité, Inclusion & Équité' },
            { id: 6, name: 'Sécurité, Santé & Bien-être' },
            { id: 7, name: 'Emploi & Pratiques de travail' },
            { id: 8, name: 'Engagement civique' }
          ]
        },
        {
          category: 'Gouvernance',
          subCategories: [
            { id: 9, name: 'Conduite des affaires' },
            { id: 10, name: 'Éthique des affaires' },
            { id: 11, name: 'Protection des données' },
            { id: 12, name: 'Certifications' }
          ]
        }
      ],
      selectedSubCategoryId: 0}

    },
  
  methods: {

  selectSubCategory(id: number) {
      this.selectedSubCategoryId = id;
    },
  },

};

</script>
 
<template>
  <div class="row align-items-start">
    <div class="col-3">
      <div class="left-nav-bar">
        <LeftNavBarComponent :categoryTable="categoryTable" :selectedSubCategoryId="selectedSubCategoryId" @selectSubCategory="selectSubCategory" />
      </div>
    </div>
    
    <div class="col-9">
      <QuestionComponent  />

      
    </div>
  </div>
</template>




<style>
.leftNavbarComponent {
  position: sticky;
  width: 250px;  
  height: 100%;  
  z-index: 1000;  

}


</style>