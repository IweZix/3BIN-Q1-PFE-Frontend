<script lang="ts">
export default {
    name: 'CompanyHomePage',
    data() {
        return {
            companyName: ''
        };
    },
    mounted() {
        const storedCompanyName = localStorage.getItem('companyName');
        if (storedCompanyName) {
            this.companyName = storedCompanyName;
        } else {
            this.companyName = 'Nom de l\'Entreprise Default'; // Valeur par défaut
        }
    }
};
</script>

<template>
    <div class="company-home-page">
        <header class="header">
            <h1 class="company-name">{{ companyName }}</h1>
        </header>
        <main class="main-content">
            <h2>Voici les prochaines étapes de votre certification ShiftingPact :</h2>
            <p class="description">
                <strong>1. Module ODD :</strong><br>
                Préciser le niveau de votre engagement au regard des Objectifs de Développement Durable que vous avez préalablement sélectionnés.
            </p>
            <p class="description">
                <strong>2. Modules ESG et Pacte :</strong><br>
                Répondre au questionnaire à choix multiples pour préciser à la fois :
                <ul>
                    <li>ce que vous avez éventuellement déjà mis en place</li>
                    <li>ce que vous vous engagez à mettre en place dans les deux ans.</li>
                </ul>
            </p>
            <p class="description">
                L'objectif de notre certification est en effet de reconnaître, au-delà de votre impact, vos performances ESG actuelles et vos engagements à les améliorer à l'avenir.
            </p>
            <p class="description">
                Votre score final se compose des éléments suivants et met en valeur :
                <ul>
                    <li>l'impact de votre entreprise au travers des Objectifs de Développement Durable</li>
                    <li>La performance ESG de vos pratiques opérationnelles</li>
                    <li>Les engagements que vous prenez pour améliorer vos pratiques opérationnelles</li>
                </ul>
            </p>
            <p class="description">
                L'onglet Glossaire avec toutes les notions dont vous pourriez avoir besoin est à votre disposition dans le présent document.
            </p>
            <p class="description">
                Nous expliquons également les Standards ESG que nous avons utilisés dans le cadre de la certification ShiftingPact : onglet "Référentiels Standards".
            </p>
            <p class="description">
                Votre label ShiftingPact est agréé par la Région de Bruxelles-Capitale et vous donne accès, en tant qu'entreprise "exemplaire", à la majoration de vos subsides pour toutes les missions subsidiables à l'avenir : 
                <a href="https://economie-emploi.brussels/primes-gerer-entreprise" target="_blank">https://economie-emploi.brussels/primes-gerer-entreprise</a>
            </p>
            <p class="description">
                La qualité de votre label est garantie par un processus de vérification interne et un dialogue entre l'entreprise certifiante et le vérificateur avant l'attribution du label.
            </p>
            <p class="description">
                De plus, Forum Ethibel est désigné comme auditeur externe pour effectuer des contrôles ex-post (voir "Référentiels Standards").
            </p>
            <p class="description">
                Nous sommes à votre disposition si vous avez la moindre question : 
                <a href="mailto:contact@shiftingpact.be">contact@shiftingpact.be</a>
            </p>
        </main>
    </div>
</template>

<style scoped>
.company-home-page {
    font-family: 'Roboto', sans-serif;
    color: #333;
    padding: 20px;
    text-align: center;
    background-color: #f9f9f9;
}

.header {
    background-color: #007BFF;
    color: white;
    padding: 20px 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.company-name {
    margin: 0;
    font-size: 2em; /* Reduced from 2.5em to 2em */
    font-weight: 700;
}

.main-content {
    margin-top: 20px;
    text-align: left;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.description {
    font-size: 1.1em;
    line-height: 1.8;
    margin-bottom: 20px;
    color: #555;
}

.main-content h2 {
    font-size: 1.5em; /* Reduced font size */
}

ul {
    list-style-type: disc;
    margin-left: 20px;
    padding-left: 20px;
}

a {
    color: #007BFF;
    text-decoration: none;
    font-weight: 500;
}

a:hover {
    text-decoration: underline;
}
</style>