<script lang="ts">
export default {
    name: 'LeftPanel',
    methods: {
        contact() {
            window.location.href = "https://betterbusiness.be/contact/";
        }
    }
};
</script>

<template>
    <div class="left-panel">
        <h2>Pas encore de compte ?</h2>
        <p style="padding-bottom: 2em;">Contactez l’entreprise pour créer un compte</p>
        <button class="leftButton" @click="contact">Contact</button>
    </div>
</template>

<style scoped>
.left-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* Centre verticalement les éléments */
    background-color: #ebebeb;
    padding: 50px;
    border-radius: 5px 0 0 5px;
    /* Coins arrondis pour la gauche */
    width: 50%;
    /* Largeur des sections */
}

.left-panel h2 {
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
    align-self: flex-start;
    /* Aligne le bouton à gauche */
}

button:hover {
    background-color: #666666;
}
</style>