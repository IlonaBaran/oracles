<template>
    <!-- Panel de gauche -->
    <div class="card p-hidden">

        <!-- Texte présent à l'intérieur du panel  -->
        <Card>
            <!-- Titre du panel -->
            <template #title>Graphiques</template>

            <template #content>

                <!-- Ajout d'un scroll -->
                <ScrollPanel style="width: 100%; height: 75vh " class="custombar1">

                    <!-- Div des graphiques lignes -->
                    <div v-if="selectedGraph.name == 'Ligne'">
                        <div v-if="this.affichageLigne == true">
                            <apexchart :options="this.chartOptions" :series="this.series" />
                            <apexchart :options="this.chartOptionsSurcote" :series="this.seriesSurcote" />
                            <apexchart :options="this.chartOptionsVagues" :series="this.seriesVagues" />
                            <apexchart :options="this.chartOptionsVent" :series="this.seriesVent" />
                        </div>
                    </div>

                    <!-- Div des graphiques rose des vents -->
                    <div v-else-if="selectedGraph.name == 'Rose des vents'">
                        <div v-if="this.affichageWindRose == true">
                            <vue-highcharts type="chart" :options="this.chartOptions2" :redrawOnUpdate="true"
                                :oneToOneUpdate="false" :animateOnUpdate="true" />
                        </div>
                    </div>

                    <!-- Div des graphiques histogrammes -->
                    <div v-else-if="selectedGraph.name == 'Histogramme empilé'">
                        <div v-if="this.affichageHistogramme == true">
                            <apexchart :options="this.chartOptions5Surcote" :series="this.series5Surcote" />
                            <apexchart :options="this.chartOptions5Maree" :series="this.series5Maree" />
                            <apexchart :options="this.chartOptions5Vagues" :series="this.series5Vagues" />
                            <apexchart :options="this.chartOptions5Vent" :series="this.series5Vent" />
                        </div>
                    </div>

                    <!-- Div des graphiques de chaleur -->
                    <div v-else-if="selectedGraph.name == 'Chaleur'">
                        <div v-if="this.affichageHeat == true">
                            <apexchart :options="this.chartOptions3" :series="this.series3" />
                        </div>
                    </div>

                    <div v-else-if="selectedGraph.name == 'Ligne 3D'">
                        <div v-if="this.affichageLigne3d == true">

                            <vue-highcharts :options="this.chartOptions4"></vue-highcharts>

                        </div>
                    </div>

                    <!-- Div d'avertissement si il n'y a pas de graphiques sélectionnés -->
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

