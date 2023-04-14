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
import { FileSource, THREE, Style, proj4, Extent, FeatureGeometryLayer, Coordinates, GlobeView, PlanarView, WMTSSource, WMSSource, ColorLayer, ElevationLayer, Copy, As } from "../../node_modules/itowns/dist/itowns";
import { ref } from "vue";
import { getHeightMesh, getImage, getData, averageLists, minLists, maxLists, getHeightFromScenarios } from '../services/Height_service.js'
import { layerOrtho, layerDEM, layerPLAN } from '../services/WMS_service.js'
import { basic } from '../services/FileSource_service.js'
import { image } from "d3-fetch";


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
    view.addLayer(basic);
    view.addLayer(layerOrtho);

    // // //Adding Geotiff of water heights (the localhost link is due to the use of http-server)

    // let Scenarios = [
    //   'http://localhost:8080/output_rasters/S_102/S_102_hmax.tif',
    //   'http://localhost:8080/output_rasters/S_1035/S_1035_hmax.tif',
    //   'http://localhost:8080/output_rasters/S_1044/S_1044_hmax.tif',
    //   'http://localhost:8080/output_rasters/S_1027/S_1027_hmax.tif',
    //   'http://localhost:8080/output_rasters/S_1040/S_1040_hmax.tif',
    //   'http://localhost:8080/output_rasters/S_1069/S_1069_hmax.tif',
    //   'http://localhost:8080/output_rasters/S_1052/S_1052_hmax.tif',
    //   'http://localhost:8080/output_rasters/S_1070/S_1070_hmax.tif',
    //   'http://localhost:8080/output_rasters/S_1222/S_1222_hmax.tif',
    //   'http://localhost:8080/output_rasters/S_1230/S_1230_hmax.tif',
    // ]

    let Scenarios = [
      'http://localhost:8080/output_rasters/S_1040/S_1040_hmax.tif',
      'http://localhost:8080/output_rasters/S_1069/S_1069_hmax.tif',
    ]


    let listImages = [];
    Promise.all(Scenarios.map(getImage))
      .then((images) => {
        listImages = images;
        console.log('All images loaded:', listImages);

        getData(listImages)
          .then(scenarios => {

            let scenario = scenarios.datas;
            let avgOfScenarios = [averageLists(scenarios.datas)];
            let minOfScenarios = [minLists(scenarios.datas)];
            let maxOfScenarios = [maxLists(scenarios.datas)];

            let bbox = scenarios.bbox; let width = scenarios.width; let height = scenarios.height;
            let data = maxOfScenarios;

            console.log('data', data)

            getHeightFromScenarios(bbox, width, height, data).then(mesh => {
              view.scene.add(mesh);
              view.mesh = mesh;
              view.notifyChange();
            })

          })

      })

    view.controls.enableRotation = false;
    view.notifyChange();

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