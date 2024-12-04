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
            <h2>Bienvenue dans votre certification ShiftingPact</h2>
            <p class="intro">
                Suivez les étapes ci-dessous pour compléter votre certification et accéder aux avantages réservés aux entreprises exemplaires !
            </p>

            <!-- Section ODD -->
            <section class="section section-odd">
                <h3 class="section-title">
                    <i class="icon">🌍</i> Module ODD
                </h3>
                <p>
                    Précisez votre niveau d'engagement concernant les Objectifs de Développement Durable que vous avez sélectionnés.
                </p>
            </section>

            <!-- Section ESG -->
            <section class="section section-esg">
                <h3 class="section-title">
                    <i class="icon">📋</i> Modules ESG et Pacte
                </h3>
                <p>
                    Répondez au questionnaire pour indiquer :
                </p>
                <ul>
                    <li>Les actions déjà mises en place</li>
                    <li>Les engagements pour les deux prochaines années</li>
                </ul>
            </section>

            <!-- Score final -->
            <section class="section section-score">
                <h3 class="section-title">
                    <i class="icon">📊</i> Votre score final
                </h3>
                <p>
                    Votre score met en valeur :
                </p>
                <ul>
                    <li>L'impact de votre entreprise à travers les ODD</li>
                    <li>La performance ESG de vos pratiques</li>
                    <li>Les engagements pris pour améliorer vos pratiques</li>
                </ul>
            </section>

            <section class="section section-standards">
                <h3 class="section-title">
                    <i class="icon">📖</i> Standards ESG et Référentiels
                </h3>
                <p>
                    Nous expliquons les <strong>Standards ESG</strong> utilisés dans le cadre de la certification ShiftingPact. Consultez l'onglet 
                    <strong>"Référentiels Standards"</strong> pour plus de détails sur les méthodes et normes appliquées.
                </p>
            </section>

            <section class="section section-label">
                <h3 class="section-title">
                    <i class="icon">🏆</i> Votre label ShiftingPact
                </h3>
                <p>
                    Votre <strong>label ShiftingPact</strong> est <strong>agréé par la Région de Bruxelles-Capitale</strong>. En tant qu'entreprise "exemplaire", ce label vous permet de bénéficier de la majoration de vos subsides pour toutes les missions subsidiables à l'avenir.
                </p>
                <p>
                    Consultez plus d'informations ici : 
                    <a href="https://economie-emploi.brussels/primes-gerer-entreprise" target="_blank">
                        https://economie-emploi.brussels/primes-gerer-entreprise
                    </a>
                </p>
            </section>

            <section class="section section-verification">
                <h3 class="section-title">
                    <i class="icon">✔️</i> Processus de vérification
                </h3>
                <p>
                    La qualité de votre label est garantie par :
                </p>
                <ul>
                    <li>Un <strong>processus de vérification interne</strong> et un dialogue avec le vérificateur avant l'attribution du label.</li>
                    <li>Des <strong>contrôles ex-post</strong> effectués par <strong>Forum Ethibel</strong>, auditeur externe.</li>
                </ul>
                <p>
                    Consultez l'onglet <strong>"Référentiels Standards"</strong> pour plus d'informations.
                </p>
            </section>


            <!-- Support et contact -->
            <section class="section section-contact">
                <h3 class="section-title">
                    <i class="icon">✉️</i> Besoin d'aide ?
                </h3>
                <p>
                    Consultez l'onglet Glossaire pour plus d'informations ou contactez-nous à :
                    <a href="mailto:contact@shiftingpact.be">contact@shiftingpact.be</a>
                </p>
            </section>
        </main>
    </div>
</template>



<style scoped>
.company-home-page {
    font-family: 'Roboto', sans-serif;
    color: #333;
    line-height: 1.6;
    padding: 20px;
    text-align: center;
    background-color: #f7f7f7;
}

.header {
    background-color: #007BFF;
    color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.company-name {
    font-size: 2.2em;
    font-weight: 700;
    margin: 0;
}

.main-content {
    text-align: left;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
}

.intro {
    font-size: 1.2em;
    font-weight: 500;
    margin-bottom: 20px;
    color: #555;
    text-align: center;
}

.section {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-odd {
    border-left: 5px solid #007BFF;
}

.section-esg {
    border-left: 5px solid #4CAF50;
}

.section-score {
    border-left: 5px solid #FFC107;
}

.section-contact {
    border-left: 5px solid #FF5722;
}

.section-title {
    font-size: 1.4em;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
    display: flex;
    align-items: center;
}

.icon {
    margin-right: 10px;
    font-size: 1.5em;
}

ul {
    list-style-type: disc;
    margin: 10px 0 20px 20px;
    padding-left: 20px;
    color: #555;
}

a {
    color: #007BFF;
    text-decoration: none;
    font-weight: 500;
}

a:hover {
    text-decoration: underline;
}

.section-standards, .section-label, .section-verification {
    background-color: #f9f9f9;
    padding: 20px;
    margin-bottom: 20px;
    border-left: 5px solid #FF9800;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-size: 1.4em;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.section-title .icon {
    margin-right: 10px;
    font-size: 1.5em;
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