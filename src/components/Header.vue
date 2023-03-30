
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

                <!-- test ilona  -->
                <!-- <button @click="getPosts">Show Posts</button>
                    <p id="resulatScript"></p>                     -->

                    <div>
                    <button @click="getDossier">Affichage des scenarios</button>
                    <!-- <p id="dossier"></p> -->
                    <!-- <p>Données: {{ this.cities }}</p> -->
                </div>
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
                      
        // selectedCities: null,

           selectedScenario: null,
            // cities: [
            //     { name: 'Scénario 1', code: 1 },
            //     { name: 'Scénario 2', code: 2 },
            //     { name: 'Scénario 3', code: 3 },
            //     { name: 'Scénario 4', code: 4 },
            //     { name: 'Scénario 5', code: 5 }
            // ],
            cities: null,
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
    },
      methods: {
        toggle(event) {
            this.$refs.op.toggle(event);

        },
        print(){
            return this.selectedCities;
        },
        getPosts() {
            fetch('http://127.0.0.1:5000/test')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var resulatScript = document.getElementById("resulatScript");
                resulatScript.innerText += data["message"] ;
                });
        },

        getDossier() {
            fetch('http://127.0.0.1:5000/arboresance')
            .then(response => response.json())
            .then(data => {
                var L = [];

                for (const property in data){
                    console.log(`${data[property]}`);
                    var dict = {
                        name: `${data[property]}`,
                        code: `${data[property]}`
                    };
                    L.push(dict);
                }

                this.cities = L;
            });
        }
    }, 

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
