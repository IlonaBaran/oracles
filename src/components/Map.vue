<template>
  <div id="viewerDiv" class="viewer" @click="showCoords">
  </div>
  <Toolbar @icon-clicked="changeMap" ref="childComponent" @change-building="building" @reinit-view="cameraView"
    @vue-2d="vue2d" @vue-3d="vue3d">
  </Toolbar>
</template>

<script>
/* eslint-disable */
import Toolbar from "./Toolbar.vue";
import '../../node_modules/itowns/examples/css/widgets.css'
import { proj4, Extent, PlanarView } from "../../node_modules/itowns/dist/itowns";
import { ref } from "vue";
import { getHeightMesh, getImage, getData, averageLists, minLists, maxLists, getHeightFromScenarios } from '../services/Height_service.js'
import { layerOrtho, layerDEM, layerPLAN } from '../services/WMS_service.js'
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
      viewNew: ref(false),
    }
  },

  components: {
    Toolbar,
  },
  created() {
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

    var placement = {
      coord: viewExtent.center()
    }

    // Create the planar view
    view = new PlanarView(viewerDiv, viewExtent, {
      placement: placement,
    });

    view.addLayer(layerPLAN)
    view.addLayer(layerDEM);
    view.addLayer(bati);
    view.addLayer(layerOrtho);

    view.controls.enableRotation = false;
    view.notifyChange();

  },
  methods: {
    changeMap() {
      if (this.$refs.childComponent.mapSelected == "plan") {
        view.tileLayer.attachedLayers[0].visible = true;
        view.tileLayer.attachedLayers[3].visible = false;
        view.notifyChange();
      } else {
        view.tileLayer.attachedLayers[0].visible = false;
        view.tileLayer.attachedLayers[3].visible = true;
        view.notifyChange();
      }
    },
    building() {
      view.tileLayer.attachedLayers[2].visible = this.$refs.childComponent.visibleBuilding;
      view.notifyChange();
    },

    cameraView() {
      view.camera.camera3D.position.x = 223725.82916306859;
      view.notifyChange();

      view.camera.camera3D.position.y = 6751329.089913746;
      view.notifyChange();

      view.camera.camera3D.position.z = 2500.719216284468985;
      view.notifyChange();
    }, showCoords(e) {
      //console.log('view', view)
    },
    vue2d() {
      view.controls.goToTopView();
      view.controls.enableRotation = false;
      view.notifyChange();
    },
    vue3d() {
      view.controls.enableRotation = true;
      view.notifyChange();
    },

  }

};
</script>


<style>
.viewer {
  display: flex;
  background-color: blue;
  height: 96%;
  z-index: 0;
}
</style>