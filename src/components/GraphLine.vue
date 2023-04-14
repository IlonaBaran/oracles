<template>
    <apexchart :options="this.chartOptions" :series="this.series" />
    <apexchart :options="this.chartOptionsSurcote" :series="this.seriesSurcote" />
    <apexchart :options="this.chartOptionsVagues" :series="this.seriesVagues" />
    <apexchart :options="this.chartOptionsVent" :series="this.seriesVent" />
</template>





<script>
/* eslint-disable */
import { ApexChart } from 'vue3-apexcharts';
import VueHighcharts from 'vue3-highcharts';
import * as d3 from 'd3';


import { ref } from "vue";
import { reactive } from "vue";

export default {
    name: 'panelComponent',

    components: {

        VueHighcharts,
    },

    props: {
        affichageLigne: {
            type: Object,
            required: true
        },
        selectedScenario: {
            type: Object,
            required: true
        },

    },


    data() {
        return {

            // LINE CHART - APEXCHARTS
            chartOptions: {
                chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { nabled: false } },
                dataLabels: { enabled: false, grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, }, xaxis: { tooltip: { enabled: false }, categories: [], } },
            },
            series: [],

            chartOptionsSurcote: {
                chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { nabled: false } },
                dataLabels: { enabled: false, grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, }, xaxis: { tooltip: { enabled: false }, categories: [], } },
            },
            seriesSurcote: [],

            chartOptionsVagues: {
                chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { nabled: false } },
                dataLabels: { enabled: false, grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, }, xaxis: { tooltip: { enabled: false }, categories: [], } },
            },
            seriesVagues: [],

            chartOptionsVent: {
                chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { nabled: false } },
                dataLabels: { enabled: false, grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, }, xaxis: { tooltip: { enabled: false }, categories: [], } },
            },
            seriesVent: [],


        }
    },


    methods: {

        test() {
            console.log("ok passe graphLine")
        },
        lineChart(type, abscisses, ordonnees) {

            if (type == "Maree(m)") {
                this.series = ordonnees;
                this.chartOptions = reactive({
                    chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { enabled: false } },
                    dataLabels: { enabled: false },
                    stroke: { curve: 'straight' },
                    title: { text: 'Maree(m) en fonction des heures de la journée', align: 'left' },
                    grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, },
                    xaxis: { tooltip: { enabled: false }, overwriteCategories: abscisses, }
                });
            }
            if (type == "Surcote(m)") {
                this.seriesSurcote = ordonnees;
                this.chartOptionsSurcote = reactive({
                    chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { enabled: false } },
                    dataLabels: { enabled: false },
                    stroke: { curve: 'straight' },
                    title: { text: 'Surcote(m) en fonction des heures de la journée', align: 'left' },
                    grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, },
                    xaxis: { tooltip: { enabled: false }, overwriteCategories: abscisses, }
                });
            }

            if (type == "Hs(vagues)(m)") {
                this.seriesVagues = ordonnees;
                this.chartOptionsVagues = reactive({
                    chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { enabled: false } },
                    dataLabels: { enabled: false },
                    stroke: { curve: 'straight' },
                    title: { text: 'Hs(vagues)(m) en fonction des heures de la journée', align: 'left' },
                    grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, },
                    xaxis: { tooltip: { enabled: false }, overwriteCategories: abscisses, }
                });
            }

            if (type == "U(vent)(m)") {
                this.seriesVent = ordonnees;
                this.chartOptionsVent = reactive({
                    chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { enabled: false } },
                    dataLabels: { enabled: false },
                    stroke: { curve: 'straight' },
                    title: { text: 'U(vent)(m) en fonction des heures de la journée', align: 'left' },
                    grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, },
                    xaxis: { tooltip: { enabled: false }, overwriteCategories: abscisses, }
                });
            }

        },
        lineChartAffichage(type) {

            let abscisses = [];
            let ordonnees = [];
            for (const element of this.selectedScenario) {
                var file = 'http://localhost:8080/jsonData/' + element["name"] + '.json';
                fetch(file)
                    .then(response => response.json())
                    .then(data => {
                        // Boucle pour avoir toutes les abscisses possibles
                        for (const property in data) {
                            if (abscisses.indexOf(`${data[property]["heure"]}`) == -1) {
                                abscisses.push(`${data[property]["heure"]}`);
                            }
                        };
                        abscisses.sort()

                        // 1 dictionnaire = 1 scenario, il se remet à 0 à chaque nouveau scénario
                        var dict = {};
                        dict["name"] = `${element["name"]}`;
                        // L : tableau pour mettre les valeurs du scénario dedans. On ajoutera L au tableau à la fin de la boucle for
                        var L = new Array(abscisses.length).fill(0);
                        for (const property in data) {
                            if (abscisses.indexOf(`${data[property]["heure"]}`) != -1) {
                                L[abscisses.indexOf(`${data[property]["heure"]}`)] = `${data[property][type]}`;
                            }
                        };
                        dict["data"] = L;
                        ordonnees.push(dict);
                    })

                this.lineChart(type, abscisses, ordonnees);
            }
        },
    },
    mounted() {
        this.lineChartAffichage('Surcote(m)');
        this.lineChartAffichage('Maree(m)');
        this.lineChartAffichage('Hs(vagues)(m)');
        this.lineChartAffichage('U(vent)(m)');
    }

}


</script>


<style>
.buttonPanel {
    z-index: 2;
    position: absolute;
    top: 1%;
    left: 1%;
    gap: 20px;
}

.card {
    z-index: 3;
    position: absolute;
    width: 50%;
}

#app .p-card .p-card-title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    top: 5%;
}

#app .p-card-body {
    height: calc(87vh);
}

p {
    margin: 0px;
}

.p-scrollpanel.custombar1 .p-scrollpanel-wrapper {
    border-right: 10px solid var(--surface-ground);
}

.p-scrollpanel.custombar1 .p-scrollpanel-bar {
    background-color: var(--primary-300);
    opacity: 1;
    transition: background-color 0.3s;
}

.p-scrollpanel.custombar1 .p-scrollpanel-bar:hover {
    background-color: var(--primary-400);
}
</style>
