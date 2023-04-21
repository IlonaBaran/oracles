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
            <h4>Manuel utilisateur</h4>
                TODO
        </Dialog>


    </div>
</template>
   
<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

export default {
    name: 'footerComponent',
    components: {
        Dialog,
        Button
    },
    data() {
        return {
            plan: false,
            mentions: false,
            credits: false,
            aide: false
        };
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