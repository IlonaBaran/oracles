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


export default {
  name: 'mapComponent',
  props: {
    mapSelected: String,
    visibleBuilding: Boolean,
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
  props: {
    selectedScenario: {
      type: Object,
      required: true
    }
  },
  components: {
    Toolbar,
  },
  created() {
    //itowns viewerDiv element
    const viewerDiv = document.getElementById("viewerDiv");
  },
  mounted() {

    //defining projection coordinate unit
    proj4.defs(
      "EPSG:2154",
      "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
    );

    //defining the views geographic extent, how far does it go
    const viewExtent = new Extent(
      "EPSG:2154",
      222955.5,
      224545.5,
      6750269.5,
      6752639.5
    );

    //defining Planar view's placement
    var placement = {
      coord: viewExtent.center()
    }

    // Create the planar view
    view = new PlanarView(viewerDiv, viewExtent, {
      placement: placement,
    });

    //Order must be taken into account for changeMap() function

    //adding WMS Plan IGN layer
    view.addLayer(layerPLAN)
    //adding WMS Elevation layer
    view.addLayer(layerDEM);
    //adding File source buildings
    view.addLayer(bati);
    //adding WMS satellite image layer
    view.addLayer(layerOrtho);

    //blocking rotation when initializing in 2D view option
    view.controls.enableRotation = false;
    view.notifyChange();

  },
  methods: {
    changeMap() {
      //Show Plan IGN layer and not Satellite layer
      if (this.$refs.childComponent.mapSelected == "plan") {
        view.tileLayer.attachedLayers[0].visible = true;
        view.tileLayer.attachedLayers[3].visible = false;
        view.notifyChange();
      } else {
        //Show Satellite layer and not Plan IGN layer
        view.tileLayer.attachedLayers[0].visible = false;
        view.tileLayer.attachedLayers[3].visible = true;
        view.notifyChange();
      }
    },
    building() {
      //Show or don't show building layer
      view.tileLayer.attachedLayers[2].visible = this.$refs.childComponent.visibleBuilding;
      view.notifyChange();
    },

    cameraView() {
      //Return to center of map, these are Gavres coords
      view.camera.camera3D.position.x = 223725.82916306859;
      view.camera.camera3D.position.y = 6751329.089913746;
      view.camera.camera3D.position.z = 2500.719216284468985;
      view.notifyChange();

    }, onClick(e) {
      //add code here for event when clicking on view
    },
    vue2d() {
      //Go to Aerial view and remove camera rotation option
      view.controls.goToTopView();
      view.controls.enableRotation = false;
      view.notifyChange();
    },
    vue3d() {
      //enable camera rotation option
      view.controls.enableRotation = true;
      view.notifyChange();
    },
    updateHeightmap(jsonemit) {
      //retrieving heightmap toolbar input
      this.jsonemit = jsonemit;

      //If a mesh has already been loaded remove it
      if (view.scene.children.length > 2) {
        view.scene.children[view.scene.children.length - 1].removeFromParent()
      }

      //Retrieve selected Scenarios from heightmap selection toolbar
      this.heightmaps = this.jsonemit.selectedScenario2;
      this.urlList = concatenateHeightMapList(this.heightmaps);
      const Scenarios = toRaw(this.urlList)

      //if only one scenario is selected
      if (Scenarios.length == 1) {
        //get the image
        getImage(Scenarios[0]).then(image => {
          //load the image
          getHeightMesh(image).then(mesh => {
            view.scene.add(mesh);
            view.mesh = mesh;
            view.notifyChange();
          })
        })

      } else {
        //if multiple scenarios are selected
        let listImages = [];
        //Wait for all image to be loaded
        Promise.all(Scenarios.map(getImage))
          .then((images) => {
            listImages = images;
            //then get all the data from the list of images
            getData(listImages)
              .then(scenarios => {
                let data;
                //Compute data from chosen method
                switch (this.jsonemit.math) {
                  case 'Moy':
                    //averaging of the scenarios
                    data = [averageLists(scenarios.datas)];
                    console.log('moy data', data)
                    break;
                  case 'Min':
                    //minimum of the scenarios
                    data = [minLists(scenarios.datas)];
                    console.log(' min data', data)
                    break;
                  case 'Max':
                    //maximum of the scenarios
                    data = [maxLists(scenarios.datas)];
                    console.log('max data', data)
                    break;
                }

                let bbox = scenarios.bbox; let width = scenarios.width; let height = scenarios.height;

                //sending bbox, width, height and computed data to show one single mesh
                getHeightFromScenarios(bbox, width, height, data).then(mesh => {
                  //loading mesh
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