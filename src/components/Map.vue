<template>
  <div id="viewerDiv" class="viewer" @click="onClick">
  </div>
  <Toolbar @icon-clicked="changeMap" ref="childComponent" @change-building="building" @reinit-view="cameraView"
    @vue-2d="vue2d" @vue-3d="vue3d" :selectedScenario="this.selectedScenario" @updateScenarios="updateHeightmap">
  </Toolbar>
</template>

<script>
/* eslint-disable */
import Toolbar from "./Toolbar.vue";
import '../../node_modules/itowns/examples/css/widgets.css'
import { proj4, Extent, PlanarView } from "../../node_modules/itowns/dist/itowns";
import { ref } from "vue";
import { getHeightMesh, getImage, getData, averageLists, minLists, maxLists, getHeightFromScenarios, concatenateHeightMapList } from '../services/Height_service.js'
import { layerOrtho, layerDEM, layerPLAN } from '../services/WMS_service.js'
import { toRaw } from 'vue';
import { bati } from '../services/FileSource_service.js'

let view = ref(false);

/**
 * Map,élément carte de la page
 *
 * @component mapComponent
 * 
 * @author Equipe du projet Oracle - ENSG, TSI 
 * @version 1.0
 * @since 25.04.2023
 * 
 * Composants enfants : 
 * -- Librairie PrimeVue --
 * Toolbar
 * 
 * @requires ../../node_modules/primevue/toolbar/Toolbar.vue
 */
