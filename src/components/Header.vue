
<template>
  <div class="toolBar">
  <Toolbar >

    <template #center>
      <SelectButton v-model="value" :options="options" aria-labelledby="basic" />
    </template>
  </Toolbar>

  </div>
</template>

<script>
import { ref } from "vue";

import Toolbar from 'primevue/toolbar';
import SelectButton from 'primevue/selectbutton';



export default {
    name: 'menuComponent',

    components: {
        Toolbar,
        SelectButton
    },

    data() {
        return {
                    
          value : ref('Gâvres'),
          options : ref(['Gâvres', 'Arcachon']),
          checked : ref(false),
       
        }
    }
}


</script>

<style>

.toolBar{
    z-index: 2;
    position: absolute;
    width:100%;
    height:5%;
    top:0%;
}

#app .p-toolbar {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 0.5rem;
    border-radius: 6px;
    gap: 0.5rem;
}

.p-toolbar-group-center	{
  padding: 0px;
}

.p-component{
  padding: 0px;
}


</style>
