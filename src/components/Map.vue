<template>
 <div id="map" class="map">
 </div>
</template>

<script>
import { init } from "../client/index.js";


export default {
  name: 'mapComponent',
  props: {
    msg: String
  },mounted() {
    init()
},
}
</script>


<style>
body {
  margin: 0;
}
canvas {
  display: block;
}
</style>