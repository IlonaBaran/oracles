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
import { FileSource, THREE, Style, proj4, Extent, FeatureGeometryLayer, Coordinates, GlobeView, WMTSSource, WMSSource, ColorLayer, ElevationLayer, } from "../../node_modules/itowns/dist/itowns";
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

    let view = new GlobeView(viewerDiv, placement);

    // ADD NAVIGATION TOOLS :
    new Navigation(view, {
      position: 'bottom-left',
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