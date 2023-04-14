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

                        <!-- <button @click="lineChartAffichage('Maree(m)')">Elevation - cycle des marées</button> -->
                        <!-- <button @click="lineChartAffichage('Surcote(m)')">Elevation supplémentaire du niveau de l'eau
                            (prise
                            en compte des conditions météorologiques et atmosphériques)</button> -->
                        <!-- <button @click="lineChartAffichage('Hs(vagues)(m)')">Hauteur significative des vagues</button> -->
                        <!-- <button @click="lineChartAffichage('U(vent)(m)')">Vitesse du vent</button> -->

                        <div v-if="this.affichageLigne == true">

                            <apexchart :options="this.chartOptions" :series="this.series" />
                            <apexchart :options="this.chartOptionsSurcote" :series="this.seriesSurcote" />
                            <apexchart :options="this.chartOptionsVagues" :series="this.seriesVagues" />
                            <apexchart :options="this.chartOptionsVent" :series="this.seriesVent" />

                        </div>

                    </div>

                    <div v-if="selectedGraph.name == 'Rose des vents'">
                        <button @click="roseVentAffichage">Affichage d'un diagramme rose des vents</button>
                        <!-- <apexchart  :options="this.chartOptions2" :series="this.series2"/>     -->
                        <vue-highcharts :options="this.chartOptions2"></vue-highcharts>
                    </div>

                    <div v-if="selectedGraph.name == 'Chaleur'">

                        <!-- <button @click="heatMapAffichage">Affichage d'un diagramme de chaleur</button> -->

                        <div v-if="this.affichageHeat == true">

                            <apexchart :options="this.chartOptions3" :series="this.series3" />
                        </div>
                    </div>

                    <div v-if="selectedGraph.name == 'Graph3D 1'">
                        <button @click="TD1Affichage">jvrbrgunrjenguibgzy</button>
                        <vue-highcharts :options="this.chartOptions4"></vue-highcharts>
                    </div>


                </ScrollPanel>
            </template>
        </Card>
    </div>
</template>





<script>
/* eslint-disable */
import { ApexChart } from 'vue3-apexcharts';
import VueHighcharts from 'vue3-highcharts';
import * as d3 from 'd3';

import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';

import { ref } from "vue";
import { reactive } from "vue";

