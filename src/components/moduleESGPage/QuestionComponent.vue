<script lang="ts">
import test from 'node:test';
import { PropType } from 'vue';
import { getAllQuestions } from '@/services/moduleESGService';
import { log } from 'console';

interface ListQuestions {
   issue_id: number;
  questionsList: Question[];
}

interface Question {     
  txt: string;   
  responsesList: Answer[];      
}

interface Answer {
  template: number;
  txt_answer : string;
  comment: string;          
  isNow: boolean;             
  is2Years: boolean; 
  scoreNow : number;
  score2 : number;        
}



export default {
  name: 'QuestionComponent',
  data() {
    return {
      questionsTable: [] as Question[],  // Initialisation de questionsTable
    };
  },
  mounted() {
    this.loadQuestions();  // Charger les questions au montage du composant
  },
  methods: {
    async loadQuestions() {
      try {
        // Récupérer les questions depuis l'API
        const response = await getAllQuestions();
        // Assumer que response contient un objet 'essai'
        console.log(response);
        const essaiData: ListQuestions[] = response as ListQuestions[];
        this.questionsTable = essaiData[1].questionsList;  // Mettre les questions dans questionsTable
        console.log(this.questionsTable);
      } catch (error) {
        console.error('Erreur lors du chargement des questions:', error);
      }
    },

    // Méthode pour gérer le changement d'état des cases à cocher (isNow / is2Years)
    toggleCheckbox(answer: Answer, type: 'isNow' | 'is2Years') {
      const oppositeType = type === 'isNow' ? 'is2Years' : 'isNow';

      if (answer[oppositeType]) {
        answer[oppositeType] = false;
      }

      answer[type] = !answer[type];

      if ((answer.txt_answer === "N/A" || answer.txt_answer === "Aucune de ces réponses." || answer.txt_answer === "Je ne sais pas") && answer[type]) {
        const question = this.questionsTable.find(q =>
          q.responsesList.includes(answer)
        );
        question?.responsesList.forEach(ans => {
          if (ans !== answer) {
            ans.isNow = false;
            ans.is2Years = false;
          }
        });
      }

      if (answer.txt_answer !== "N/A" && answer.txt_answer !== "Aucune de ces réponses." && answer.txt_answer !== "Je ne sais pas" && answer[type]) {
        const question = this.questionsTable.find(q =>
          q.responsesList.includes(answer)
        );
        const specialAnswers = question?.responsesList.filter(ans =>
          ans.txt_answer === "N/A" || ans.txt_answer === "Aucune de ces réponses." || ans.txt_answer === "Je ne sais pas"
        );
        specialAnswers?.forEach(specialAnswer => {
          specialAnswer.isNow = false;
          specialAnswer.is2Years = false;
        });
      }
    },

    saveCustomAnswer(answer: Answer) {
      if (answer.txt_answer.trim() === '') {
        answer.txt_answer = '';
      } else {
        console.log('Réponse personnalisée sauvegardée:', answer.txt_answer);
      }
    },

    saveComment(answer: Answer) {
      if (answer.comment.trim() === '') {
        answer.comment = ''; 
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
      <h5>{{ question.txt }}</h5>
      
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
          <tr v-for="(answer, answerIndex) in question.responsesList" :key="answerIndex">
            <td class="answers">
              <div>
                <label>{{ answer.txt_answer }}</label>
              </div>
            </td>
            <td class="now">
              <input 
                type="checkbox" 
                :checked="answer.isNow" 
                @change="toggleCheckbox(answer, 'isNow')" 
              />
            </td>
            <td class="twoYears">
              <input 
                type="checkbox" 
                :checked="answer.is2Years" 
                @change="toggleCheckbox(answer, 'is2Years')" 
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
    border: 2px solid #ccc; 
    border-radius: 8px; 
    padding: 15px; 
    margin-bottom: 20px; 
    background-color: #f9f9f9; 
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
    width: 100%; 
    table-layout: fixed; 
}


thead {
    background-color: #f2f2f2; 
}

tr {
    height: 50px; 
}

th, td {
    margin-top: px;
    text-align: center;
    padding: 10px; 
}

.answers {
    width: 40%; 
}

.now, .twoYears {
    width: 20%; 
    text-align: center; 
   
}
</style>