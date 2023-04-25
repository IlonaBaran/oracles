<template>
    <div id="footer" class="footer">

        <Button label="Plan du site" @click="plan = true" style="color: white" link />
        <Dialog v-model:visible="plan" modal header="Plan du site" :style="{ width: '50vw' }">
            <section>
                <h4>Nom du site -TO DO</h4>
                <ul>
                    <li>Accueil</li>
                </ul>
                <ul>
                    <li>Crédits</li>
                    <li>Mentions légales</li>
                    <li>Plan du site</li>
                    <li>Aide utilisateur</li>
                </ul>
            </section>
        </Dialog>


        <Button label="Mentions légales" @click="mentions = true" style="color: white" link />
        <Dialog v-model:visible="mentions" modal header="Mentions légales" :style="{ width: '50vw' }">
            <h4>AUTEUR:</h4>
            Ce site a été réalisé par Ilona BARAN, Léa FREDOC, Fernando RICO-QUINTERO et Jacqueline WILLIAMS, étudiants en
            cycle ingénieur ou Master
            'Technologies des Systèmes d'Information' à l'Ecole Nationale des Sciences Géographiques - Géomatique (ENSG -
            Géomatique) à Marne-la-Vallée.
            <h4>EDITEUR:</h4>
            Ce site est la propriété de l'ENSG - Géomatique. Ce site est édité par l'ENSG - Géomatique, au 6 et 8 Avenue
            Blaise Pascal, Cité Descartes à Champs-sur-Marne (77455 Marne la Vallée Cedex 2). Cette structure est une
            composante de l’Institut Géographique National (IGN) qui est un organisme public au statut juridique
            d’Etablissement Public à caractère Administratif (EPA).
            <h4>FORME JURIDIQUE:</h4>
            Etablissement public à caractère scientifique, culturel et professionnel.
            <h4>DONNEES PERSONNELLES:</h4>
            L’ENSG - Géomatique ne collecte et stocke sur les visiteurs du site aucune autre information nominative ou
            personnelle que celles qui lui sont ouvertement et volontairement fournies en particulier par l’utilisation des
            formulaires d’envoi de courriels.
        </Dialog>


        <Button label="Crédits" @click="credits = true" style="color: white" link />
        <Dialog v-model:visible="credits" modal header="Crédits" :style="{ width: '50vw' }">
            <h4>CREDITS DEVELOPPEMENT:</h4>
            Le développement de <a href="TO DO" target="_blank"> ce site </a> a été réalisé par Ilona BARAN, Léa FREDOC,
            Fernando RICO-QUINTERO et Jacqueline WILLIAMS, étudiants en cycle ingénieur ou Master 'Technologies des Systèmes
            d'Information' à l'Ecole Nationale des Sciences Géographiques - Géomatique à Marne-la-Vallée. <h4>CREDITS CARTE:
            </h4>
            Leaflet
            Site: <a href="https://leafletjs.com/" target="_blank"> https://leafletjs.com/ </a>
        </Dialog>


        <Button label="Aide utilisateur" @click="aide = true" style="color: white" link />
        <Dialog v-model:visible="aide" modal header="Aide utilisateur" :style="{ width: '50vw' }">
            <h1>PFA TSI 2022-2023 : ANR Oracles - VTTHREE : "Visualisation de scénarios de submersion côtière"</h1>
            <h1>_______</h1>

            <h2>Table des matières</h2>
            <h3>Informations</h3>
            <h3>Accès à l'application</h3>
            <h3>Fonctionnalités de l'application</h3>

            <h1>_______</h1>
            <h2>Informations</h2>
            <h4>Authors and acknowledgment</h4>
            <p>Ilona Baran, Léa Fredoc, Jacqueline Williams & Fernando Rico Quintero</p>

            <h4>Commanditaires</h4>
            <p>Sidonie Christophe et Jacques Gautier</p>

            <h4>Project status</h4>
            <p>Development & Maintenance will cease on 28/04/2023</p>

            <h4>URL du site</h4>
            <p>localhost:8082</p>

            <h4>Pré-requis</h4>
            <p>+ Connection internet pour l'affichage de la carte</p>
            <p>+ Utilisation d'un navigateur</p>
            <p>+ Accès à la page web</p>
            <p>Pour accéder à la page web, il vous suffit de rentrer l’URL du site dans n’importe quel navigateur web, de préférence Mozilla Firefox car c’est le navigateur utilisé pour son développement.</p>

            <h1>_______</h1>
            <h2>Fonctionnalités</h2>
            <p>L'application est composée : </p>
                    <p>+ d'un pied de page (espace des options de la page (aide, crédits, plan du site, etc)) ;</p>
                    <p>+ d'une en-tête permettant le choix de la zone d'étude ainsi que les scénarios et graphiques à visualiser</p>
                    <p>+ d'un fond de carte au milieu et d'un bouton permettant de visualiser la scène et 2D ou 3D</p>
                    <p>+ d'un widget sur la droite proposant plusieurs options pour l'utilisateur (changement du fond de carte, visualisation des bâtiments...)</p>
            <p>L'image ci-dessous montre la page de l'application. Les numéros sur cette capture sont détaillés dans les points suivants.</p>
            <img src="../../img/readme/app.png">

            <h1>**</h1>

            <h4>Changement de la zone d'étude (Numéro 1)</h4>
            <p>Dans l'en-tête de la page à droite, vous toruverez deux boutons 'Gâvres' et 'Arcachon'. Pour changer de zone d'étude, vous devez cliquer sur la zone que vous souhaitez. Dans ce prototype, nous n'avons pas de données pour Arcachon, ce bouton est donc désactivé.</p>

            <h1>**</h1>

            <h4>Visualisation en 2D et 3D (Numéro 2)</h4>
            <p>Dans la partie principale de l'applicaiton, vous trouverez en bas à droite deux boutons '2D' et '3D'. La vue sur laquelle vous êtes en en vert. Pour changer de dimension, vous devez simplement cliquer sur la dimension voulue. --> rajouter comment naviguer en 2D ET 3D</p>

            <h1>**</h1>

            <h4>Autres options (Numéro 3)</h4>
            <p>A droite, dans la partie principale, vous trouverez un bouton vert +. Lorsque vous cliquez dessus, plusieurs icônes apparaissent :</p>
                <p>+ Changement de fond de carte (Numéro 4)</p>
                <p>+ Affichage des hauteurs d'eau maximale et finale (Numéro 5) (cette partie est détaillée dans une prochaine section)</p>
                <p>+ Affichage ou supression des bâtiments (Numéro 6)</p>
                <p>+ Recentrer la vue (Numéro 7)</p>

            <h1>**</h1>

            <h2>Visualisation des graphiques</h2>
            <p>Pour visualiser un graphique, il vous suffit de choisir un ou plusieurs scénarios dans l'en-tête de la page. (Numéro 8) Ensuite, vous devez choisir un graphique parmi ceux proposés et valider votre séléction. (Numéro 9 - Numéro 10) Sur la gauche, un panel s'ouvrira avec le graphique que vous avez choisi. (Numéro 11)</p>

            <p>Si vous voulez changer de graphique, vous pouvez le faire en choississant un autre graphique. Si vous voulez modifier les graphiques séléctionnés, vous devez cliquer sur le bouton de réinitialisation. (Numéro 12)</p>

            <h3>Diagramme 1 : Diagramme linéaire</h3>
            <p>Quatre graphiques sont affichés : la hauteur des vagues, la surcote, la vitesse du vent en fonction du temps Il est possible de séléctionner un ou plusieurs scénarios.</p>
            <img src="../../img/readme/line.png">

            <h3>Diagramme 2 : Rose des vents</h3>
            <p>Ce graphique présente la distribution de la vitesse du vent pour une simulation. Les données pour une même simulation sont très proches en terme :</p>
                <p>de vitesse de vent (écart d’environ 3 m/s entre la valeur minimale et maximale) ;</p>
                <p>de direction du vent (écart d’environ 10° entre la valeur minimale et maximale). Il peut donc être difficle d'obtenir un résultat exploitable.</p>
            <img src="../../img/readme/windrose.png">

            <h3>Diagramme 3 : Histogramme empilé</h3>
            <p>Quatre graphiques sont affichés : la hauteur des vagues, la surcote, la vitesse du vent en fonction du temps Il est possible de séléctionner un ou plusieurs scénarios.</p>
            <img src="../../img/readme/histogram.png">

            <h3>Diagramme 4 : Carte de chaleur</h3>
            <p>La carte de chaleur montre la hauteur de l'eau en fonction du temps. Il est possible de séléctionner un ou plusieurs scénarios.</p>
            <img src="../../img/readme/heatmap.png">

            <h3>Diagramme 5 : Linéaire 3D</h3>
            <p>La carte de chaleur peut être difficilement exploitable car les valeurs au sein d'un même scénario varient peu. Pour avoir une autre représentation, nous avons réalisé ce diagramme 3D. Il est possible de séléctionner un ou plusieurs scénarios.</p>
            <img src="../../img/readme/3d.png">

            <h1>**</h1>

            <h2>Affichage des hauteurs d'eau maximale et finale (Numéro 5)</h2>
            <p>Pour pouvoir visualiser ces hauteurs d'eau, vous devez au préalable séléctionner des scénarios dans l'en-tête de la page, à l'endroit où vous les séléctionnez pour les graphiques. Vous aurez comme possibilité de séléctionner les hauteurs d'eau maximale et finale des graphiques séléctionnées uniquement.</p>

            <h3>Pour un scénario</h3>
            <p>Vous séléctionnez le scénario voulu et le type de hauteur d'eau que vous voulez visualiser : hmax pour la hauteur d'eau finale et hfin pour la hauteur d'eau finale. Après validation, vous verrez cette hauteur d'eau apparaître sur la carte. Le chargement peut prendre quelques instants.</p>

            <h3>Pour plusieurs scénarios</h3>
            <p>Vous séléctionnez les scénarios voulus. Vous devez ensuite choisir parmi trois options :</p>
                <p>+ moy : vous choisissez de visualiser la moyenne des hauteurs d'eau des scénarios ;</p>
                <p>+ min : vous choisissez de visualiser la hauteur minimale d'eau des scénarios ;</p>
                <p>+ max : vous choisissez de visualiser la hauteur maximale d'eau des scénarios.</p>
            <p>Ensuite, vous choisissez le type de hauteur d'eau que vous voulez visualiser : hmax pour la hauteur d'eau finale et hfin pour la hauteur d'eau finale. Après validation, vous verrez cette hauteur d'eau apparaître sur la carte. Le chargement peut prendre quelques instants.</p>
            <img src="../../img/readme/eau.png">
        </Dialog>
    </div>
