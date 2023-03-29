<template>
  <div id="viewerDiv" class="viewer">
  </div>
  <Toolbar :view=view @updateTilt="updateTilt"></Toolbar>
</template>

<script>
/* eslint-disable */
import MapViewer from "../services/MapViewer.js"
import Toolbar from "./Toolbar.vue";
//import * as itowns from 'itowns';
import '../../node_modules/itowns/examples/css/widgets.css'
import { FileSource, THREE, Style, proj4, FeatureGeometryLayer, Coordinates, GlobeView, WMTSSource, ColorLayer, ElevationLayer, } from "../../node_modules/itowns/dist/itowns";

import { Navigation } from '../../node_modules/itowns/dist/itowns_widgets.js';

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
  mounted() {
    const viewerDiv = document.getElementById('viewerDiv');
    const coord = [-3.35291, 47.69651];

    var placement = {
      coord: new Coordinates('EPSG:4326', coord[0], coord[1]),
      range: 2500
    };

    let view = new GlobeView(viewerDiv, placement);

    // ADD NAVIGATION TOOLS :
    new Navigation(view, {
                position: 'bottom-right',
                translate: { y: -40 },
            });
    
            var orthoSource = new WMTSSource({
            url: 'https://wxs.ign.fr/essentiels/geoportail/wmts/',
            crs: "EPSG:3857",
            name: 'ORTHOIMAGERY.ORTHOPHOTOS',
            tileMatrixSet: 'PM',
            format: 'image/jpeg',
            style: 'normal'
        })

        var orthoLayer = new ColorLayer('Ortho', {
            source: orthoSource,
        });

        view.addLayer(orthoLayer);


  },
  methods: {
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