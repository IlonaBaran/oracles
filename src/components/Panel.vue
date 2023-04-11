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

                    <!-- Affichage dans le panel des paramètres saisies par l'utilisateur dans le header -->
                    <!-- <p>{{ selectedScenario }}</p>
                    <p>{{ selectedGraph }}</p> -->

                    <button @click="lineChartAffichage">Affichage d'un diagramme en ligne</button>
                    <apexchart  :options="this.chartOptions"  :series="this.series"/>    

                    <button @click="roseVentAffichage">Affichage d'un diagramme rose des vents</button>
                    <!-- <apexchart  :options="this.chartOptions2" :series="this.series2"/>     -->
                    <!-- <div ref="chart"></div> -->
                    <!-- <highcharts  :options="this.chartOptions2"></highcharts> -->

                    <button @click="heatMapAffichage">Affichage d'un diagramme de chaleur</button>
                    <apexchart  :options="this.chartOptions3" :series="this.series3"/>    

                </ScrollPanel>

            </template>
        </Card>
    </div>
</template>





<script>
/* eslint-disable */
import { ApexChart } from 'vue3-apexcharts';
// import { Highcharts } from 'highcharts';
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
    },

    // inject: ["lineChartAffichage"],

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

            // LINE
            chartOptions: {
                    chart: {
                        id: 'mychart',
                        height: 350,
                        type: 'line',
                        defaultPoint_marker_visible: false,
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: 'Product Trends by Month',
                        align: 'left'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        tooltip: {
                            enabled: false
                        },
                        categories: ["02:40", "02:50", "03:10", "03:20"],
                    }
                },
            
            series:  [{
                name: "Desktops",
                data: [1, 2, 3, 4]
            }],

            // ROSE WIND HIGHCHARTJS
            chartOptions2: ref(null),
            // series2: ref(null),

            // ROSE WIND D3
            data: [
                {category: 'A', values: [10, 20, 30]},
                {category: 'B', values: [40, 50, 60]},
                {category: 'C', values: [70, 80, 90]}
            ],
            width: 500,
            height: 500,

            // CHALEUR
            chartOptions3: ref(null),
            series3: ref(null),
        }
    },


        methods: {
            affichageAllGraph(){
                let graph = this.selectedGraph["name"];
                if (graph = "Graph2D 1"){
                    lineChartAffichage();
                }
                else if (graph = "Graph2D 2"){
                    // lineChartAffichage();
                }
                else if (graph = "Graph2D 3"){
                    // lineChartAffichage();
                }
                else if (graph = "Graph3D 1"){
                    // lineChartAffichage();
                }
                else if (graph = "Graph3D 2"){
                    heatMapAffichage();
                }

            },


            lineChart(abcisses, ordonnees){
                console.log(abcisses);
                console.log(ordonnees);
                // console.log(typeof abcisses);
                this.chartOptions = reactive({
                    chart: {
                        id: 'mychart',
                        height: 350,
                        type: 'line',
                        defaultPoint_marker_visible: false,
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: 'Product Trends by Month',
                        align: 'left'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        tooltip: {
                            enabled: false
                        },
                        // categories: ["02:40", "02:50", "03:10", "03:20"],
                        categories: abcisses,
                        // categories: ["02:40", "02:50", "03:00", "03:10", "03:20", "03:30", "03:40", "03:50", "04:00", "04:10", "04:20", "04:30", "04:40", "04:50", "05:00", "05:10", "05:20", "05:30", "05:40", "05:50", "06:00", "06:10", "06:20", "06:30", "06:40", "06:50", "07:00", "07:10", "07:20", "07:30", "07:40", "07:50", "08:00", "08:10", "08:20", "08:30"]
                    }
            });

            this.series =  [{
                name: "Desktops",
                // data: [10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51]
                data: ordonnees
            }]
        },

        lineChartAffichage() {
            var abcisses = new Array();
            var ordonnees = new Array() ;
            for (const element of this.selectedScenario) {
                var file = 'http://localhost:8081/' + element["name"] + '.json';
                fetch(file)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        for (const property in data) {
                            // var dict = {
                            //     x: `${data[property]["heure"]}`,
                            //     y: parseFloat(`${data[property]["Maree(m)"]}`),
                            // };
                            abcisses.push(data[property]["heure"]);
                            ordonnees.push(parseFloat(data[property]["Maree(m)"]));
                        }
                    })
                }
            // this.lineChart(abcisses, ordonnees);
            // this.lineChart(abcisses,  [10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51]);
            this.lineChart(abcisses,  ordonnees);


            // console.log(abcisses);
            // var hrgu = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
            // console.log( hrgu);
            // console.log(typeof hrgu);
            // console.log(typeof [10, 41, 35, 51, 49, 62, 69, 91, 148]);
        },


        roseChartHIGHCHARTS(){
            this.chartOptions2 = reactive({
                chart: {
                    polar: true,
                    type: "column",
                },
                title: {
                    text: "Wind Rose",
                },
                xAxis: {
                    categories: [
                        "N",
                        "NNE",
                        "NE",
                        "ENE",
                        "E",
                        "ESE",
                        "SE",
                        "SSE",
                        "S",
                        "SSW",
                        "SW",
                        "WSW",
                        "W",
                        "WNW",
                        "NW",
                        "NNW",
                    ],
                    tickmarkPlacement: "on",
                    lineWidth: 0,
                },
                yAxis: {
                    min: 0,
                    endOnTick: false,
                    showLastLabel: true,
                    title: {
                        text: "Frequency (%)",
                        align: "high",
                    },
                },
                tooltip: {
                    shared: true,
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}%</b><br/>',
                },
                legend: {
                    align: "right",
                    verticalAlign: "middle",
                    layout: "vertical",
                },
                plotOptions: {
                    column: {
                        pointPadding: 0,
                        borderWidth: 0,
                        groupPadding: 0,
                        shadow: false,
                    },
                },
                series: [
                    {
                        name: "North",
                        data: [5, 3, 4, 7, 2, 3, 5, 7, 8, 6, 4, 2, 3, 5, 4, 3],
                        pointPlacement: "between",
                    },
                    {
                        name: "North-East",
                        data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10, 8],
                        pointPlacement: "between",
                    },
                    {
                        name: "East",
                        data: [10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1],
                        pointPlacement: "between",
                    },
                    {
                        name: "South-East",
                        data: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10],
                        pointPlacement: "between",
                    },
                    {
                        name: "South",
                        data: [2, 3, 5, 7, 8, 6, 4, 2, 3, 5, 7, 4, 3, 2, 1, 1],
                        pointPlacement: "between",
                    },
                    {
                        name: "South-West",
                        data: [1, 2, 3, 5, 7, 9, 11, 13, 15, 17, 19, 20, 18, 16, 14, 12],
                        pointPlacement: "between",
                    },
                    {
                        name: "West",
                        data: [5, 6, 8, 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10, 8, 6],
                        pointPlacement: "between",
                    },
                    {
                        name: "North-West",
                        data: [10, 8, 6, 4, 2, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                        pointPlacement: "between",
                    },
                ]
            });
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

        roseVentAffichage(){
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
            var listDataPlot= [];
            for (const element of this.selectedScenario) {
                fetch('http://localhost:8081/' + `${element["name"]}` + '.json')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    var dict = {};
                    for (const property in data) {
                        var dict = {
                            name: `${element["name"]}`,
                            data: parseFloat(`${data[property]["Hs(vagues)(m)"]}`),
                        };
                        listDataPlot.push(dict);
                    }
                })
            }

            this.heatMap(listDataPlot);
            console.log(listDataPlot);
            console.log("_______________");
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

        heatMap(donnees){
            this.chartOptions3 = {
                 chart: {
                        type: 'heatmap',
                        height: 550,
                    },
                    dataLabels: {
                        enabled: true,
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
                    // categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    categories: ['Monday', 'Tuesday', 'Wednesday'],

                },
                yaxis: {
                    categories: ['Morning', 'Afternoon', 'Evening'],
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: (val) => {
                        return val + ' hours'
                        },
                    },
                },
            },

    //         this.series3 = [
    //     {
    //       name: 'Metric1',
    //       data: [11, 12, 8],
    //     },
    //     {
    //       name: 'Metric2',
    //       data: [10, 7, 13],
    //     },
    //     {
    //       name: 'Metric3',
    //       data: [1, 2, 3],
    //     },
    //     {
    //       name: 'Metric4',
    //       data: [1, 20, 3],
    //     },
    //   ]
        this.series3 = donnees;
      },
    }

};



    


//         roseVentAffichage() {
//             var L = [];
//            this.roseChart();

            // for (const element of this.selectedScenario) {
            //     // RECUPERATION DES DONNES AVEC DES FECTH - c
            //     var file = 'http://localhost:8081/' + element["name"] + '.json';
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
