<script lang="ts">
export default {
    name: 'GlossaireModal',
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            default: 'Glossaire',
        },
    },
    emits: ['close'],
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <button class="close-button" @click="closeModal">X</button>
            <h1>{{ title }}</h1>
            <slot>
                <!-- Par défaut, le contenu du glossaire -->
                <p>Voici le contenu du glossaire. Ajoutez ici vos définitions ou informations.</p>
            </slot>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    position: relative;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 100%;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
}
</style>
