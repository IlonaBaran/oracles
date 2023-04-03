<template>
  <div id="viewerDiv" class="viewer">
  </div>
  <Toolbar @icon-clicked="toggleHelpText" ref="childComponent"></Toolbar>
</template>

<script>
/* eslint-disable */
import Toolbar from "./Toolbar.vue";
import '../../node_modules/itowns/examples/css/widgets.css'
import { FileSource, THREE, Style, proj4, Extent, FeatureGeometryLayer, Coordinates, GlobeView, WMTSSource, WMSSource, ColorLayer, ElevationLayer, } from "../../node_modules/itowns/dist/itowns";
import { Navigation } from '../../node_modules/itowns/dist/itowns_widgets.js';
import {
  planIGNv2Layer, orthoLayer, batiLayer,
  demLayer, demHRLayer, courbeNiveauLayer
} from '../services/WMTS_service.js'
import { ref } from "vue";

export default {
  name: 'mapComponent',
  props: {
    mapSelected: String,
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
    const viewerDiv = document.getElementById('viewerDiv');

  },
  mounted() {
    const coord = [-3.35291, 47.69651];

    //defining projection coordinate unit
    proj4.defs(
      'EPSG:2154',
      '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    );

    //defining the views geographic extent, how far does it go
    const viewExtent = new Extent(
      'EPSG:2154',
      222955.5000, 224545.5000, 6750269.5000, 6752639.5000
    );

    var placement = {
      coord: new Coordinates('EPSG:4326', coord[0], coord[1]),
      range: 2500
    };

    const view = new GlobeView(viewerDiv, placement);
    //viewNew = new GlobeView(viewerDiv, placement);
    // ADD NAVIGATION TOOLS :
    new Navigation(view, {
      position: 'bottom-right',
      translate: { y: -40 },
    });

    //view.addLayer(planIGNv2Layer);

    view.addLayer(orthoLayer);
    // view.addLayer(demLayer);
    view.addLayer(demHRLayer);
    // view.addLayer(routeLayer);
    // view.addLayer(batiLayer);
    // view.addLayer(courbeNiveauLayer);

    // view.removeLayer(planIGNv2Layer.id);



    const batsource = new FileSource({
      url: 'gavres_bati.geojson',
      crs: 'EPSG:2154',
      format: 'application/json',
    });

    let basic = new FeatureGeometryLayer('basic', {
      // Use a FileSource to load a single file once
      source: batsource,
      transparent: true,
      opacity: 0.7,
      //zoom: { min: 10 },
      style: new Style({
        fill: {
          color: setColor,
          base_altitude: setAltitude,
          extrusion_height: setExtrusion,
        }
      })
    });

    view.addLayer(basic);

    function setAltitude(properties) {
      if (properties.altitude_sol != null) {
        return properties.altitude_sol + properties.hauteur;
      } else {
        //What to do when there is not floor value?
        return 5;
      }
    }

    function setExtrusion(properties) {
      return properties.hauteur;
    }

    function setColor(properties) {

      return new THREE.Color(0xffaaaa);
    }


  },
  methods: {
    toggleHelpText() {
      console.log(this.$refs.childComponent.mapSelected);
      if (this.$refs.childComponent.mapSelected == "plan") {

        // view.removeLayer(orthoLayer.id);
        // view.addLayer(planIGNv2Layer);

      }

    }
  }
}
</script>


<style>
.viewer {
  display: flex;
  background-color: blue;
  height: 96%;
  z-index: 0;

}
</style>