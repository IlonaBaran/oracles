
<template>
  <div class="toolBar">
  <Toolbar >
    <template #start>

        <Button  v-styleclass="{ selector: '.card', toggleClass: 'p-hidden' }" type="button" icon="pi pi-bars" label="" />
        <MultiSelect v-model="selectedScenario" :options="cities" filter optionLabel="name" placeholder="Sélection Scénarios"  
                    :maxSelectedLabels="3" class="w-full md:w-20rem selectScenario margin-right:15px"
                    :selectedScenario="this.selectedScenario" />
        <CascadeSelect v-model="selectedGraph" :options="countries" optionLabel="name" optionGroupLabel="name"
                :optionGroupChildren="['states']" style="min-width: 14rem " placeholder="Sélection Graphique" class="selectGraph" 
                />
        </template>

    <template #end>
      <SelectButton v-model="value" :options="options" aria-labelledby="basic" />
    </template>


  </Toolbar>
  <Panel :selectedGraph="this.selectedGraph" :selectedScenario="this.selectedScenario" >
  </Panel>

  </div>
</template>

<script>
import { ref } from "vue";

import Toolbar from 'primevue/toolbar';
import SelectButton from 'primevue/selectbutton';
import Panel from './Panel.vue'
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import CascadeSelect from 'primevue/cascadeselect';


export default {
    name: 'menuComponent',

    components: {
        Toolbar,
        SelectButton,
        Panel,
        CascadeSelect,
        MultiSelect,
        Button
    },

    data() {
        return {
                    
          value : ref('Gâvres'),
          options : ref(['Gâvres', 'Arcachon']),
          checked : ref(false),
           selectedScenario: null,
            cities: [
                { name: 'Scénario 1', code: 1 },
                { name: 'Scénario 2', code: 2 },
                { name: 'Scénario 3', code: 3 },
                { name: 'Scénario 4', code: 4 },
                { name: 'Scénario 5', code: 5 }
            ],
            selectedGraph: null,
            countries: [
                {
                    name: '2D',
                    code: '2D',
                    states: [
                        { name: 'Graph2D 1'},
                        { name: 'Graph2D 2'},
                        { name: 'Graph2D 3'}]
                },
                {
                    name: '3D',
                    code: '3D',
                    states: [
                        {name: 'Graph3D 1'},
                        {name: 'Graph3D 2'}]
                },
            ]
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


.p-multiselect {
    margin-right: 10px;
    margin-left: 10px;

}

</style>
