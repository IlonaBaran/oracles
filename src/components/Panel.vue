<template>
    <!-- Panel de gauche -->
    <div class="card p-hidden">

        <!-- Texte présent dedans -->
        <Card>
            <template #title>
                Options
            </template>

            <template #content>
                <ScrollPanel style="width: 100%; height: 75vh " class="custombar1">

                    <div v-if="selectedGraph.name == 'Ligne'">
                        <div v-if="this.affichageLigne == true">
                            <apexchart :options="this.chartOptions" :series="this.series" />
                            <apexchart :options="this.chartOptionsSurcote" :series="this.seriesSurcote" />
                            <apexchart :options="this.chartOptionsVagues" :series="this.seriesVagues" />
                            <apexchart :options="this.chartOptionsVent" :series="this.seriesVent" />
                        </div>
                    </div>

                    <div v-else-if="selectedGraph.name == 'Rose des vents'">
                        <button @click="roseVentAffichage">Affichage d'un diagramme rose des vents</button>
                        <vue-highcharts type="chart" :options="this.chartOptions2" :redrawOnUpdate="true"
                            :oneToOneUpdate="false" :animateOnUpdate="true" />
                    </div>

                    <div v-else-if="selectedGraph.name == 'Histogramme empilé'">
                        <div v-if="this.affichageHistogramme == true">
                            <apexchart :options="this.chartOptions5Surcote" :series="this.series5Surcote" />
                            <apexchart :options="this.chartOptions5Maree" :series="this.series5Maree" />
                            <apexchart :options="this.chartOptions5Vagues" :series="this.series5Vagues" />
                            <apexchart :options="this.chartOptions5Vent" :series="this.series5Vent" />

                        </div>
                    </div>

                    <div v-else-if="selectedGraph.name == 'Chaleur'">
                        <div v-if="this.affichageHeat == true">
                            <apexchart :options="this.chartOptions3" :series="this.series3" />
                        </div>
                    </div>

                    <!-- <div v-else-if="selectedGraph.name == 'Graph3D 1'">
                        <button @click="TD1Affichage">jvrbrgunrjenguibgzy</button>
                        <vue-highcharts :options="this.chartOptions4"></vue-highcharts>

                    </div> -->
                    <div v-else>
                        <p>Veuillez choisir un type de graphique</p>
                    </div>


                </ScrollPanel>
            </template>
        </Card>
    </div>
</template>





<script>
/* eslint-disable */


import * as d3 from 'd3';
import VueHighcharts from 'vue3-highcharts';
import HighCharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(HighCharts);

import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';

import { ref } from "vue";
import { reactive } from "vue";

