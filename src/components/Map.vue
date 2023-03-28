<template>
  <div id="viewerDiv" class="viewer">
  </div>
</template>

<script>
/* eslint-disable */
import MapViewer from "../services/MapViewer.js"


export default {
  name: 'mapComponent',
  mounted() {
    const viewerDiv = document.getElementById('viewerDiv');
    const coord = [-3.35291, 47.69651];
    let mapView = new MapViewer(viewerDiv, coord)
  },
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