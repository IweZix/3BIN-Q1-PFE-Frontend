<script lang="ts">
export default {
    name: 'RightPanel',
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            alert(`Connexion avec l'email : ${this.email}`);
        }
    }
};
</script>

<template>
    <div class="right-panel">
        <h2>Connexion</h2>
        <form @submit.prevent="login">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />

            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" required />

            <button class="rightButton" type="submit">Connexion</button>
        </form>
    </div>
</template>

<style scoped>
.right-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* Centre verticalement les éléments */
    background-color: #d9d9d9;
    padding: 20px;
    border-radius: 5px;
    /* Coins arrondis pour la droite */
    width: 50%;
    /* Largeur des sections */
}

.right-panel h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
    font-weight: bold;
}

button {
    background-color: #808080;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: auto;
    /* Ajuste la largeur au contenu */
    align-self: center;
    /* Aligne le bouton à gauche */
    margin-top: 2em;
}

button:hover {
    background-color: #666666;
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
    border: 1px solid;
    border-radius: 5px;
    background-color: transparent;
    /* Fond transparent */
}
</style>