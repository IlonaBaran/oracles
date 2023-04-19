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
      <MultiSelect v-model="selectedScenario2" :options="selectedScenario" filter optionLabel="name"
        placeholder="Sélection Scénarios" :maxSelectedLabels="3" class="w-full md:w-20rem selectScenario" />
    </div>

    <div v-if="selectedScenario2.length > 1" class="flex flex-wrap gap-20 justify-content-center" id="radiobuttons">
      <div class="flex align-items-center">
        <RadioButton v-model="math" inputId="math1" name="math" value="Moy" class="mr-2" />
        <label for="math1" class="ml-2">Moy</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="math" inputId="math2" name="math" value="Min" class="mr-2" />
        <label for="math2" class="ml-2">Min</label>
      </div>
      <div class="flex align-items-center">
        <RadioButton v-model="math" inputId="math3" name="math" value="Max" class="mr-2" />
        <label for="math3" class="ml-2">Max</label>
      </div>

    </div>
    <div class="heightselect">
      <SelectButton v-model="selectedheight" :options="heights" :optionDisabled="optionDisabled" />
    </div>

    <div id='validatediv' position="center">
      <Button @click="updateScenarios">Valider</button>
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
  <div class="boutton2d3d" position="right">
    <SelectButton v-model="selectedDimension" :options="dimensions" :optionDisabled="optionDisabled" />
  </div>
</template>
  


<script>
/* eslint-disable */
import { ref } from "vue";



import Header from './Header.vue';
import App from '../App.vue';



// Import des éléments des librairies
import SpeedDial from 'primevue/speeddial';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import SelectButton from 'primevue/selectbutton';
import RadioButton from 'primevue/radiobutton';


export default {
  name: 'Toolbar-box',
  components: {
    SpeedDial,
    Sidebar,
    Button,
    MultiSelect,
    SelectButton,
    RadioButton

  },
  data() {
    return {

      selectedScenario2: [],

      selectedDimension: ref('2D'),
      dimensions: ref(['2D', '3D']),
      checked: ref(false),
      math: ref(''),
      selectedheight: ref('hmax'),
      heights: ref(['hmax', 'hfin']),


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
  watch: {
    selectedDimension(option) {
      if (option === '2D') {
        this.switchTo2D();
      } else if (option === '3D') {
        this.switchTo3D();
      }
    },
  },
  props: {
    selectedScenario: {
      type: Object,
      required: true
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
    switchTo2D() {
      // Code to switch to 2D view
      this.$emit('vue-2d');
      console.log("2D")
    },
    switchTo3D() {
      // Code to switch to 3D view
      this.$emit('vue-3d');
      console.log("3D")
    },
    updateScenarios() {
      if (this.selectedScenario2.length > 1) {
        let jsonemit = { selectedScenario2: this.selectedScenario2, math: this.math, height: this.selectedheight  }
        this.$emit('updateScenarios', jsonemit);

      } else {
        let jsonemit = { selectedScenario2: this.selectedScenario2, height: this.selectedheight  }
        this.$emit('updateScenarios', jsonemit);
      }

    }
  },
  mounted() {
  }
}
</script>
  
<style>
.heightselect {
  position: relative;
  left: 20%;
  top: 5%;

}

.ml-2 {
  padding-right: 10px;
}

#radiobuttons {
  display: inline-flex;
  position: relative;
  left: 20%;
  top: 2%;
}

.boutton2d3d {
  position: absolute;
  bottom: 10%;
  right: 2%;
  z-index: 2;

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

#validatediv {
  position: relative;
  top: 10%;
  left: 35%;

}

img {
  width: 100%;

}

#boutonCarte {
  margin: 5%;
  padding: 0%;
}
</style>

