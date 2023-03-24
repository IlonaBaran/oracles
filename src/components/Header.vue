<template>
  <div id="header" class="header">
    <h1 id="title"> Header </h1>
  </div>
</template>
   
<script>
export default {
  name: 'headerComponent'
}
</script>
   
   
<style>
.header {
  width: 100%;
  height: 40px;
  background-color: rgb(116, 126, 235);
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: black;
}
</style>