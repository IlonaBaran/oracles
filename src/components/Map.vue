<template>
  <div id="viewerDiv" class="viewer">
  </div>
</template>

<script>
import { scene } from "../client/index.js";


export default {
  name: 'mapComponent',
  mounted() {
    scene()
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