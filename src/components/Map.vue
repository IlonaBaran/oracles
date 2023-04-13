<template>
  <div id="viewerDiv" class="viewer" @click="showCoords">
  </div>
  <Toolbar @icon-clicked="changeMap" ref="childComponent" @change-building="building" @reinit-view="cameraView">
  </Toolbar>
</template>

<script>
/* eslint-disable */
import Toolbar from "./Toolbar.vue";
import '../../node_modules/itowns/examples/css/widgets.css'
import { FileSource, THREE, Style, proj4, Extent, FeatureGeometryLayer, Coordinates, GlobeView, PlanarView, WMTSSource, WMSSource, ColorLayer, ElevationLayer, Copy, As } from "../../node_modules/itowns/dist/itowns";
import { ref } from "vue";
import { getHeightMesh } from '../services/Height_service.js'
import { layerOrtho, layerDEM, layerPLAN } from '../services/WMS_service.js'
import { basic } from '../services/FileSource_service.js'


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

    const coord = [-3.35291, 47.69651];

    //defining projection coordinate unit
    proj4.defs(
      "EPSG:2154",
      "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
    );

    const frcoord = proj4('EPSG:3857', 'EPSG:2154', coord)


    //defining the views geographic extent, how far does it go
    const viewExtent = new Extent(
      "EPSG:2154",
      222955.5,
      224545.5,
      6750269.5,
      6752639.5
    );

    var placement = {
      coord: viewExtent.center(),
    }

    // Create the planar view
    view = new PlanarView(viewerDiv, viewExtent, {
      placement: placement,
    });


    // //viewNew = new GlobeView(viewerDiv, placement);
    // // ADD NAVIGATION TOOLS :
    // new Navigation(view, {
    //   position: 'bottom-right',
    //   translate: { y: -40 },
    // });


    // view.addLayer(planIGNv2Layer);
    // view.addLayer(demHRLayer);


    // view.addLayer(orthoLayer);

    view.addLayer(layerPLAN)
    view.addLayer(layerDEM);
    view.addLayer(basic);
    view.addLayer(layerOrtho);




    // //Adding Geotiff of water heights (the localhost link is due to the use of http-server)
    let url = 'http://localhost:8080/gavres_mnt.tif';

    getHeightMesh(url).then(mesh => {

      view.scene.add(mesh);
      view.mesh = mesh;
      view.notifyChange();

    })

    console.log(view)


  },
  methods: {
    changeMap() {
      if (this.$refs.childComponent.mapSelected == "plan") {
        view.tileLayer.attachedLayers[1 - 1].visible = true;
        view.tileLayer.attachedLayers[4 - 1].visible = false;
        view.notifyChange();
      } else {
        view.tileLayer.attachedLayers[1 - 1].visible = false;
        view.tileLayer.attachedLayers[4 - 1].visible = true;
        view.notifyChange();
      }
    },
    building() {
      view.tileLayer.attachedLayers[3 - 1].visible = this.$refs.childComponent.visibleBuilding;
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
      console.log(view.pickCoordinates(e));

      console.log(view.camera.camera3D)
    }

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