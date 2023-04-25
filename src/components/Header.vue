
<template>
    <div class="toolBar">
        <Toolbar>
            <!-- Eléments présents sur la gauche de la barre -->
            <template #start>
                <!-- Affichage du Panel présent dans Panel.vue -->
                <Button v-styleclass="{ selector: '.card', toggleClass: 'p-hidden' }" type="button" icon="pi pi-chart-bar"
                    label="" />

                <!-- Outil de sélection des scénarios -->
                <MultiSelect v-model="selectedScenario" :options="scenario" filter optionLabel="name"
                    placeholder="Sélection Scénarios" :maxSelectedLabels="3"
                    class="w-full md:w-20rem selectScenario margin-right:15px" :selectedScenario="this.selectedScenario"
                    @change="emitSelectedScenarioChanged" />

                <!-- Outil de sélection des graphiques -->
                <CascadeSelect v-model="selectedGraph" :options="countries" optionLabel="name" optionGroupLabel="name"
                    :optionGroupChildren="['states']" style="min-width: 14rem " placeholder="Sélection Graphique"
                    class="selectGraph" />

                <Button v-styleclass="{ selector: '.card', toggleClass: 'p-hidden' }" @click="this.validation();"
                    icon="pi pi-check" aria-label="Valider" style="margin-left: 10px;" class="validation" :class="valide" />

                <Button v-styleclass=" { selector: '.card', toggleClass: 'p-hidden' } " @click="
                    this.reinitialisation()
                " icon="pi pi-refresh" aria-label="Changer scénarios" style="margin-left: 10px;" :class=" disabled " />

            </template>

            <!-- Eléments présents sur la droite de la barre -->
            <template #end>
                <!-- Sélection de la zone d'étude (Gâvre/Arcachon) -->
                <SelectButton v-model=" value " :options=" options " aria-labelledby="basic" optionDisabled="constant"
                    optionLabel="name" />
            </template>
        </Toolbar>

        <!-- Ajout du composant présent dans Panel.vue, passage des valeurs des arguments selectedScenario et selectedGraph -->
        <Panel ref="panelGraph" :selectedScenario=" this.selectedScenario " :selectedGraph=" this.selectedGraph "></Panel>


    </div>
</template>


<script>
/* eslint-disable */
// Import d'une fonction
import { ref } from "vue";

// Import du composant
import Panel from './Panel.vue';
import App from '../App.vue';

// Import des éléments des librairies
import Toolbar from 'primevue/toolbar';
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import CascadeSelect from 'primevue/cascadeselect';

/**
 * TODO
 *
 * @component menuComponent
 * 
 * @author Equipe du projet Oracle - ENSG, TSI 
 * @version 1.0
 * @since 25.04.2023
 * 
 * Composants enfants : 
 * -- Librairie PrimeVue --
 * Toolbar
 * SelectButton
 * Panel
 * CascadeSelect
 * MultiSelect
 * Button
 * 
 * @requires ../../node_modules/primevue/toolbar/Toolbar.vue
 * @requires ../../node_modules/primevue/selectbutton/SelectButton.vue
 * @requires ../../node_modules/primevue/panel/Panel.vue
 * @requires ../../node_modules/primevue/cascadeselect/CascadeSelect.vue
 * @requires ../../node_modules/primevue/multiselect/MultiSelect.vue
 * @requires ../../node_modules/primevue/button/Button.vue
 */
export default {
    name: 'menuComponent',
    components: {
        /**
         * TODO
         *
         * @public This is a public method
         */
        Toolbar,
        SelectButton,
        Panel,
        CascadeSelect,
        MultiSelect,
        Button
    },
    data() {
        return {
            value: ref({ name: 'Gâvres' }),
            options: ref([{ name: 'Gâvres' }, { name: 'Arcachon', constant: true }]),
            checked: ref(false),
            disabled: " p-disabled",
            valide: "",

            scenario: null,
            selectedScenario: [],
            selectedGraph: [],
            refresh: false,
            countries: [
                {
                    name: '2D',
                    code: '2D',
                    states: [
                        { name: 'Ligne' },
                        { name: 'Rose des vents' },
                        { name: 'Histogramme empilé' },
                        { name: 'Chaleur' }]
                },
                {
                    name: '3D',
                    code: '3D',
                    states: [
                        { name: 'Ligne 3D' }]
                },
            ]
        }
    },

    methods: {
        /**
         * TODO
         *
         * @public This is a public method
         */
        ret() {
            return this.selectedScenario
        },
        /**
         * TODO
         *
         * @public This is a public method
         */
        validation() {
            this.disabled = "";
            this.valide = " p-disabled";
            this.$refs.panelGraph.afficheGraph();
        },
        /**
         * TODO
         *
         * @public This is a public method
         */
        reinitialisation() {
            this.disabled = " p-disabled";
            this.valide = "";
            this.$refs.panelGraph.reiAfficheGraph();
        },
        /**
         * TODO
         *
         * @public This is a public method
         */
        toggle(event) {
            this.$refs.op.toggle(event);
        },
        /**
         * Récupérer le nom des dossiers et les transmettre à la variable scenario
         *
         * @public This is a public method
         */
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
        /**
         * TODO
         *
         * @public This is a public method
         */
        appelMethodeDansPanel() {
            this.$refs.panelRef.nomDeLaMethodeDansPanel();
        },
        /**
         * TODO
         *
         * @public This is a public method
         */
        emitSelectedScenarioChanged() {
            this.$emit('selectedScenarioChanged', this.selectedScenario);
        }
    },
    mounted() {
        this.getDossier()
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
