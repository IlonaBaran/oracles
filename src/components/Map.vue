<template>
  <div id="viewerDiv" class="viewer">
  </div>
  <Toolbar :view=view @updateTilt="updateTilt"></Toolbar>
</template>

<script>
/* eslint-disable */
import MapViewer from "../services/MapViewer.js"
import Toolbar from "./Toolbar.vue";
import '../../node_modules/itowns/examples/css/widgets.css'

import * as itowns from 'itowns';
import proj4 from 'proj4';

import { Navigation } from "../../node_modules/itowns/dist/itowns_widgets";


export default {
  name: 'mapComponent',
  components: {
    Toolbar,
  },
  data() {
    return {
      view: null
    };
  },
  created() {
    const viewerDiv = document.getElementById('viewerDiv');
  },
  mounted() {
    const coord = [-3.35291, 47.69651];
    const placement = {
      coord: new itowns.Coordinates('EPSG:4326', coord[0], coord[1]),
      range: 2500
    };

    let view = new itowns.GlobeView(viewerDiv, placement);


    proj4.defs(
      'EPSG:2154',
      '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    );


    var orthoSource = new itowns.WMTSSource({
      url: 'https://wxs.ign.fr/essentiels/geoportail/wmts/',
      crs: "EPSG:3857",
      name: 'ORTHOIMAGERY.ORTHOPHOTOS',
      tileMatrixSet: 'PM',
      format: 'image/jpeg',
      style: 'normal'
    })

    var orthoLayer = new itowns.ColorLayer('Ortho', {
      source: orthoSource,
    });

    view.addLayer(orthoLayer);


    //Adding navigation controls
    new Navigation(view, {
      position: 'bottom-right',
      translate: { y: -40 },
    });

  },
  methods: {
    updateTilt(tilt) {
      mapView.view.controls.setTilt(10);
    }
  }
}
</script>


<style>
.viewer {
  display: flex;
  background-color: blue;
  margin-top: 40px;
  height: 95%;
  z-index: 0;

}
</style>