export default {
    name: 'panelComponent',

    components: {
        Card,
        ScrollPanel,
        VueHighcharts,
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

            // ROSE WIND - HIGHCHARTJS
            chartOptions2: ({
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
            // series2: ref(null),

            // ROSE WIND - D3
            data: [
                { category: 'A', values: [10, 20, 30] },
                { category: 'B', values: [40, 50, 60] },
                { category: 'C', values: [70, 80, 90] }
            ],
            width: 500,
            height: 500,

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
            // series4: ref(null),
        }
    },


    methods: {
        afficheGraph() {

            this.lineChartAffichage('Surcote(m)')
            this.lineChartAffichage('Maree(m)');
            this.lineChartAffichage('Hs(vagues)(m)');
            this.lineChartAffichage('U(vent)(m)');

            this.heatMapAffichage();

        },
        reiAfficheGraph() {
            this.affichageLigne = false;
            this.affichageHeat = false;

            //this.lineChartAffichage(type);
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
                        // for (const property in data) {
                        //     // var dict = {
                        //     //     x: `${data[property]["heure"]}`,
                        //     //     y: parseFloat(`${data[property]["Maree(m)"]}`),
                        //     // };
                        //     abscisses.push(data[property]["heure"]);
                        //     ordonnees.push(data[property][type]);
                        // }
                        // Boucle pour avoir toutes les abscisses possibles
                        for (const property in data) {
                            // console.log(abscisses.indexOf(`${data[property]["heure"]}`));
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

        roseChartHIGHCHARTS() {
            // this.chartOptions2 = reactive({
            //     chart: {
            //         polar: true,
            //         type: "column",
            //     },
            //     title: {
            //         text: "Wind Rose",
            //     },
            //     xAxis: {
            //         categories: [
            //             "N",
            //             "NNE",
            //             "NE",
            //             "ENE",
            //             "E",
            //             "ESE",
            //             "SE",
            //             "SSE",
            //             "S",
            //             "SSW",
            //             "SW",
            //             "WSW",
            //             "W",
            //             "WNW",
            //             "NW",
            //             "NNW",
            //         ],
            //         tickmarkPlacement: "on",
            //         lineWidth: 0,
            //     },
            //     yAxis: {
            //         min: 0,
            //         endOnTick: false,
            //         showLastLabel: true,
            //         title: {
            //             text: "Frequency (%)",
            //             align: "high",
            //         },
            //     },
            //     tooltip: {
            //         shared: true,
            //         pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}%</b><br/>',
            //     },
            //     legend: {
            //         align: "right",
            //         verticalAlign: "middle",
            //         layout: "vertical",
            //     },
            //     plotOptions: {
            //         column: {
            //             pointPadding: 0,
            //             borderWidth: 0,
            //             groupPadding: 0,
            //             shadow: false,
            //         },
            //     },
            //     series: [
            //         {
            //             name: "North",
            //             data: [5, 3, 4, 7, 2, 3, 5, 7, 8, 6, 4, 2, 3, 5, 4, 3],
            //             pointPlacement: "between",
            //         },
            //         {
            //             name: "North-East",
            //             data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10, 8],
            //             pointPlacement: "between",
            //         },
            //         {
            //             name: "East",
            //             data: [10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1],
            //             pointPlacement: "between",
            //         },
            //         {
            //             name: "South-East",
            //             data: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10],
            //             pointPlacement: "between",
            //         },
            //         {
            //             name: "South",
            //             data: [2, 3, 5, 7, 8, 6, 4, 2, 3, 5, 7, 4, 3, 2, 1, 1],
            //             pointPlacement: "between",
            //         },
            //         {
            //             name: "South-West",
            //             data: [1, 2, 3, 5, 7, 9, 11, 13, 15, 17, 19, 20, 18, 16, 14, 12],
            //             pointPlacement: "between",
            //         },
            //         {
            //             name: "West",
            //             data: [5, 6, 8, 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10, 8, 6],
            //             pointPlacement: "between",
            //         },
            //         {
            //             name: "North-West",
            //             data: [10, 8, 6, 4, 2, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
            //             pointPlacement: "between",
            //         },
            //     ]
            // });
        },

        roseChartD3() {
            // //    this.roseChart();
            const svg = d3.select(this.$refs.chart)
                .append('svg')
                .style("width", "100%")
                .style("height", "auto")
                .style("font", "10px sans-serif")
                .append('g');

            const categories = this.data.map(d => d.category);
            const numCategories = categories.length;
            const numValues = this.data[0].values.length;

            const stack = d3.stack().keys(d3.range(numValues));

            const dataStack = stack(this.data.map(d => d.values));

            const innerRadius = 50;
            const outerRadius = Math.min(this.width, this.height) / 2 - 10;

            const x = d3.scaleBand()
                .domain(categories)
                .range([0, 2 * Math.PI])
                .align(0);

            const y = d3.scaleRadial()
                .range([innerRadius, outerRadius])
                .domain([0, d3.max(dataStack, d => d3.max(d, d => d[1]))]);

            const z = d3.scaleOrdinal()
                .range(['#98abc5', '#8a89a6', '#7b6888']);

            svg.selectAll('g')

                .data(dataStack)
                .enter().append('g')
                .attr('fill', d => z(d.key))
                .selectAll('path')
                .data(d => d)
                .enter().append('path')
                .attr('d', d3.arc()
                    .innerRadius(d => y(d[0]))
                    .outerRadius(d => y(d[1]))
                    .startAngle(d => x(d.data.category))
                    .endAngle(d => x(d.data.category) + x.bandwidth())
                    .padAngle(0.01)
                    .padRadius(innerRadius)
                )
                .attr('stroke', 'white')
                .style('stroke-width', '2px')
                .style('opacity', 0.7);
        },



        roseVentAffichage() {
            const seriesData = ref([25, 39, 30, 15]);
            const categories = ref(['Jun', 'Jul', 'Aug', 'Sept']);

            this.chartOptions2 = ({
                chart: {
                    type: 'line',
                },
                title: {
                    text: 'Number of project stars',
                },
                xAxis: {
                    categories: categories.value,
                },
                yAxis: {
                    title: {
                        text: 'Number of stars',
                    },
                },
                series: [{
                    name: 'New project stars',
                    data: seriesData.value,
                }],
            });
        },




        sendData(data) {
            // const data = { /* Vos données ici */ };
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
                        // console.log(data);
                        // Boucle pour avoir toutes les abscisses possibles
                        for (const property in data) {
                            // console.log(abscisses.indexOf(`${data[property]["heure"]}`));
                            console.log(property);
                            console.log(abscisses.indexOf(`${data[property]["heure"]}`))
                            console.log("aaaa");

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

            console.log(abscisses);
            console.log(listDataPlot);
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
