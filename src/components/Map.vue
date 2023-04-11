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
import { FileSource, THREE, Style, proj4, Extent, FeatureGeometryLayer, Coordinates, GlobeView, WMTSSource, WMSSource, ColorLayer, ElevationLayer, Copy, As } from "../../node_modules/itowns/dist/itowns";
import { Navigation } from '../../node_modules/itowns/dist/itowns_widgets.js';
import * as GeoTIFF from 'geotiff';
import {
  planIGNv2Layer, orthoLayer,
  demHRLayer
} from '../services/WMTS_service.js'
import { ref } from "vue";

import {
  bati3DLayer
} from '../services/WFS_service.js'
import { inheritLeadingComments } from "@babel/types";
import { getHeightMesh } from '../services/Height_service.js'

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
    const proj2154 = proj4.defs(
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
      coord: new Coordinates('EPSG:4326', coord[0], coord[1]),
      range: 2500
    };

    view = new GlobeView(viewerDiv, placement);

    //viewNew = new GlobeView(viewerDiv, placement);
    // ADD NAVIGATION TOOLS :
    new Navigation(view, {
      position: 'bottom-right',
      translate: { y: -40 },
    });


    view.addLayer(planIGNv2Layer);
    view.addLayer(demHRLayer);
    view.addLayer(bati3DLayer);
    view.addLayer(orthoLayer);

    // // //Adding Geotiff of water heights (the localhost link is due to the use of http-server)
    // let url = 'http://localhost:8080/gavres_mnt.tif';

    // getHeightMesh(url).then(mesh => {

    //   view.scene.add(mesh);
    //   view.mesh = mesh;
    //   view.notifyChange();

    // })

  },
  methods: {
    changeMap() {
      if (this.$refs.childComponent.mapSelected == "plan") {
        view.tileLayer.attachedLayers[1].visible = true;
        view.tileLayer.attachedLayers[4].visible = false;
        view.notifyChange();
      } else {
        view.tileLayer.attachedLayers[1].visible = false;
        view.tileLayer.attachedLayers[4].visible = true;
        view.notifyChange();
      }
    },
    building() {
      view.tileLayer.attachedLayers[3].visible = this.$refs.childComponent.visibleBuilding;
      view.notifyChange();
    },

    cameraView() {
      view.camera.camera3D.position.x = 4295077.582429348;
      view.notifyChange();

      view.camera.camera3D.position.y = -251632.32006396126;
      view.notifyChange();

      view.camera.camera3D.position.z = 4696062.254883134;
      view.notifyChange();
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