// Import des éléments des librairies
import VueHighcharts from 'vue3-highcharts';
import HighCharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d'
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(HighCharts); // Pour les graphiques highchart polar
Highcharts3D(HighCharts); // Pour les graphiques highchart 3d 

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
        selectedScenario: { /* Liste des scénarios sélectionnés, valeur récupérée du composant Header.vue */
            type: Object,
            required: true
        },
        selectedGraph: { /* Liste des graphiques sélectionnées, valeur récupérée du composant Header.vue */
            type: Object,
            required: true
        },
    },

    data() {
        return {

            // Booléens d'affichage du panel
            checked: ref(false),
            checkedPanel: ref(false),

            // Booléens d'affichage des types de graphiques 
            affichageLigne: false,
            affichageHeat: false,
            affichageRose: false,
            affichageHistogramme: false,
            affichageWindRose: false,
            affichageLigne3d: false,


            // LINE CHART - APEXCHARTS //
            // Graphiques Ligne des marées
            chartOptions: {
                chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { nabled: false } },
                dataLabels: { enabled: false, grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, }, xaxis: { tooltip: { enabled: false }, categories: [], } },
            },
            series: [],

            // Graphiques Ligne des surcôtes
            chartOptionsSurcote: {
                chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { nabled: false } },
                dataLabels: { enabled: false, grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, }, xaxis: { tooltip: { enabled: false }, categories: [], } },
            },
            seriesSurcote: [],

            // Graphiques Ligne des vagues
            chartOptionsVagues: {
                chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { nabled: false } },
                dataLabels: { enabled: false, grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, }, xaxis: { tooltip: { enabled: false }, categories: [], } },
            },
            seriesVagues: [],

            // Graphiques Ligne des vents
            chartOptionsVent: {
                chart: { id: 'mychart', height: 350, type: 'line', defaultPoint_marker_visible: false, zoom: { nabled: false } },
                dataLabels: { enabled: false, grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }, }, xaxis: { tooltip: { enabled: false }, categories: [], } },
            },
            seriesVent: [],

            // ROSE WIND - HIGHCHARTJS //
            chartOptions2: ({
                chart: { polar: true, type: 'column' },
                title: { text: 'En attente de données', },
                xAxis: { categories: [], },
                yAxis: { title: { text: 'En attente de données', }, },
                plotOptions: { series: { stacking: 'normal', shadow: false, pointPlacement: 'on' } },
                series: [{}, {}, {}, {}],
            }),

            // DIAGRAMME EMPILE - APEXCHARTS //
            // Graphiques empile des surcotes
            chartOptions5Surcote: ({
                chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                responsive: [{ reakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
                xaxis: { categories: [] },
                fill: { opacity: 1 },
                legend: { position: 'right', offsetX: 0, offsetY: 50 },
            }),

            series5Surcote: [{ name: 'En attente de données', data: [] }],

            // Graphiques empile des marées
            chartOptions5Maree: ({
                chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
                xaxis: { categories: [] },
                fill: { opacity: 1 },
                legend: { position: 'right', offsetX: 0, offsetY: 50 },
            }),

            series5Maree: [{ name: 'En attente de données', data: [] }],

            // Graphiques empile des vagues
            chartOptions5Vagues: ({
                chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
                xaxis: { categories: [] },
                fill: { opacity: 1 },
                legend: { position: 'right', offsetX: 0, offsetY: 50 },
            }),

            series5Vagues: [{ name: 'En attente de données', data: [] }],

            // Graphiques empile des vents
            chartOptions5Vent: ({
                chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
                xaxis: { categories: [] },
                fill: { opacity: 1 },
                legend: { position: 'right', offsetX: 0, offsetY: 50 },
            }),

            series5Vent: [{ name: 'En attente de données', data: [] }],

            // HEAT MAP - APEXCHARTS
            chartOptions3: ref(null),
            series3: ref(null),


            // HEAT MAP MAIS EN 3D - HIGHTCHARTS
            chartOptions4: ({
                chart: {
                    type: 'area',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 30,
                        depth: 200
                    }
                },
                title: { text: 'Visual comparison of Mountains Panorama' },
                accessibility: {
                    description: 'The chart is showing the shapes of three mountain ranges as three area line series laid out in 3D behind each other.',
                    keyboardNavigation: {
                        seriesNavigation: { mode: 'serialize' }
                    }
                },
                lang: {
                    accessibility: { axis: { xAxisDescriptionPlural: 'The chart has 3 unlabelled X axes, one for each series.' } }
                },
                yAxis: {
                    title: { text: 'Height Above Sea Level', x: 0 },
                    labels: { format: '{value:,.0f} MAMSL' },
                    gridLineDashStyle: 'Dash'
                },
                xAxis: [],
                plotOptions: {
                    area: {
                        depth: 100,
                        marker: { enabled: false },
                        states: { inactive: { enabled: false } }
                    }
                },
                tooltip: { valueSuffix: ' MAMSL' },
                series: [{}]
            }),
        }
    },


    methods: {
        // Fonction qui permet d'afficher tout les types de diagrammes
        afficheGraph() {
            // Affichage des diagrammes en lignes
            this.lineChartAffichage('Surcote(m)')
            this.lineChartAffichage('Maree(m)');
            this.lineChartAffichage('Hs(vagues)(m)');
            this.lineChartAffichage('U(vent)(m)');

            // Affichage des diagrammes rose des vents
            this.roseVentAffichage();

            // Affichage des diagrammes heatmap
            this.heatMapAffichage();

            // Affichage des diagrammes histogrammes
            this.histogrammeAffichage('Surcote(m)');
            this.histogrammeAffichage('Maree(m)');
            this.histogrammeAffichage('Hs(vagues)(m)');
            this.histogrammeAffichage('U(vent)(m)');

            // Affichage des diagrammes en lignes 3D
            this.TD1Affichage('Maree(m)');
        },

        // Masque les diagrammes
        reiAfficheGraph() {
            this.affichageLigne = false;
            this.affichageHeat = false;
            this.affichageHistogramme = false;
            this.affichageWindRose = false;
            this.affichageLigne3d = false;

        },

        // Création d'un diagramme en ligne en fonction du type données
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

        // Récupération des données et création d'un diagramme en ligne en fonction du type données
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

        roseVent(abscisses, ordonnees) {
            console.log(ordonnees);
            this.chartOptions2 = ({
                chart: { polar: true, type: 'column' },
                title: { text: 'Distribution de la vitesse du vent', },
                // xAxis: { tickmarkPlacement: 'on', categories: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', '1', '2', '3', '4'] },
                xAxis: { tickmarkPlacement: 'on', categories: abscisses },
                yAxis: {
                    min: 0,
                    endOnTick: false,
                    showLastLabel: true,
                    reversedStacks: false,
                    title: { text: 'Direction du vent', },
                },
                plotOptions: { series: { stacking: 'normal', shadow: false, pointPlacement: 'on' } },

                series:
                    // { type: undefined, name: '<1 m/s', data: [1, 2, 3, 2, 1, 6, 8, 4, 0, 2, 7, 5, 2, 1, 4, 1, 1, 2, 3, 0, 1, 0, 1, 0, 0, 2, 0, 1, 2, 4, 3, 1, 5,3,2,1] },
                    // { type: undefined, name: '1-3 m/s', data: [1, 2, 3, 0, 1, 0, 1, 0, 0, 2, 0, 1, 2, 4, 3, 1, 1, 2, 3, 0, 1, 0, 1, 0, 0, 2, 0, 1, 2, 4, 3, 1, 5,7,2,0] },
                    ordonnees,
                // { type: undefined, name: '3-5 m/s', data: [1, 2, 3, 0, 1, 0, 0, 0, 1, 2, 1, 1, 2, 1, 1, 1] },
                // { type: undefined, name: '>5 m/s', data: [1, 2, 3, 0, 1, 1, 0, 0, 0, 2, 3, 1, 2, 1, 1, 1] }

                // series: ordonnees,
            });
            // this.affichageWindRose = true;
        },

        roseVentAffichage() {
            // valeurs a afficher --> ordonnées
            var listDataPlot = [];
            // valeurs à afficher --> abscisses
            var abscisses = new Array();
            for (var i = 0; i < 36; i++) {
                abscisses.push(i * 10);
            };

            var s1 = new Array(36).fill(0); // inférieur à 6 m/s
            var s2 = new Array(36).fill(0); // entre 6 et 7.5 m/s
            var s3 = new Array(36).fill(0); // entre 7.5 et 9 m/s
            var s4 = new Array(36).fill(0); // supérieur à 9 m/s

            let promise = null;

            for (const element of this.selectedScenario) {
                promise = fetch('http://localhost:8080/jsonData/' + `${element["name"]}` + '.json')
                    .then(response => response.json())
                    .then(data => {
                        for (const property in data) {
                            // On recupère la vitesse du vent 
                            var vitesseVent = `${data[property]["U(vent)(m)"]}`;
                            // On recupère la direction du vent 
                            var directionVent = `${data[property]["Dir(vent)()"]}`;
                            var index = parseInt(directionVent / 10);

                            if (`${data[property]["U(vent)(m)"]}` < 6) {
                                s1[index] += 1;
                            }
                            else if (`${data[property]["U(vent)(m)"]}` > 6 && `${data[property]["U(vent)(m)"]}` < 8) {
                                s2[index] += 1;
                            }
                            else if (`${data[property]["U(vent)(m)"]}` > 8 && `${data[property]["U(vent)(m)"]}` < 10) {
                                s3[index] += 1;
                            }
                            if (`${data[property]["U(vent)(m)"]}` > 10) {
                                s4[index] += 1;
                            }
                        }
                    })
            }
            promise.then(date => {
                listDataPlot.push({ type: undefined, name: "inférieur à 6m/s", data: s1 });
                listDataPlot.push({ type: undefined, name: "entre 6 et 8m/s", data: s2 });
                listDataPlot.push({ type: undefined, name: "entre 8 et 10m/s", data: s3 });
                listDataPlot.push({ type: undefined, name: "supérieur à 10m/s", data: s4 });
                this.roseVent(abscisses, listDataPlot);
                this.affichageWindRose = true;
            })

        },

        histogramm(type, abscisses, ordonnees) {
            if (type == "Maree(m)") {
                this.series5Maree = ordonnees;
                this.chartOptions5Maree = reactive({
                    chart: { type: 'bar', height: 350, stacked: true, stackType: '100%' },
                    title: { text: 'Réparition des hauteurs de marée par scénario', align: 'left' },
                    responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
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
                    responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
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
                    responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
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
                    responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } } }],
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => { console.log('Données envoyées avec succès !'); })
                .catch(error => { console.error('Erreur lors de l\'envoi des données :', error); });
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
                chart: { type: 'heatmap', },
                dataLabels: { enabled: false },
                plotOptions: {
                    heatmap: {
                        useFillColorAsStroke: true,
                        shadeIntensity: 1,
                        radius: 0,
                    }
                },

                colors: ['#008FFB'],
                title: { text: 'Heatmap Chart', align: 'left' },
                xaxis: {
                    tooltip: { enabled: false },
                    type: 'category',
                    categories: abscisses,
                    overwriteCategories: abscisses,
                },
                yaxis: { categories: ['Morning', 'Afternoon', 'Evening'] },

            },
                this.series3 = donnees;
        },


        // ressource : https://www.highcharts.com/docs/chart-concepts/3d-charts
        // https://www.highcharts.com/demo/3d-area-multiple/brand-light
        TD1(type, abscisses, ordonnees) {
            console.log(ordonnees);
            this.chartOptions4 = ({
                chart: {
                    type: 'area',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 30,
                        depth: 200,
                        viewDistance: 25
                    }
                },
                title: { text: 'Number of project stars', },

                accessibility: {
                    description: 'The chart is showing the shapes of three mountain ranges as three area line series laid out in 3D behind each other.',
                    keyboardNavigation: { seriesNavigation: { mode: 'serialize' } }
                },
                yAxis: {
                    title: { text: 'Height Above Sea Level', x: -40 },
                    labels: { format: '{value:,.0f} MAMSL' },
                    gridLineDashStyle: 'Dash'
                },
                xAxis: abscisses,
                plotOptions: {
                    area: {
                        depth: 100,
                        marker: { enabled: false },
                        states: { inactive: { enabled: false } }
                    }
                },
                tooltip: { valueSuffix: ' MAMSL' },
                series: ordonnees,
            });
            this.affichageLigne3d = true;
        },


        TD1Affichage(type) {
            let abscisses = [];
            let ordonnees = [];
            let index = 0;
            let promise = null;
            let axes = [];
            for (const element of this.selectedScenario) {
                var file = 'http://localhost:8080/jsonData/' + element["name"] + '.json';
                promise = fetch(file)
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
                        let dict = {
                        };
                        if (ordonnees.length == 0) {
                            axes.push({ visible: true, categories: abscisses, })

                        }


                        else {
                            dict = {
                                xAxis: ordonnees.length,
                            };
                            axes.push({ visible: false });
                        }

                        dict["name"] = `${element["name"]}`;
                        // L : tableau pour mettre les valeurs du scénario dedans. On ajoutera L au tableau à la fin de la boucle for
                        let L = new Array(abscisses.length).fill(0);
                        for (const property in data) {
                            if (abscisses.indexOf(`${data[property]["heure"]}`) != -1) {
                                L[abscisses.indexOf(`${data[property]["heure"]}`)] = parseFloat(`${data[property][type]}`);
                            }
                        };
                        dict["data"] = L;
                        ordonnees.push(dict);
                    })

            }
            promise.then(response => {
                console.log(ordonnees);
                this.TD1(type, axes, ordonnees);
            })

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
//             //console.log(data);
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
