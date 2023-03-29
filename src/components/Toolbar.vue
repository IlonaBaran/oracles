<template>
    <div class="toolbar">
      <!-- <button @click="toggleLegend" class="button">{{ legend }}</button> -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'Toolbar-box',
  data() {
    return {
      is2D: true,
      legend2D: '2D',
      legend3D: '3D'
    }
  },
  computed: {
    legend() {
      // Return the appropriate legend based on the boolean value of is2D
      return this.is2D ? this.legend2D : this.legend3D;
    }
  },
  methods: {
    toggleLegend() {
      // Toggle the boolean value of is2D
      this.is2D = !this.is2D;
    }
  }
}
  </script>
  
  <style>
 .button {
  display: inline-block;
  padding: 10px 15px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #6366f1;
  border: none;
  border-radius: 2px;
  box-shadow: 0 9px #999;
  position: fixed;
  bottom: 5%;
  right: 2%;
}

.button:hover {background-color: #6366f1}

.button:active {
  background-color: #6366f1;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.toolbar{
  z-index: 2;
}
  </style>
  