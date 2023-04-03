<template>
  <div id="viewerDiv" class="viewer"></div>
</template>

<script>
/* eslint-disable */
import Toolbar from "./Toolbar.vue";
import "../../node_modules/itowns/examples/css/widgets.css";
import {
  FileSource,
  THREE,
  Style,
  proj4,
  Extent,
  GeometryLayer,
  FeatureGeometryLayer,
  Coordinates,
  GlobeView,
  WMTSSource,
  WMSSource,
  ColorLayer,
  ElevationLayer,
  Fetcher
} from "../../node_modules/itowns/dist/itowns";
import { Navigation } from "../../node_modules/itowns/dist/itowns_widgets.js";
import TIFFParser from '../../node_modules/itowns/examples/js/plugins/TIFFParser.js';
// import * as THREE from 'three';
import * as GeoTIFF from 'geotiff';
import { async } from "regenerator-runtime";
import { Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, Texture, TextureLoader } from "three";
import { scene } from "@/client";
import { ref } from 'vue';


let view = ref(false);

export default {
  name: "mapComponent",
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
      coord: new Coordinates("EPSG:4326", coord[0], coord[1]),
      range: 2500,
    };

    view = new GlobeView(viewerDiv, placement);

    // ADD NAVIGATION TOOLS :
    new Navigation(view, {
      position: "bottom-left",
      translate: { y: -40 },
    });

    var orthoSource = new WMTSSource({
      url: "https://wxs.ign.fr/essentiels/geoportail/wmts/",
      crs: "EPSG:3857",
      name: "ORTHOIMAGERY.ORTHOPHOTOS",
      tileMatrixSet: "PM",
      format: "image/jpeg",
      style: "normal",
    });

    var orthoLayer = new ColorLayer("Ortho", {
      source: orthoSource,
    });

    //view.addLayer(orthoLayer);

    const batsource = new FileSource({
      url: "gavres_bati.geojson",
      crs: "EPSG:2154",
      format: "application/json",
    });

    let basic = new FeatureGeometryLayer("basic", {
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
        },
      }),
    });

    //view.addLayer(basic);

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

    //Adding Geotiff of water heights (the localhost link is due to the use of http-server)
    let url = 'http://localhost:8080/donnees/BDD_Simu_2022_02_17/output_rasters/mean_hmax.tif';

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

      const Xsize = (Xf - Xo) / width;
      const Ysize = (Yf - Yo) / height;

      let geometry = new THREE.BufferGeometry();
      let vertices = [];
      let colors = [];

      for (let i = 0; i < width - 1; i++) {
        for (let j = 0; j < height - 1; j++) {
          vertices.push(Xo + i * Xsize);
          vertices.push(Yo + j * Ysize);
          if (rows[i][j]) {
            vertices.push(rows[i][j] + 4696062);
          } else {
            vertices.push(0)
          }

          vertices.push(Xo + (i + 1) * Xsize);
          vertices.push(Yo + j * Ysize);
          if (rows[i][j]) {
            vertices.push(rows[i + 1][j] + 4696062);
          } else {
            vertices.push(0)
          }

          vertices.push(Xo + i * Xsize);
          vertices.push(Yo + (j + 1) * Ysize);
          if (rows[i][j]) {
            vertices.push(rows[i][j + 1] + 4696062);
          } else {
            vertices.push(0)
          }

          vertices.push(Xo + i * Xsize);
          vertices.push(Yo + (j + 1) * Ysize);
          if (rows[i][j]) {
            vertices.push(rows[i][j + 1] + 4696062);
          } else {
            vertices.push(0)
          }

          vertices.push(Xo + (i + 1) * Xsize);
          vertices.push(Yo + j * Ysize);
          if (rows[i][j]) {
            vertices.push(rows[i + 1][j] + 4696062);
          } else {
            vertices.push(0)
          }


          vertices.push(Xo + (i + 1) * Xsize);
          vertices.push(Yo + (j + 1) * Ysize);
          if (rows[i][j]) {
            vertices.push(rows[i + 1][j + 1] + 4696062);
          } else {
            vertices.push(0)
          }

        };
      };
      console.log(vertices)
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));

      // create material
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.8,
        color: 0xff4500
      });

      let mesh = new THREE.Mesh(geometry, material);

      view.scene.add(mesh);




      // view.scene.children[3].position.x = 222955.5;
      // view.scene.children[3].position.y = 6750269.5;
      // view.scene.children[3].position.z = 4696062;
      // view.notifyChange()
      console.log(view.scene)


    };
    xhr.send();

    // view.camera.camera3D.position.x = 0;
    // view.camera.camera3D.position.y = 0;
    // view.camera.camera3D.position.z = 0;
    // view.notifyChange()


  },
  methods: {},
};
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