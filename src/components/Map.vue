<template>
 <div id="map" class="map">
 </div>
</template>

<script>
import { gavre } from "../client/gavre.js";


export default {
  name: 'mapComponent',
  props: {
    msg: String
  },mounted() {
    gavre()
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