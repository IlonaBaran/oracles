<template>
  <div id="viewerDiv" class="viewer" @click="showCoords">
  </div>
  <Toolbar @icon-clicked="changeMap" ref="childComponent" @change-building="building" @reinit-view="cameraView"
    @vue-2d="vue2d" @vue-3d="vue3d" :selectedScenario="this.selectedScenario" @updateScenarios="updateHeightmap">
  </Toolbar>
</template>

<script>
/* eslint-disable */
import Toolbar from "./Toolbar.vue";
import App from "../App.vue";
import '../../node_modules/itowns/examples/css/widgets.css'
import { proj4, Extent, PlanarView } from "../../node_modules/itowns/dist/itowns";
import { ref } from "vue";
import { getHeightMesh, getImage, getData, averageLists, minLists, maxLists, getHeightFromScenarios, concatenateHeightMapList } from '../services/Height_service.js'
import { layerOrtho, layerDEM, layerPLAN } from '../services/WMS_service.js'
import { isProxy, toRaw } from 'vue';
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
      jsonemit: {},
      math: "",
      heightmaps: [],
      urlList: [],
      viewNew: ref(false),
    }
  },
  props: {
    selectedScenario: {
      type: Object,
      required: true
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
      // let lists = [[1, 6, 3, 6], [4, 5, 6, 1], [6, 1, 1, 4],]
      // console.log('lists', lists)
      // console.log('max', maxLists(lists));
      // console.log('min', minLists(lists));
      // console.log('av', averageLists(lists));
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
    updateHeightmap(jsonemit) {

      this.jsonemit = jsonemit;

      if (view.scene.children.length > 2) {
        view.scene.children[view.scene.children.length - 1].removeFromParent()
      }

      this.heightmaps = this.jsonemit.selectedScenario2;
      this.urlList = concatenateHeightMapList(this.heightmaps);
      const Scenarios = toRaw(this.urlList)

      if (Scenarios.length == 1) {
        console.log('single')
        getImage(Scenarios[0]).then(image => {
          getHeightMesh(image).then(mesh => {
            view.scene.add(mesh);
            view.mesh = mesh;
            view.notifyChange();
          })
        })

      } else {

        console.log('multiple')

        let listImages = [];
        Promise.all(Scenarios.map(getImage))
          .then((images) => {
            listImages = images;

            getData(listImages)
              .then(scenarios => {

                console.log('scenarios.datas', scenarios.datas)

                let data;
                switch (this.jsonemit.math) {
                  case 'Moy':
                    data = [averageLists(scenarios.datas)];
                    console.log('moy data', data)
                    break;
                  case 'Min':
                    data = [minLists(scenarios.datas)];
                    console.log(' min data', data)
                    break;
                  case 'Max':
                    data = [maxLists(scenarios.datas)];
                    console.log('max data', data)
                    break;
                }

                let bbox = scenarios.bbox; let width = scenarios.width; let height = scenarios.height;

                console.log('data', data)

                getHeightFromScenarios(bbox, width, height, data).then(mesh => {
                  view.scene.add(mesh);
                  view.mesh = mesh;
                  view.notifyChange();
                })

              })
          })
      }
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