export default {
    name: 'panelComponent',

    components: {
        Card,
        ScrollPanel,
        VueHighcharts

    },

    props: {
        selectedScenario: {
            type: Object,
            required: true
        },
        selectedGraph: {
            type: Object,
            required: true
        },
    },


    data() {
        return {
            checked: ref(false),
            checkedPanel: ref(false),
            affichageLigne: false,
            affichageHeat: false,
            affichageRose: false,
            affichageHistogramme: false,

            // LINE CHART - APEXCHARTS //
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

            // ROSE WIND - HIGHCHARTJS //
            chartOptions2: ({
                chart: {
                    polar: true,
                    type: 'column'
                },
                title: {
                    text: 'En attente de données',
                },
                xAxis: {
                    categories: [],
                },

                yAxis: {
                    title: { text: 'En attente de données', },
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        shadow: false,
                        // groupPadding: 0,
                        pointPlacement: 'on'
                    }
                },
                series: [{}, {}, {}, {}],
            }),


            // DIAGRAMME EMPILE - APEXCHARTS
            chartOptions5Surcote: ({
                chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                responsive: [{
                    breakpoint: 480,
                    options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } }
                }],
                xaxis: { categories: [] },
                fill: { opacity: 1 },
                legend: { position: 'right', offsetX: 0, offsetY: 50 },
            }),


            series5Surcote: [{ name: 'En attente de données', data: [] }
            ],

            chartOptions5Maree: ({
                chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                responsive: [{
                    breakpoint: 480,
                    options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } }
                }],
                xaxis: { categories: [] },
                fill: { opacity: 1 },
                legend: { position: 'right', offsetX: 0, offsetY: 50 },
            }),

            series5Maree: [{ name: 'En attente de données', data: [] }
            ],

            chartOptions5Vagues: ({
                chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                responsive: [{
                    breakpoint: 480,
                    options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } }
                }],
                xaxis: { categories: [] },
                fill: { opacity: 1 },
                legend: { position: 'right', offsetX: 0, offsetY: 50 },
            }),

            series5Vagues: [{ name: 'En attente de données', data: [] }
            ],

            chartOptions5Vent: ({
                chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                responsive: [{
                    breakpoint: 480,
                    options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } }
                }],
                xaxis: { categories: [] },
                fill: { opacity: 1 },
                legend: { position: 'right', offsetX: 0, offsetY: 50 },
            }),

            series5Vent: [{ name: 'En attente de données', data: [] }
            ],

            // HEAT MAP - APEXCHARTS
            chartOptions3: ref(null),
            series3: ref(null),


            // HEAT MAP MAIS EN 3D - HIGHTCHARTS
            chartOptions4: ({
                chart: {
                    type: 'line',
                },
                title: {
                    text: 'En attente de données',
                },
                xAxis: {
                    categories: [],
                },
                yAxis: {
                    title: {
                        text: 'En attente de données',
                    },
                },
                series: [{
                    name: 'En attente de données',
                    data: [],
                }],
            }),
        }
    },


    methods: {
        afficheGraph() {
            this.lineChartAffichage('Surcote(m)')
            this.lineChartAffichage('Maree(m)');
            this.lineChartAffichage('Hs(vagues)(m)');
            this.lineChartAffichage('U(vent)(m)');
            this.heatMapAffichage();
            this.histogrammeAffichage('Surcote(m)');
            this.histogrammeAffichage('Maree(m)');
            this.histogrammeAffichage('Hs(vagues)(m)');
            this.histogrammeAffichage('U(vent)(m)');
        },

        reiAfficheGraph() {
            this.affichageLigne = false;
            this.affichageHeat = false;
            this.affichageHistogramme = false;
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
            this.affichageLigne = true;

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

        roseVentAffichage() {

            this.chartOptions2 = ({
                chart: {
                    polar: true,
                    type: 'column'
                },
                title: {
                    text: 'Number of project stars',
                },
                xAxis: {

                    tickmarkPlacement: 'on',
                    categories: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
                },
                yAxis: {
                    min: 0,
                    endOnTick: false,
                    showLastLabel: true,
                    reversedStacks: false,

                    title: {
                        text: 'Number of stars',
                    },
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        shadow: false,
                        // groupPadding: 0,
                        pointPlacement: 'on'
                    }
                },

                series: [
                    {
                        type: undefined,
                        name: '<1 m/s',
                        data: [1, 2, 3, 2, 1, 6, 8, 4, 0, 2, 7, 5, 2, 1, 4, 1]
                    },
                    {
                        type: undefined,
                        name: '1-3 m/s',
                        data: [1, 2, 3, 0, 1, 0, 1, 0, 0, 2, 0, 1, 2, 4, 3, 1]
                    },
                    {
                        type: undefined,
                        name: '3-5 m/s',
                        data: [1, 2, 3, 0, 1, 0, 0, 0, 1, 2, 1, 1, 2, 1, 1, 1]
                    },
                    {
                        type: undefined,
                        name: '>5 m/s',
                        data: [1, 2, 3, 0, 1, 1, 0, 0, 0, 2, 3, 1, 2, 1, 1, 1]
                    }
                ],
            });
        },

        histogramm() {
            this.chartOptions5 = ({
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    stackType: '100%'
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                xaxis: {
                    categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2',
                        '2012 Q3', '2012 Q4'
                    ],
                },
                fill: {
                    opacity: 1
                },
                legend: {
                    position: 'right',
                    offsetX: 0,
                    offsetY: 50
                },
            });



        },

        histogramm(type, abscisses, ordonnees) {
            if (type == "Maree(m)") {
                this.series5Maree = ordonnees;
                this.chartOptions5Maree = reactive({
                    chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                    title: { text: 'Réparition des hauteurs de marée par scénario', align: 'left' },
                    responsive: [{
                        breakpoint: 480,
                        options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } }
                    }],
                    xaxis: { categories: abscisses },
                    fill: { opacity: 1 },
                    legend: { position: 'right', offsetX: 0, offsetY: 50 },
                });
            }
            else if (type == "Surcote(m)") {
                this.series5Surcote = ordonnees;
                this.chartOptions5Surcote = reactive({
                    chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                    title: { text: 'Réparition des hauteurs de surcote par scénario', align: 'left' },
                    responsive: [{
                        breakpoint: 480,
                        options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } }
                    }],
                    xaxis: { categories: abscisses },
                    fill: { opacity: 1 },
                    legend: { position: 'right', offsetX: 0, offsetY: 50 },
                });
            }
            else if (type == "Hs(vagues)(m)") {
                this.series5Vagues = ordonnees;
                this.chartOptions5Vagues = reactive({
                    chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                    title: { text: 'Réparition des hauteurs des vagues par scénario', align: 'left' },
                    responsive: [{
                        breakpoint: 480,
                        options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } }
                    }],
                    xaxis: { categories: abscisses },
                    fill: { opacity: 1 },
                    legend: { position: 'right', offsetX: 0, offsetY: 50 },
                });
            }
            else if (type == "U(vent)(m)") {
                this.series5Vent = ordonnees;
                this.chartOptions5Vent = reactive({
                    chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                    title: { text: 'Réparition des vitesses de vent par scénario', align: 'left' },
                    responsive: [{
                        breakpoint: 480,
                        options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } }
                    }],
                    xaxis: { categories: abscisses },
                    fill: { opacity: 1 },
                    legend: { position: 'right', offsetX: 0, offsetY: 50 },
                });
            }
            this.affichageHistogramme = true;
        },




        histogrammeAffichage(type) {
            // valeurs a afficher --> ordonnées
            var listDataPlot = [];
            // valeurs à afficher --> abscisses
            var abscisses = [];
            // Decoupage des ordonnées
            if (type == "Maree(m)") {
                var L = [0, 1, 2];
            }
            else if (type == "Surcote(m)") {
                var L = [0, 0.50, 1];
            }
            else if (type == "Hs(vagues)(m)") {
                var L = [2, 4, 6];
            }
            else if (type == "U(vent)(m)") {
                var L = [5, 10, 15];
            }
            var s1 = new Array();
            var s2 = new Array();
            var s3 = new Array();
            var s4 = new Array();
            // Compteur pour mettre les valeurs dans les listes de decoupage
            var elem = 0;

            for (const element of this.selectedScenario) {
                var v1 = 0;
                var v2 = 0;
                var v3 = 0;
                var v4 = 0;
                fetch('http://localhost:8080/jsonData/' + `${element["name"]}` + '.json')
                    .then(response => response.json())
                    .then(data => {
                        abscisses.push(`${element["name"]}`);



                        for (const property in data) {
                            if (`${data[property][type]}` < L[0]) {
                                v1 += 1;
                            }
                            else if (`${data[property][type]}` > L[0] && `${data[property][type]}` < L[1]) {
                                v2 += 1;
                            }
                            else if (`${data[property][type]}` > L[1] && `${data[property][type]}` < L[2]) {
                                v3 += 1;
                            }
                            if (`${data[property][type]}` > L[2]) {
                                v4 += 1;
                            }
                        };
                        s1.push(v1);
                        s2.push(v2);
                        s3.push(v3);
                        s4.push(v4);
                    })
                elem += 1;
            }

            console.log(listDataPlot);
            listDataPlot.push({ name: "inférieur à " + L[0], data: s1 });
            listDataPlot.push({ name: "entre " + L[0] + " et " + L[1], data: s2 });
            listDataPlot.push({ name: "entre " + L[1] + " et " + L[2], data: s3 });
            listDataPlot.push({ name: "supérieur à " + L[2], data: s4 });
            this.histogramm(type, abscisses, listDataPlot);
            this.affichageHistogramme = true;
        },

        sendData(data) {
            fetch('127.0.0.1:5000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Données envoyées avec succès !');
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi des données :', error);
                });
        },


        heatMapAffichage() {
            // valeurs a afficher --> ordonnées
            var listDataPlot = [];
            // données temporelles --> abscisses
            var abscisses = new Array();

            for (const element of this.selectedScenario) {
                fetch('http://localhost:8080/jsonData/' + `${element["name"]}` + '.json')
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
                                L[abscisses.indexOf(`${data[property]["heure"]}`)] = `${data[property]["Hs(vagues)(m)"]}`;
                            }
                        };
                        dict["data"] = L;
                        listDataPlot.push(dict);

                    })
            }

            this.heatMap(listDataPlot, abscisses);
            this.affichageHeat = true;


            //  POUR LE DIAGRAMME 3 
            // fetch('http://localhost:5000/api/data', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(dict)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('Données envoyées avec succès !');        
            //     fetch('http://localhost:5000/api/data')
            //     .then(response => response.json())
            //     .then(data => {
            //     console.log(data);
            //     })
            // })
            // .catch(error => {
            //     console.error('Erreur lors de l\'envoi des données :', error);
            // });
        },



        heatMap(donnees, abscisses) {
            this.chartOptions3 = {
                chart: {
                    type: 'heatmap',
                    // height: 550,
                },
                dataLabels: {
                    enabled: false
                },
                colors: ['#008FFB'],
                title: {
                    text: 'Heatmap Chart',
                    align: 'left',
                },
                xaxis: {
                    tooltip: {
                        enabled: false
                    },
                    type: 'category',
                    categories: abscisses,
                    overwriteCategories: abscisses,
                },
                yaxis: {
                    categories: ['Morning', 'Afternoon', 'Evening'], // ENCORE A MODIFIER CETTE PARTIE ??????
                },

            },
                this.series3 = donnees;
        },


        // ressource : https://www.highcharts.com/docs/chart-concepts/3d-charts
        // https://www.highcharts.com/demo/3d-area-multiple/brand-light
        TD1Affichage() {
            this.chartOptions4 = ({
                chart: {
                    type: 'area',
                    options3d: {
                        enabled: true,
                        alpha: 20,
                        beta: 15,
                        depth: 30,
                        viewDistance: 25
                    }
                },
                title: {
                    text: 'Number of project stars',
                },

                accessibility: {
                    description: 'The chart is showing the shapes of three mountain ranges as three area line series laid out in 3D behind each other.',
                    keyboardNavigation: {
                        seriesNavigation: {
                            mode: 'serialize'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Height Above Sea Level',
                        x: -40
                    },
                    labels: {
                        format: '{value:,.0f} MAMSL'
                    },
                    gridLineDashStyle: 'Dash'
                },
                xAxis: [{
                    visible: false
                }, {
                    visible: false
                }, {
                    visible: false
                }],
                plotOptions: {
                    area: {
                        depth: 100,
                        marker: {
                            enabled: false
                        },
                        states: {
                            inactive: {
                                enabled: false
                            }
                        }
                    }
                },
                tooltip: {
                    valueSuffix: ' MAMSL'
                },
                series: [
                    {
                        xAxis: 0,
                        name: 'Tatra Mountains visible from Rusinowa polana',
                        lineColor: 'rgb(180,90,50)',
                        color: 'rgb(200,110,50)',
                        fillColor: 'rgb(200,110,50)',
                        data: [
                            ['Kufstein', 2049],
                            ['Hohe Wildstelle', 2746],
                            ['Kleiner Miesberg', 2173],
                            ['Großer Miesberg', 2202],
                            ['Hochstein', 2543],
                            ['Lackner Miesberg', 2232],
                            ['Wasenspitze', 2257],
                            ['Sinabell', 2349],
                            ['Feister Scharte', 2198],
                            ['Eselstein', 2556],
                            ['Landfriedstein', 2536],
                            ['Scheichenspitz', 2667],
                            ['Schmiedstock', 2634],
                            ['Gamsfeldspitze', 2611],
                            ['Edelgriess', 2305],
                            ['Koppenkarstein', 2863],
                            ['Niederer Gjaidstein', 2483],
                            ['Hoher Gjaidstein', 2794],
                            ['Hoher Dachstein', 2995],
                            ['Niederer Dachstein', 2934],
                            ['Hohes Kreuz', 2837],
                            ['Hoher Ochsenkogel', 2513]
                        ]
                    },
                    {
                        xAxis: 1,
                        lineColor: 'rgb(120,160,180)',
                        color: 'rgb(140,180,200)',
                        fillColor: 'rgb(140,180,200)',
                        name: 'Dachstein panorama seen from Krippenstein',
                        data: [
                            ['Combin de la Tsessette', 4141],
                            ['Grand Combin de Grafeneire', 4314],
                            ['Combin de Corbassière', 3716],
                            ['Petit Combin', 3672],
                            ['Pointe de Boveire', 3212],
                            ['Grand Aget', 3133],
                            ['Mont Rogneux', 3084],
                            ['Dents du Grand Lé', 2884],
                            ['Monts Telliers', 2951],
                            ['Grand Golliat', 3238],
                            ['Mont Grande Rochère', 3326],
                            ['Mont de la Fouly', 2871],
                            ['Tête de la Payanne', 2452],
                            ['Pointe Allobrogia', 3172],
                            ['Six Blanc', 2334],
                            ['Mont Dolent', 3820],
                            ['Aiguille de Triolet', 3870],
                            ['Le Tour Noir', 3836],
                            ['Aiguille de l\'A Neuve', 3753],
                            ['Aiguille d\'Argentière', 3900],
                            ['Aiguille du Chardonnet', 3824],
                            ['Aiguille du Tour', 3540],
                            ['Aiguille du Pissoir', 3440],
                            ['Le Catogne', 2598],
                            ['Pointe de Prosom', 2762],
                            ['Pointe Ronde', 2700],
                            ['Mont Buet', 3096],
                            ['Le Cheval Blanc', 2831],
                            ['Pointe de la Finive', 2838],
                            ['Pic de Tenneverge', 2985],
                            ['Pointe d\'Aboillon', 2819],
                            ['Tour Sallière', 3220],
                            ['Le Dôme', 3138],
                            ['Haute Cime', 3257],
                            ['Pierre Avoi', 2473],
                            ['Cime de l\'Est', 3178]
                        ]
                    },
                    {
                        xAxis: 2,
                        lineColor: 'rgb(200, 190, 140)',
                        color: 'rgb(200, 190, 140)',
                        fillColor: 'rgb(230, 220, 180)',
                        name: 'Panorama from Col Des Mines',
                        data: [
                            ['Combin de la Tsessette', 4141],
                            ['Grand Combin de Grafeneire', 4314],
                            ['Combin de Corbassière', 3716],
                            ['Petit Combin', 3672],
                            ['Pointe de Boveire', 3212],
                            ['Grand Aget', 3133],
                            ['Mont Rogneux', 3084],
                            ['Dents du Grand Lé', 2884],
                            ['Monts Telliers', 2951],
                            ['Grand Golliat', 3238],
                            ['Mont Grande Rochère', 3326],
                            ['Mont de la Fouly', 2871],
                            ['Tête de la Payanne', 2452],
                            ['Pointe Allobrogia', 3172],
                            ['Six Blanc', 2334],
                            ['Mont Dolent', 3820],
                            ['Aiguille de Triolet', 3870],
                            ['Le Tour Noir', 3836],
                            ['Aiguille de l\'A Neuve', 3753],
                            ['Aiguille d\'Argentière', 3900],
                            ['Aiguille du Chardonnet', 3824],
                            ['Aiguille du Tour', 3540],
                            ['Aiguille du Pissoir', 3440],
                            ['Le Catogne', 2598],
                            ['Pointe de Prosom', 2762],
                            ['Pointe Ronde', 2700],
                            ['Mont Buet', 3096],
                            ['Le Cheval Blanc', 2831],
                            ['Pointe de la Finive', 2838],
                            ['Pic de Tenneverge', 2985],
                            ['Pointe d\'Aboillon', 2819],
                            ['Tour Sallière', 3220],
                            ['Le Dôme', 3138],
                            ['Haute Cime', 3257],
                            ['Pierre Avoi', 2473],
                            ['Cime de l\'Est', 3178]
                        ]
                    }
                ],
            });
        },
    }
};