</template>
   
<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

/**
 * Composant 'Pied de page' de l'application 
 * --> mentions légales, plan du site, crédits, manuel utilisateur
 *
 * @component footerComponent
 * 
 * @author Equipe du projet Oracle - ENSG, TSI 
 * @version 1.0
 * @since 25.04.2023
 * 
 * Composants enfants : 
 * -- Librairie PrimeVue --
 * Dialog
 * Button
 * 
 * @requires ../../node_modules/primevue/dialog/Dialog.vue
 * @requires ../../node_modules/primevue/button/Button.vue
 */
export default {
    name: 'footerComponent',
    components: {
        Dialog,
        Button,
    },
    data() {
        return {
            plan: false,
            mentions: false,
            credits: false,
            aide: false,
            markdown: false
        };
    },
    mounted() {
        this.fetchMarkdown();
    },
    methods: {
        fetchMarkdown() {
            fetch('http://localhost:8080/docs/src/components/Footer.md')
            .then(response => response.text())
            .then(markdown => {
                this.markdown = markdown;
            });
        }
    }
}
</script>
   
   
<style>
.footer {
    position: absolute;
    width: 100%;
    height: 4%;
    bottom: 0%;

    background-color: #14B8A6;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #14B8A6;
    z-index: 2;
}
</style>