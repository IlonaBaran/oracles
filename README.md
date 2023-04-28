# PFA TSI 2022-2023 : ANR Oracles - VTTHREE

## Context

This project is based on previous works realized by LASTIG research lab: https://github.com/umrlastig/vtthree 

The goal of Oracles, project by the French National Research Agency is to address the challenges related to probabilistic forecasting of coastal flooding and their consequences on the territory, by focusing on data visualization. 

## Installation

* Install Docker 

https://docs.docker.com/desktop/install/windows-install/


* clone repo

```git clone https://github.com/IlonaBaran/oracles.git```

## Retrieve data and launch project

If you have access to this project you will be provided with a data.zip folder that you should unzip at root of project

inside /data should be :
    * /Data
    * /jsonData
    * /output_rasters

* launch project

``` docker-compose up --build```

    * flask server : http://localhost:5000/arboresance
    * http server : http://localhost:8080
    * app : http://localhost:8081

* launch another application server for development

``` npm run serve ```

* stop docker 

``` docker-compose down```


## Software Analysis Report

https://fr.overleaf.com/3487886835rmvtkbmjgcfw
https://drive.google.com/drive/folders/10uMZQdlAdXJLhPNlowMI52zLH416x9x6

## Authors and acknowledgment
Ilona Baran, Léa Fredoc, Jacqueline Williams & Fernando Rico Quintero

## Project status
Development & Maintenance will cease on 28/04/2023

## User manual
[Manuel utilisateur](ManuelUtilisateur.md)

## Programmer manual
Docs > index.html
Documentation made with JSDoc. You can add JSDoc annotations and generate the new documentation using : jsdoc -c jsdoc.json

## Librairies
List of the different libraries used:
* [primeVue](https://primevue.org/) used for the interface; 
* [ApexCharts.js](https://apexcharts.com/) used for charts; 
* [HighCharts.js](https://www.highcharts.com/) used for charts; 
* [JSDoc](https://jsdoc.app/) used for the documentation; 
* [iTowns](https://www.itowns-project.org/) used for visualizing 3D geographic information; 
