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
body {
  margin: 0;
}
canvas {
  margin-top:50px;
  margin-bottom:25px;
  display: flex;
}
</style>