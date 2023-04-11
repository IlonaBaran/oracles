<template>
  <!-- Dial permettant l'affichage des différents outils et paramètres de la carte  -->
  <div class="dial">
    <SpeedDial :model="items" direction="down" :style="{ top: 'calc(5% + 36px)', right: 'calc(5px)' }"
      class="right-0 top-0" :tooltipOptions="{ position: 'right' }" />
  </div>

  <!-- Sidebar de la sélection des hmax à afficher -->
  <Sidebar class='sidebar' v-model:visible="visibleHmax" position="right">
    <h2 style="text-align:center;">Sélection des hMax à afficher</h2>
    <div class="centerDiv">
      <p style="margin-bottom:20px;">Sélectionnez un ou plusieurs scénarios pour afficher leurs hauteur maximale
        associée.
      </p>
      <MultiSelect v-model="selectedScenario" :options="scenario" filter optionLabel="name"
        placeholder="Sélection Scénarios" :maxSelectedLabels="3" class="w-full md:w-20rem selectScenario"
        :selectedScenario="this.selectedScenario" />
    </div>
  </Sidebar>

  <!-- Sidebar de la sélection du fond de carte -->
  <Sidebar class='sidebar' v-model:visible="visibleRight" position="right">
    <h2>Fonds de carte</h2>
    <!-- Désactivation du bouton ortho si le fond de carte actuel est déjà l'ortho -->
    <div class="centerDiv" v-if="this.mapSelected == 'ortho'">
      <Button id="boutonCarte" value='ortho' @click="$emit('icon-clicked', changeMapToOrtho())"
        class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700 " disabled>
        <img alt="logo" src="../../public/img/ortho.png" class="h-2rem" />
      </Button>

      <Button id="boutonCarte" value='plan' @click="$emit('icon-clicked', changeMapToPlan(), this.mapSelected)"
        class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700">
        <img alt="logo" src="../../public/img/plan.png" class="h-2rem" value='plan' />
      </Button>
    </div>

    <!-- Désactivation du bouton plan si le fond de carte actuel est déjà le plan -->
    <div class="centerDiv" v-else-if="this.mapSelected == 'plan'">

      <Button id="boutonCarte" value='ortho' @click="$emit('icon-clicked', changeMapToOrtho())"
        class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700 ">
        <img alt="logo" src="../../public/img/ortho.png" class="h-2rem" />
      </Button>

      <Button id="boutonCarte" value='plan' @click="$emit('icon-clicked', changeMapToPlan(), this.mapSelected)"
        class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700" disabled>
        <img alt="logo" src="../../public/img/plan.png" class="h-2rem" value='plan' />
      </Button>
    </div>
  </Sidebar>
</template>
  


<script>
// Import des éléments des librairies
import SpeedDial from 'primevue/speeddial';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';


export default {
  name: 'Toolbar-box',
  components: {
    SpeedDial,
    Sidebar,
    Button,
    MultiSelect

  },
  data() {
    return {

      visibleRight: false, // visibilité du panel de fonds de carte
      visibleBuilding: false, // visibilité des bâtiments
      visibleHmax: false, // visibilité du hmax
      mapSelected: "ortho", // fond de carte sélectionné

      // Liste des éléments du speedDial
      items: [
        {
          label: 'Changer fond de carte',
          icon: 'pi pi-map',
          command: () => {
            // si le bouton est cliqué on affiche le panel
            this.visibleRight = true;
          }
        },
        {
          label: 'Afficher les hauteurs maximales',
          icon: 'pi pi-globe',
          command: () => {
            // si le bouton est cliqué on affiche le panel
            this.visibleHmax = true;
          }
        },
        {
          label: 'Afficher/Masquer les bâtiments',
          icon: 'pi pi-building',
          command: () => {
            // Si le bouton est cliqué on emet "change-building" au composant parent Map.vue
            // La fonction alors appelé affichera ou non la couche de bâtiments en fonction
            // de la valeur de this.visibleBuilding
            this.$emit('change-building');
            if (this.visibleBuilding) {
              this.visibleBuilding = false;
            }
            else {
              this.visibleBuilding = true;
            }
          }
        },
        {
          label: 'Recentrer la vue',
          icon: 'pi pi-undo',
          command: () => {
            // Si le bouton est cliqué on emet "reinit-view" au composant parent Map.vue
            // On replace la caméra aux coordonnées d'origines
            this.$emit('reinit-view');
          }
        },
      ]
    }
  },

  methods: {
    // Les deux fonctions suivantes permettent de changer la valeur de mapSelected en fonction
    // du bouton cliqué
    changeMapToOrtho() {
      this.mapSelected = "ortho";
    },
    changeMapToPlan() {
      this.mapSelected = "plan";
    },
  }
}
</script>
  
<style>
.button {
  display: inline-block;
  padding: 10px 15px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #6366f1;
  border: none;
  border-radius: 2px;
  box-shadow: 0 9px #999;
  position: fixed;
  bottom: 5%;
  right: 2%;
}

.button:hover {
  background-color: #6366f1
}

.button:active {
  background-color: #6366f1;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.toolbar {
  z-index: 2;
}

.dial {
  z-index: 2;

}

.sidebar {
  z-index: 2;
}

.centerDiv {
  display: flex;
  align-items: center;
  flex-direction: column;
}

img {
  width: 100%;

}

#boutonCarte {
  margin: 5%;
  padding: 0%;
}
</style>

