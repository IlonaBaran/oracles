
<template>
    <div class="toolBar">
        <Toolbar>
            <template #start>

                <Button v-styleclass="{ selector: '.card', toggleClass: 'p-hidden' }" type="button" icon="pi pi-bars"
                    label="" />
                <MultiSelect v-model="selectedScenario" :options="scenario" filter optionLabel="name"
                    placeholder="Sélection Scénarios" :maxSelectedLabels="3"
                    class="w-full md:w-20rem selectScenario margin-right:15px" :selectedScenario="this.selectedScenario" />
                <CascadeSelect v-model="selectedGraph" :options="countries" optionLabel="name" optionGroupLabel="name"
                    :optionGroupChildren="['states']" style="min-width: 14rem " placeholder="Sélection Graphique"
                    class="selectGraph" />

                <!-- Pour le moment, j'ai besoin de cliquer sur le bouton pour afficher tous les scenarios dans le multiselect -->
                <button @click="getDossier">Affichage des scenarios</button>

                <!-- Il sert a transmettre les paramètres de l'utilisateur a la vue 'Panel': les scenarios choisis et le graph choisis -->
                <button @click="emitData">Transmettre des données </button>
                <!-- <button @click="affichageAllGraph">Transmettre des données </button> -->

            </template>

            <template #end>
                <SelectButton v-model="value" :options="options" aria-labelledby="basic" />
            </template>

        </Toolbar>

        <Panel :selectedScenario="this.selectedScenario" :selectedGraph="this.selectedGraph"></Panel>

    </div>
</template>


<script>
import { ref } from "vue";

import Panel from './Panel.vue'

import Toolbar from 'primevue/toolbar';
import SelectButton from 'primevue/selectbutton';
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
            value: ref('Gâvres'),
            options: ref(['Gâvres', 'Arcachon']),
            checked: ref(false),

            scenario: null,
            selectedScenario: [],
            selectedGraph: [],

            countries: [
                {
                    name: '2D',
                    code: '2D',
                    states: [
                        { name: 'Graph2D 1' },
                        { name: 'Graph2D 2' },
                        { name: 'Graph2D 3' }]
                },
                {
                    name: '3D',
                    code: '3D',
                    states: [
                        { name: 'Graph3D 1' },
                        { name: 'Graph3D 2' }]
                },
            ]
        }
    },

    // provide: {
    //     affichageAllGraph: () => this.$refs.panel.affichageAllGraph(),
    // },

    methods: {
        toggle(event) {
            this.$refs.op.toggle(event);
        },

        //  Récupérer le nom des dossiers et les transmettre à la variable scenario
        getDossier() {
            fetch('http://127.0.0.1:5000/arboresance')
                .then(response => response.json())
                .then(data => {
                    var L = [];

                    for (const property in data) {
                        var dict = {
                            name: `${data[property]}`,
                            code: `${data[property]}`
                        };
                        L.push(dict);
                    }

                    this.scenario = L;
                });
        },

        appelMethodeDansPanel() {
            this.$refs.panelRef.nomDeLaMethodeDansPanel();
        }
    },
    mounted() {
        this.getDossier();
    }

}
</script>


<style>
.toolBar {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 5%;
    top: 0%;
}

#app .p-toolbar {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 0.5rem;
    border-radius: 6px;
    gap: 0.5rem;
}

.p-toolbar-group-center {
    padding: 0px;
}

.p-component {
    padding: 0px;
}


.p-multiselect {
    margin-right: 10px;
    margin-left: 10px;

}
</style>
