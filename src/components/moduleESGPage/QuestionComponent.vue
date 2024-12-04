<script lang="ts">
import { PropType } from 'vue';

interface Question {
  idCategory: number;      // Liste des identifiants de catégories
  subCategories: number;
  idQuestion: number;   // Liste des sous-catégories
  nomQuestion: string;       // Intitulé de la question
  numReponse: number[];      // Liste des identifiants des réponses possibles
  template: string;          // Le modèle associé à la question
  answers: Answer[];         // Liste des réponses possibles avec leurs attributs    
}

interface Answer {
  answer: string;            // La réponse donnée
  comment: string;           // Commentaire associé à la réponse
  now: boolean;              // Indication de réponse actuelle
  twoYears: boolean;         // Indication de réponse pour dans 2 ans
}



export default {
  name: 'QuestionComponent',
  props: {
    questionsTable: {
    type: Array as PropType<Question[]>,
      required: true,
    },
  },
  methods: {
    toggleCheckbox(answer: Answer, type: 'now' | 'twoYears') {
  // Si l'autre case est cochée, décocher cette case
  const oppositeType = type === 'now' ? 'twoYears' : 'now';
  
  // Si l'autre case est cochée, décocher
  if (answer[oppositeType]) {
    answer[oppositeType] = false;
  }

  // Mettre à jour l'état de la case à cocher
  answer[type] = !answer[type];

  // Si "N/A" ou "Aucunes de ces réponses." est cochée
  if ((answer.answer === "N/A" || answer.answer === "Aucune de ces réponses." || answer.answer === "Je ne sais pas") && answer[type]) {
    const question = this.questionsTable.find(q =>
      q.answers.includes(answer)
    );
    question?.answers.forEach(ans => {
      if (ans !== answer) {
        ans.now = false;
        ans.twoYears = false;
      }
    });
  }

  // Si une autre réponse est cochée, décocher "N/A" et "Aucunes de ces réponses."
  if (answer.answer !== "N/A" && answer.answer !== "Aucune de ces réponses." && answer.answer !== "Je ne sais pas" && answer[type]) {
    const question = this.questionsTable.find(q =>
      q.answers.includes(answer)
    );
    const specialAnswers = question?.answers.filter(ans =>
      ans.answer === "N/A" || ans.answer === "Aucune de ces réponses." || ans.answer === "Je ne sais pas" 
    );
    specialAnswers?.forEach(specialAnswer => {
      specialAnswer.now = false;
      specialAnswer.twoYears = false;
    });
  }
}
,
    saveCustomAnswer(answer: Answer) {
      if (answer.answer.trim() === '') {
        // Si le champ est vide après que l'utilisateur ait quitté le champ, on laisse vide
        answer.answer = '';
      } else {
        console.log('Réponse personnalisée sauvegardée:', answer.answer);
      }
    },

    // Fonction pour sauvegarder un commentaire
    saveComment(answer: Answer) {
      if (answer.comment.trim() === '') {
        answer.comment = ''; // Si le commentaire est vide, on laisse vide
      } else {
        console.log('Commentaire sauvegardé:', answer.comment);
      }
    },
  },
};
</script>

<template>
  <div class="question-container" v-for="(question, index) in questionsTable" :key="index">
    <div class="question-box">
      <h2>Question {{ question.idQuestion }}</h2>
      <h5>{{ question.nomQuestion }}</h5>
      
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="answers"></th>
            <th scope="col" class="now">
              Cochez à côté des pratiques <br> que vous mettez en place <br><b>aujourd'hui</b>
            </th>
            <th scope="col" class="twoYears">
              Cochez à côté des pratiques <br> que vous vous engagez à <br> mettre en place dans les <br><b>2 ans</b>
            </th>
            <th scope="col" class="commentaire">
              Commentaires
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(answer, answerIndex) in question.answers" :key="answerIndex">
            <td class="answers">
              
              <div >
                <label>{{ answer.answer }}</label>
              </div>
            </td>
            <td class="now">
              <input 
                type="checkbox" 
                :checked="answer.now" 
                @change="toggleCheckbox(answer, 'now')" 
              />
            </td>
            <td class="twoYears">
              <input 
                type="checkbox" 
                :checked="answer.twoYears" 
                @change="toggleCheckbox(answer, 'twoYears')" 
              />
            </td>
            <td class="commentaire">
              <textarea 
                v-model="answer.comment" 
                placeholder="Ajouter un commentaire"
                @blur="saveComment(answer)" 
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>




<style scoped>
.question-box {
    border: 2px solid #ccc; /* Bordure de 2px de couleur gris clair */
    border-radius: 8px; /* Coins arrondis */
    padding: 15px; /* Espacement interne pour aérer le contenu */
    margin-bottom: 20px; /* Espacement entre les questions */
    background-color: #f9f9f9; /* Couleur de fond pour chaque question */
}
.question-container {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h2 {
  margin-top: 10px;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.comments textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

textarea::placeholder {
  color: #888;
}

textarea:focus {
  border-color: #4d90fe;
  outline: none;
}

table {
    width: 100%; /* Optionnel: définit la largeur du tableau */
    table-layout: fixed; /* Assure une largeur fixe des colonnes */
}



thead {
    background-color: #f2f2f2; /* Optionnel: couleur d'arrière-plan pour les en-têtes */
}

tr {
    height: 50px; /* Hauteur fixe pour les lignes */
}

th, td {
    margin-top: px;
    text-align: center;
    padding: 10px; 
}

.answers {
    width: 40%; /* Largeur de la colonne des réponses */
}

.now, .twoYears {
    width: 20%; 
    text-align: center; 
   
}
</style>