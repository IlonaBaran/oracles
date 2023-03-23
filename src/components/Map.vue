<template>
 <div id="map" class="map">
 </div>
</template>

<script>
import { gavre } from "../client/gavre.js";


export default {
  name: 'mapComponent',
  mounted() {
    gavre()
},
}
</script>


<style>

canvas {
  display: flex;
  background-color: blue;
  margin-top: 50px;
}
</style>