<script lang="ts">
import {
  answerForm,
  answerFormCompleted,
  getAnswerForm,
  getNAList
} from '@/services/authCompanyService';

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
  txt_answer: string;
  comment: string;
  isNow: boolean;
  is2years: boolean;
  scoreNow: number;
  score2: number;
}

export default {
  name: 'QuestionComponent',
  data() {
    return {
      questionsTable: [] as ListQuestions[], // Initialisation de questionsTable
      currentIndex: 0,
      naIndex:0,
      successSaveMessage: '',
      questionNA: [] as ListQuestions[]
    };
  },
  props: {
    value: Number,
    updateValue: Function
  },

  methods: {
    async loadQuestions() {
      try {
        // Récupérer les questions depuis l'API
        this.currentIndex = 0;
        const token = localStorage.getItem('token');
        if (!token) {
          this.$router.push({ name: 'LoginPage' });
        } else {
          const response = await getAnswerForm(token);
          this.questionsTable = response as ListQuestions[];

          const responseNA = await getNAList(token);
          this.questionNA = responseNA as ListQuestions[];
        }
      } catch (error) {
        console.error('Erreur lors du chargement des questions:', error);
      }
    },
    nextListQuestion() {
      if (this.currentIndex < this.questionsTable.length) {
        this.currentIndex++;
      }
      if(this.questionsTable[this.currentIndex].issue_id === this.questionsTable[this.naIndex+1].issue_id){
        this.naIndex++;
      }
      this.$emit('next', (this.currentIndex/this.questionsTable.length * 100));
    },
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
      this.$emit('prev', (this.currentIndex/this.questionsTable.length * 100));
    },

    // Méthode pour gérer le changement d'état des cases à cocher (isNow / is2Years)
    toggleCheckbox(answer: Answer, type: 'isNow' | 'is2years') {
      const oppositeType = type === 'isNow' ? 'is2years' : 'isNow';

      // Trouver la question correspondante dans la liste actuelle
      const currentQuestion = this.questionsTable[this.currentIndex].questionsList.find((q) =>
        q.responsesList.includes(answer)
      );

      if (currentQuestion) {
        // Si la réponse a déjà l'état opposé activé, on le désactive
        if (answer[oppositeType]) {
          answer[oppositeType] = false;
        }

        // Inverser l'état de la réponse (cocher/décocher)
        answer[type] = !answer[type];

        // Gérer les cas particuliers : "N/A", "Aucune de ces réponses.", "Je ne sais pas"
        if (
          (answer.txt_answer === 'N/A' ||
            answer.txt_answer === 'Aucune de ces réponses.' ||
            answer.txt_answer === 'Je ne sais pas' ||
            answer.txt_answer === 'Non' ||
            answer.txt_answer === 'Oui' ||
            answer.txt_answer === 'Autre : veuillez expliquer dans les commentaires' ||
            answer.txt_answer === "N/A - Cette question n'est pas pertinente pour mon activité") &&
          answer[type]
        ) {
          // Désactiver toutes les autres réponses dans la même question
          currentQuestion.responsesList.forEach((ans) => {
            if (ans !== answer) {
              ans.isNow = false;
              ans.is2years = false;
            }
          });
        }

        // Si la réponse n'est pas "N/A", "Aucune de ces réponses." ou "Je ne sais pas", désactiver ces options si la réponse est cochée
        if (
          answer.txt_answer !== 'N/A' &&
          answer.txt_answer !== 'Aucune de ces réponses.' &&
          answer.txt_answer !== 'Je ne sais pas' &&
          answer.txt_answer !== 'Non' &&
          answer.txt_answer !== 'Oui' &&
          answer.txt_answer !== 'Autre : veuillez expliquer dans les commentaires' &&
          answer.txt_answer !== "N/A - Cette question n'est pas pertinente pour mon activité" &&
          answer[type]
        ) {
          const specialAnswers = currentQuestion.responsesList.filter(
            (ans) =>
              ans.txt_answer === 'N/A' ||
              ans.txt_answer === 'Aucune de ces réponses.' ||
              ans.txt_answer === 'Je ne sais pas' ||
              ans.txt_answer === 'Non' ||
              ans.txt_answer === 'Oui' ||
              ans.txt_answer === 'Autre : veuillez expliquer dans les commentaires' ||
              ans.txt_answer === "N/A - Cette question n'est pas pertinente pour mon activité"
          );
          specialAnswers.forEach((specialAnswer) => {
            specialAnswer.isNow = false;
            specialAnswer.is2years = false;
          });
        }
      }
    },

    async saveResponses() {
      if (this.questionsTable.length > 0) {
        const token = localStorage.getItem('token');

        try {
          if (token) {
            await answerForm(token, { questions: this.questionsTable });
            this.successSaveMessage = 'Réponse enregistrée !';
            alert(this.successSaveMessage);
          } else {
            console.error('Token is null');
          }
        } catch (error) {
          alert('Erreur lors de la sauvegarde des réponses');
        }
      }
    },
    async handleNext() {
      this.nextListQuestion();
    },

    async completedForm() {
      if (this.questionsTable.length > 0) {
        const token = localStorage.getItem('token');
        try {
          if (token) {
            const confirmation = confirm("Êtes-vous sûr de vouloir soumettre le formulaire pour évaluation ? Une fois soumis, vous ne pourrez plus le modifier.");
            
            if (confirmation) {
              await answerFormCompleted(token, { questions: this.questionsTable });
              this.successSaveMessage = "Formulaire envoyé en attente d'évaluation, merci de votre temps !";
              alert(this.successSaveMessage);
              this.$router.push({ name: 'CompanyHome' });
            }
          } else {
            alert("Vous n'êtes pas connecté");
          }
        } catch (error) {
          alert('Erreur lors de la soumission du formulaire');
        }
      }
    },

    saveComment(answer: Answer) {
      if (answer.comment.trim() === '') {
        answer.comment = '';
      }
    }
  },
  mounted() {
    this.loadQuestions();
  }
};
</script>

