<template>
    <div id="footer" class="footer">
        <Button label="Plan du site" icon="pi pi-external-link" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }">
            <p>
            <!--
                <header>
                <h2 id="titre">Plan du site</h2>
                </header>
                <section>
                    <h4>Nom du site -TO DO</h4>
                    <ul>
                        <li>Accueil</li>
                    </ul>
                    <ul>
                        <li>Crédits</li>//
                        <li>Mentions légales</li>//
                        <li>Plan du site</li>
                    </ul>
                </section>
                -->
                blalalaal
            </p>
        </Dialog>


        <Button label="Mentions légales" icon="pi pi-external-link" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }">
            <p>
            <!--
                <header>
                    <h2 id="titre">Mentions légales</h2>
                </header>
                <h4>AUTEUR:</h4>
                    Ce site a été réalisé par 		Ilona BARAN, Léa FREDOC, Fernando RICO-QUINTERO et Jacqueline WILLIAMS, étudiants en cycle ingénieur ou Master 
                    'Technologies des Systèmes d'Information' à l'Ecole Nationale des Sciences Géographiques - Géomatique (ENSG - Géomatique) à Marne-la-Vallée.
                <h4>EDITEUR:</h4>
                    Ce site est la propriété de l'ENSG - Géomatique. Ce site est édité par l'ENSG - Géomatique, au 6 et 8 Avenue Blaise Pascal, Cité Descartes à Champs-sur-Marne (77455 Marne la Vallée Cedex 2). Cette structure est une composante de l’Institut Géographique National (IGN) qui est un organisme public au statut juridique d’Etablissement Public à caractère Administratif (EPA).
                <h4>FORME JURIDIQUE:</h4>
                    Etablissement public à caractère scientifique, culturel et professionnel.
                <h4>DONNEES PERSONNELLES:</h4>
                    L’ENSG - Géomatique ne collecte et stocke sur les visiteurs du site aucune autre information nominative ou personnelle que celles qui lui sont ouvertement et volontairement fournies en particulier par l’utilisation des formulaires d’envoi de courriels.
            -->
            bébou
            </p>
        </Dialog>


        <Button label="Crédits" icon="pi pi-external-link" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw'}">
            <p>
            <!--
                <header>
                    <h2 id="titre">Crédits</h2>
                </header>
                <h4>CREDITS DEVELOPPEMENT:</h4>
                    Le développement de <a href="TO DO" target="_blank"> ce site </a> a été réalisé par Ilona BARAN, Léa FREDOC, Fernando RICO-QUINTERO et Jacqueline WILLIAMS, étudiants en cycle ingénieur ou Master 'Technologies des Systèmes d'Information' à l'Ecole Nationale des Sciences Géographiques - Géomatique à Marne-la-Vallée.                <h4>CREDITS CARTE:</h4>
                    Leaflet
                    Site: <a href="https://leafletjs.com/" target="_blank"> https://leafletjs.com/ </a>
            -->
            bibiche
            </p>
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
            visible: false
        };
    }
   }
   </script>
   
   
   <style>
   .footer {
    width: 100%;
    height: 20px;
    background-color:rgb(116, 126, 235);
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: rgb(55, 53, 53);
    }
   </style>