<template>
  <div id="viewerDiv" class="viewer">
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


    //Adding Geotiff of water heights (the localhost link is due to the use of http-server)
    let url = 'http://localhost:8080/donnees/BDD_Simu_2022_02_17/output_rasters/S_1/S_1_hmax.tif';

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url)
    xhr.responseType = 'arraybuffer';
    xhr.onload = async function (e) {

      var buffer = await xhr.response;
      const tiff = await GeoTIFF.fromArrayBuffer(buffer);
      const image = await tiff.getImage();
      const bbox = await image.getBoundingBox();
      const width = await image.getWidth();
      const height = await image.getHeight();
      const data = await image.readRasters();

      // extract a subarray with the first 530*790=419,700 elements
      const subarray = data[0].subarray(0, 530 * 790);

      // split the subarray into rows of 790 elements
      const rows = [];
      for (let i = 0; i < subarray.length; i += 790) {
        rows.push(subarray.slice(i, i + 790));
      }
      const Xo = bbox[0];
      const Xf = bbox[2];
      const Yo = bbox[1];
      const Yf = bbox[3];
      const center = [Xf, Yo]
      const coord3 = new Coordinates('EPSG:2154', center[0], center[1]);


      const Xsize = (Xf - Xo) / width;
      const Ysize = (Yf - Yo) / height;

      let geometry = new THREE.BufferGeometry();

      const vertices = [];

      // //this just draws the extent of the image on the earth
      // const vertices = [
      //   -width * Xsize / 2, height * Ysize / 2, 0,         // top left
      //   width * Xsize / 2, height * Ysize / 2, 0,          // top right
      //   -width * Xsize / 2, -height * Ysize / 2, 0,        // bottom left
      //   -width * Xsize / 2, -height * Ysize / 2, 0,        // bottom left
      //   width * Xsize / 2, height * Ysize / 2, 0,          // top right
      //   width * Xsize / 2, -height * Ysize / 2, 0,         // bottom right 
      // ];

      let indices = [0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1];

      for (let i = 0; i < width - 1; i++) {
        for (let j = 0; j < height - 1; j++) {

          vertices.push(
            i * Xsize, j * Ysize, rows[i][j], // top left
            (i + 1) * Xsize, j * Ysize, rows[i + 1][j], // top right
            i * Xsize, (j + 1) * Ysize, rows[i][j + 1], // bottom left

            i * Xsize, (j + 1) * Ysize, rows[i][j + 1], // bottom left
            (i + 1) * Xsize, j * Ysize, rows[i + 1][j], // top right
            (i + 1) * Xsize, (j + 1) * Ysize, rows[i + 1][j + 1] // bottom right
          );
        };
      };
      console.log(vertices)
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
      geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(indices), 3));


      // create material
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.8,
        color: 0xE0FFFF,
        side: THREE.DoubleSide
      });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(coord3.as(view.referenceCrs));
      mesh.lookAt(new THREE.Vector3(0, 0, 0));

      mesh.updateMatrixWorld();

      view.scene.add(mesh);
      view.mesh = mesh;
      view.notifyChange();

      console.log(view.mesh)

    };
    xhr.send();

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
    }
  },

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