<template>
  <div v-if="questionsTable[currentIndex].questionsList.length > 0">
    <h3>Liste {{ currentIndex + 1 }} / {{ questionsTable.length }}</h3>
    
  </div>
  <div class="question-container" v-if="questionsTable.length > 0">
    <div
      v-for="(question, index) in questionsTable[currentIndex].questionsList"
      :key="index"
      class="question-box"
    >
      <h2>Question {{ index + 1 }}</h2>
      <h5>{{ question.txt }}</h5>

      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="answers"></th>
            <th scope="col" class="now">
              Cochez à côté des pratiques <br />
              que vous mettez en place <br /><b>aujourd'hui</b>
            </th>
            <th scope="col" class="twoYears">
              Cochez à côté des pratiques <br />
              que vous vous engagez à <br />
              mettre en place dans les <br /><b>2 ans</b>
            </th>
            <th scope="col" class="commentaire">Commentaires</th>
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
                :checked="answer.is2years"
                @change="toggleCheckbox(answer, 'is2years')"
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

  <div class="question-container" v-if="questionNA[naIndex] !== undefined
    && questionNA.length > 0
    && questionNA[currentIndex].questionsList.length > 0"
  >
    <h1>Liste des questions ne vous concernant pas - pour information</h1>
    <div
      v-for="(question, index) in questionNA[naIndex].questionsList"
      :key="index"
      class="question-box"
    >
      <h2>Question {{ index + 1 }}</h2>
      <h5>{{ question.txt }}</h5>
    </div>
  </div>

  <div class="navigation-buttons d-flex align-items-center justify-content-between">
    <div>
      <button
        type="button"
        class="btn btn-primary me-2"
        @click="prevQuestion"
        :disabled="currentIndex === 0"
      >
        &lt;
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="handleNext"
        :disabled="currentIndex === questionsTable.length - 1"
      >
        &gt;
      </button>
    </div>

    <div class="d-flex">
      <button class="btn btn-primary me-2" @click="saveResponses">Enregistrer</button>
      <button class="btn btn-secondary me-2" @click="completedForm">
        Soummettre le formulaire pour évaluation
      </button>
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

input[type='checkbox'] {
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

th,
td {
  margin-top: px;
  text-align: center;
  padding: 10px;
}

.answers {
  width: 40%;
}

.now,
.twoYears {
  width: 20%;
  text-align: center;
  
}

button {
  margin-left: 10px;
  background-color: #b5cdbf;
  border: none;
}
button:hover {
  background-color: #013238;
}

input[type="checkbox"] {
  appearance: none; /* Supprime le style par défaut */
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 3px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Style lorsqu'il est coché */
input[type="checkbox"]:checked {
  background-color: #4caf50; /* Couleur verte lorsqu'il est coché */
  border-color: #4caf50;
  position: relative;
}

input[type="checkbox"]:checked::after {
  content: "✔"; 
  font-size: 14px;
  color: white;
  position: absolute;
  left: 3px;
}

</style>
