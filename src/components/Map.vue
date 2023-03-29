<template>
  <div id="viewerDiv" class="viewer">
  </div>
  <Toolbar :view=view @updateTilt="updateTilt"></Toolbar>
</template>

<script>
/* eslint-disable */
import MapViewer from "../services/MapViewer.js"
import Toolbar from "./Toolbar.vue";


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
    let mapView = new MapViewer(viewerDiv, coord);
    mapView.view.controls.setTilt(10)


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