export default {
  name: 'mapComponent',
  components: {
    Toolbar,
  },
  props: {
    /**
     * String contenant le type de carte sélectionnée
     */
    mapSelected: { type: String },
    /**
     * Boolean représentant la visibilité de la couche des bâtiments
     */
    visibleBuilding: { type: Boolean },
    /**
     * Object contenant la liste des scénarios sélectionnés
     */
    selectedScenario: { type: Object, required: true }
  },
  data() {
    return {
      jsonemit: {},
      math: "",
      heightmaps: [],
      urlList: [],
      viewNew: ref(false),
    }
  },
  created() {
    const viewerDiv = document.getElementById("viewerDiv"); //élement itowns viewerDiv 
  },
  mounted() {
    //définition du type de projection
    proj4.defs(
      "EPSG:2154",
      "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
    );

    //définition des limites de la vue, jusqu'où elle va
    const viewExtent = new Extent(
      "EPSG:2154",
      222955.5,
      224545.5,
      6750269.5,
      6752639.5
    );

    //Définition de l'emplacement de la vue planaire
    var placement = {
      coord: viewExtent.center()
    }

    // Création de la vue planaire
    view = new PlanarView(viewerDiv, viewExtent, {
      placement: placement,
    });

    //L'ordre doit être pris en compte pour la fonction changeMap()
    //Ajout de la couche IGN du plan WMS
    view.addLayer(layerPLAN)
    //Ajout de la couche d'élévation WMS
    view.addLayer(layerDEM);
    //Ajout du fichier source des bâtiments
    view.addLayer(bati);
    //Ajout de la couche d'image satellite WMS
    view.addLayer(layerOrtho);

    //blocage de la rotation lors de l'initialisation en vue 2D
    view.controls.enableRotation = false;
    view.notifyChange();
  },
  methods: {
    /**
     * //Fonction qui gère le changement de couche de la basemap
     * @public
     */
    changeMap() {
      //Affichage de la couche IGN cadastrale et non la couche satellitaire
      if (this.$refs.childComponent.mapSelected == "plan") {
        view.tileLayer.attachedLayers[0].visible = true;
        view.tileLayer.attachedLayers[3].visible = false;
        view.notifyChange();
      } else {
        //Affichage de la couche satellitaire et non la couche IGN cadastrale
        view.tileLayer.attachedLayers[0].visible = false;
        view.tileLayer.attachedLayers[3].visible = true;
        view.notifyChange();
      }
    },
    /**
     * //Fonction qui gère la visibilité de la couche des bâtiments
     * @public
     */
    building() {
      view.tileLayer.attachedLayers[2].visible = this.$refs.childComponent.visibleBuilding;
      view.notifyChange();
    },
    /**
     * //Fonction qui recentre la vue sur Gavres
     * @public
     */
    cameraView() {
      //Retour au centre de la carte, ce sont les coordonnées de Gavres     
      view.camera.camera3D.position.x = 223725.82916306859;
      view.camera.camera3D.position.y = 6751329.089913746;
      view.camera.camera3D.position.z = 2500.719216284468985;
      view.notifyChange();

    },
    /**
     * Fonction qui peut gérer l'événement onClick sur la carte
     * @param {event} e click event
     * @public
     */
    onClick(e) {
      //ajouter le code ici pour l'événement lorsque l'on clique sur la vue
    },
    /**
     * //Fonction permettant de revenir à la vue aérienne en 2D
     * @public
     */
    vue2d() {
      //Retourne en vue 2D et supprime l'option de rotation de la caméra.
      view.controls.goToTopView();
      view.controls.enableRotation = false;
      view.notifyChange();
    },
    /**
     * //Fonction pour passer en mode 3D, permet la rotation
     * @public
     */
    vue3d() {
      //activer l'option de rotation de la caméra
      view.controls.enableRotation = true;
      view.notifyChange();
    },
    /**
     * fonction de mise à jour des hauteurs d'eau en cas de modification des scénarios sélectionnés
     * @param {Object} jsonemit contient le scénario sélectionné ou, si plusieurs sont sélectionnés, les scénarios et la méthode de calcul
     * @public
     */
    updateHeightmap(jsonemit) {
      this.jsonemit = jsonemit; //récupération de l'entrée de toolbar de la carte de hauteur

      //Si un mesh a déjà été chargé, il est supprimé
      if (view.scene.children.length > 2) {
        view.scene.children[view.scene.children.length - 1].removeFromParent()
      }

      //Récupére les scénarios sélectionnés dans la toolbar de sélection de la carte d'altitude
      this.heightmaps = this.jsonemit.selectedScenario2;
      this.urlList = concatenateHeightMapList(this.heightmaps, this.jsonemit.height);
      const Scenarios = toRaw(this.urlList)

      //si un seul scénario est sélectionné
      if (Scenarios.length == 1) {
        //récupération de l'image
        getImage(Scenarios[0]).then(image => {
          //chargement de l'image
          getHeightMesh(image).then(mesh => {
            view.scene.add(mesh);
            view.mesh = mesh;
            view.notifyChange();
          })
        })
      } else {
        //si plusieurs scénarios sont sélectionnés
        let listImages = [];
        //Attendre que toutes les images soient chargées
        Promise.all(Scenarios.map(getImage))
          .then((images) => {
            listImages = images;
            // récupéreration toutes les données de la liste d'images
            getData(listImages)
              .then(scenarios => {
                let data;
                //Calcule les données à partir de la méthode choisie
                switch (this.jsonemit.math) {
                  case 'Moy':
                    //calcul de la moyenne des scénarios
                    data = [averageLists(scenarios.datas)];
                    console.log('moy data', data)
                    break;
                  case 'Min':
                    //calcul du minimum des scénarios
                    data = [minLists(scenarios.datas)];
                    console.log(' min data', data)
                    break;
                  case 'Max':
                    //calcul du maximum des scénarios
                    data = [maxLists(scenarios.datas)];
                    console.log('max data', data)
                    break;
                }

                let bbox = scenarios.bbox; let width = scenarios.width; let height = scenarios.height;

                //envoi de la bbox, de la largeur, de la hauteur et des données calculées pour afficher un seul mesh
                getHeightFromScenarios(bbox, width, height, data).then(mesh => {
                  //chargement du mesh
                  view.scene.add(mesh);
                  view.mesh = mesh;
                  view.notifyChange();
                })

              })
          })
      }
    }
  }

};
</script>


<style>
.viewer {
  display: flex;
  height: 96%;
  z-index: 0;
}
</style>