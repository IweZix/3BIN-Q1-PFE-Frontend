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
      selectedSubCategoryId: 0, 
      questionsTable: [
        {
          idCategory: 1,  // Identifiant de catégorie
          subCategories: 1,  // Identifiant de sous-catégorie
          idQuestion: 1,  // Identifiant de question
          nomQuestion: 'Suivez-vous la consommation d\'énergie de XXX?',
          numReponse: [1, 2],  // Identifiants des réponses (1 = Oui, 2 = Non)
          template: '0',  // Modèle de question
          answers: [
            {
              answer: 'Oui',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '2',
              point2: '0.5',
            },
            {
              answer: 'Non',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
          ],
          scoreTotal: '1',
        },
        {
          idCategory: 1,
          subCategories: 1,
          idQuestion: 2,
          nomQuestion: 'Si vous la suivez, veuillez indiquer votre consommation d\'énergie totale des 12 derniers mois (en kWh)',
          numReponse: [1],
          template: '0',
          answers: [
            {
              answer: '',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
          ],
          scoreTotal: '0',
        },
        {
          idCategory: 1,
          subCategories: 1,
          idQuestion: 3, 
          nomQuestion: 'Avez-vous un contrat vert avec votre fournisseur d\'énergie ?',
          numReponse: [1, 2, 3, 4],  // Identifiants des réponses
          template: '1',
          answers: [
            {
              answer: 'Oui',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '1',
              point2: '0.25',
            },
            {
              answer: 'Non',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
            {
              answer: 'Je ne sais pas',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
            {
              answer: 'N/A',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0.5',
              point2: '0',
            },
          ],
          scoreTotal: '0.5',
        },
        {
          idCategory: 1,
          subCategories: 1,
          idQuestion: 4, 
          nomQuestion: 'Produisez-vous de l\'électricité sur site (par exemple, avec des panneaux solaires) ?',
          numReponse: [1, 2, 3, 4],
          template: '1',
          answers: [
            {
              answer: 'Oui',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '1',
              point2: '0.25',
            },
            {
              answer: 'Non',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
            {
              answer: 'Je ne sais pas',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
            {
              answer: 'N/A',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0.5',
              point2: '0',
            },
          ],
          scoreTotal: '0.5',
        },
        {
          idCategory: 1,
          subCategories: 1,
          idQuestion: 5, 
          nomQuestion: 'Qu\'avez-vous mis en place pour limiter votre consommation d\'énergie ? Veuillez sélectionner toutes les réponses applicables.',
          numReponse: [1, 2, 3, 4, 5, 6, 7, 8],
          template: '1',
          answers: [
            {
              answer: 'Nous avons investi dans des équipements de bureau économes en énergie, notamment des ordinateurs, des imprimantes, etc.',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '1',
              point2: '0.25',
            },
            {
              answer: 'Nous avons remplacé les ampoules traditionnelles par des ampoules LED à haut rendement énergétique afin de réduire la consommation d\'électricité.',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '1',
              point2: '0.25',
            },
            {
              answer: 'Nous avons installé des thermostats intelligents pour optimiser les systèmes de chauffage, de ventilation et de climatisation (CVC) en vue d\'une meilleure efficacité énergétique.',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '1',
              point2: '0.25',
            },
            {
              answer: 'Nous réalisons régulièrement des audits énergétiques afin d\'identifier les points à améliorer et d\'optimiser notre consommation d\'énergie.',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '1',
              point2: '0.25',
            },
            {
              answer: 'Nous avons installé des détecteurs de présence pour l\'éclairage et les systèmes CVC afin d\'ajuster automatiquement la consommation en fonction des niveaux d\'occupation.',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '1',
              point2: '0.25',
            },
            {
              answer: 'Autre : veuillez expliquer dans les commentaires',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
            {
              answer: 'Aucune de ces réponses.',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
            {
              answer: 'N/A',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '2.5',
              point2: '0',
            },
          ],
          scoreTotal: '2.5',
        },
        {
          idCategory: 1,
          subCategories: 1,
          idQuestion: 6, 
          nomQuestion: 'Avez-vous mis en place des initiatives pour sensibiliser vos travailleur·euses sur les bonnes pratiques en matière de consommation d\'énergie ?',
          numReponse: [1, 2, 3],
          template: '2',
          answers: [
            {
              answer: 'Oui',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '1',
              point2: '0.25',
            },
            {
              answer: 'Non',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
            {
              answer: 'N/A - Nous n\'avons pas de travailleur·euses.',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
          ],
          scoreTotal: '0.5',
        },
        {
          idCategory: 2,
          subCategories: 1,
          idQuestion: 7, 
          nomQuestion: 'Avez-vous calculé l\'empreinte carbone des activités de XXX ?',
          numReponse: [1, 2, 3],
          template: '',
          answers: [
            {
              answer: 'Oui, pour les Scopes 1 & 2 (les émissions de gaz à effet de serre directes et indirectes liées à notre consommation d\'énergie).',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0.5',
              point2: '0.13',
            },
            {
              answer: 'Oui, pour le Scope 3 (toutes les émissions de GES indirectes liées à nos activités).',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '1.5',
              point2: '0.38',
            },
            {
              answer: 'Non',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
          ],
          scoreTotal: '1',
        },
        {
          idCategory: 2,
          subCategories: 1,
          idQuestion: 8, 
          nomQuestion: 'Si vous la calculez, veuillez indiquer votre empreinte carbone de Scope 1 (en tonnes de CO2 équivalent) :',
          numReponse: [1],
          template: '0',
          answers: [
            {
              answer: '',
              comment: '',
              now: false,
              twoYears: false,
              pointN: '0',
              point2: '0',
            },
          ],
          scoreTotal: '0',
        },
]

    };
  },
  methods: {
  handleCancel() {
    console.log("Modifications annulées");
  },

 handleSave() {
    this.questionsTable.forEach(question => {
      question.answers.forEach(answer => {
        // Vérifier si l'une des cases a été cochée
        if (answer.now || answer.twoYears) {
          console.log(`Question ID: ${question.idQuestion} - ${question.nomQuestion}`);
          
          // Afficher la réponse cochée et si c'est "Aujourd'hui" ou "Dans 2 ans"
          if (answer.now) {
            console.log(`  Réponse cochée pour aujourd'hui: ${answer.answer}`);
          }

          if (answer.twoYears) {
            console.log(`  Réponse cochée pour dans 2 ans: ${answer.answer}`);
          }

          // Optionnel : afficher le commentaire
          if (answer.comment) {
            console.log(`  Commentaire: ${answer.comment}`);
          }
        }
      });
    });
    console.log("Modifications enregistrées");
  },
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
      <QuestionComponent :questionsTable="questionsTable" />

      <div class="mt-3 d-flex justify-content-end">
        <button class="btn btn-secondary me-2" @click="handleCancel">Annuler</button>
        <button class="btn btn-primary" @click="handleSave">Enregistrer</button>
      </div>
    </div>
  </div>
</template>




<style>
.leftNavbarComponent {
  position: sticky;
  width: 250px;  /* Ajuste la largeur selon tes besoins */
  height: 100%;  /* Elle prendra toute la hauteur de la section parent */
  z-index: 1000;  /* Assure-toi qu'elle soit au-dessus des autres éléments */

}


</style>