//         roseVentAffichage() {
//             var L = [];
//            this.roseChart();

// for (const element of this.selectedScenario) {
//     // RECUPERATION DES DONNES AVEC DES FECTH - c
//     var file = 'http://localhost:0/' + element["name"] + '.json';
//     fetch(file)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             for (const property in data) {
//                 var dict = {
//                     angle: parseFloat(`${data[property]["Dir(vent)()"]}`),
//                     speed: parseFloat(`${data[property]["U(vent)(m)"]}`),
//                 };
//                 L.push(dict);
//             }
//             // this.lineChart(L);
//         })
//         // }
//     }
// }

//   const chartOptions2 = reactive({
//     //  type: 'horizontal column',
//     //type: 'simpleLine',
//     legend: {
//         visible: true,
//         position: 'bottom right',
//         // legendEntry_visible: false
//     },
// 	title: { label: { text: 'Cost over time' } },
// 	yAxis: [
//         /* Main axis is defined first. */
//         { formatString: 'c' },
/* Secondary axis will sync with main axis by default. */
// {
// 	id: 'secondY',
// 	orientation: 'opposite',
// 	line: { color: '#e2e2e2' },
// 	defaultTick: {
// 		enabled: false,
// 		gridLine: { visible: false }
// 	}
// }
// ],
// xAxis: {
//     crosshair: { enabled: true },
//     scale: { type: 'time' }
// },
// defaultSeries: {
//     type: 'line',
//     defaultPoint: {
//         marker: { visible: false }
//     },
// lastPoint: {
// 	label: { text: '<b>%seriesName</b>' },
// 	yAxisTick: {
// 		axisId: 'secondY',
// 		label: { text: '%yValue' }
// 	}
// }
// }
//  series: [
// 		{
// 			name: 'Purchases',
// 			points: [
// 				['1/1/2020', 29.9],
// 				['2/1/2020', 97.5],
// 				['3/1/2020', 110.4],
// 				['4/1/2020', 129.2],
// 				['5/1/2020', 144.0],
// 				['6/1/2020', 176.0],
// 				['7/1/2020', 182.0],
// 				['8/1/2020', 186.0],
// 				['9/1/2020', 181.0],
// 				['10/1/2020', 178.0],
// 				['11/1/2020', 184.0],
// 				['12/1/2020', 176.0]
// 			]
// 		},
// 		{
// 			name: 'Taxes',
// 			points: [
// 				['1/1/2020', 86.9],
// 				['2/1/2020', 79.5],
// 				['3/1/2020', 95.4],
// 				['4/1/2020', 97.2],
// 				['5/1/2020', 123.0],
// 				['6/1/2020', 111.0],
// 				['7/1/2020', 122.0],
// 				['8/1/2020', 135.0],
// 				['9/1/2020', 140.0],
// 				['10/1/2020', 139.0],
// 				['11/1/2020', 135.0],
// 				['12/1/2020', 132.0]
// 			]
// 		},
// 		{
// 			name: 'Supplies',
// 			points: [
// 				['1/1/2020', 129.9],
// 				['2/1/2020', 111.5],
// 				['3/1/2020', 66.4],
// 				['4/1/2020', 29.2],
// 				['5/1/2020', 88.0],
// 				['6/1/2020', 102.0],
// 				['7/1/2020', 82.0],
// 				['8/1/2020', 75.0],
// 				['9/1/2020', 162.0],
// 				['10/1/2020', 110.0],
// 				['11/1/2020', 90.0],
// 				['12/1/2020', 85.0]
// 			]
// 		},
// 		{
// 			name: 'Rent',
// 			points: [
// 				['1/1/2020', 56.9],
// 				['2/1/2020', 56.5],
// 				['3/1/2020', 56.4],
// 				['4/1/2020', 56.2],
// 				['5/1/2020', 75.0],
// 				['6/1/2020', 56.0],
// 				['7/1/2020', 56.0],
// 				['8/1/2020', 56.0],
// 				['9/1/2020', 56.0],
// 				['10/1/2020', 67.0],
// 				['11/1/2020', 67.0],
// 				['12/1/2020', 67.0]
// 			]
// 		}
//  ]
// });

//     const chartOptions3 = reactive({
//     debug: true,
//     type: 'column',
//     yAxis: {
//         scale_type: 'stacked',
//         label_text: 'Units Sold'
//     },
//     title_label_text: 'Acme Tool Sales',
//     xAxis: {
//         label_text: 'Quarter',
//         categories: ['Q1', 'Q2', 'Q3', 'Q4']
//     },
//     series: [
//         {
//         name: 'Saw',
//         id: 's1',
//         points: [230, 240, 267, 238]
//         },
//         {
//         name: 'Hammer',
//         points: [325, 367, 382, 371]
//         },
//         {
//         name: 'Grinder',
//         points: [285, 292, 267, 218]
//         },
//         {
//         name: 'Drill',
//         points: [185, 192, 198, 248]
//         }
//     ]
//     });

//   return { chartOptions, chartOptions2, chartOptions3 };

// }


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
