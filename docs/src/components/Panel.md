---
sidebarDepth: 2
---

## panelComponent

> TODO

Author: Equipe du projet Oracle - ENSG, TSI

Since: 25.04.2023

Composants enfants :
-- Librairie PrimeVue --
Card
ScrollPanel
-- Librairie VueHighcharts --
VueHighcharts - pas de documentation compatible avec vue-docgen

Version: 1.0

[See](https://www.highcharts.com/demo)

### Props

| Prop name        | Description                                                                  | Type   | Values | Default |
| ---------------- | ---------------------------------------------------------------------------- | ------ | ------ | ------- |
| selectedScenario | Liste des scénarios sélectionnés, valeur récupérée du composant Header.vue   | object | -      |         |
| selectedGraph    | Liste des graphiques sélectionnées, valeur récupérée du composant Header.vue | object | -      |         |

### Methods

#### afficheGraph

> Fonction qui permet d'afficher tout les types de diagrammes

#### reiAfficheGraph

> Masque les diagrammes

#### lineChart

> Création d'un diagramme en ligne en fonction du type données

##### Params

| Param name | Type   | Description           |
| ---------- | ------ | --------------------- |
| type       | String | Valeurs en ordonnée   |
| abscisses  | Array  | Valeurs des abscisses |
| ordonnees  | Array  | Valeurs des ordonnées |

#### lineChartAffichage

> Récupération des données et affichage d'un diagramme en ligne en fonction du type choisi par l'utilisateur

##### Params

| Param name | Type   | Description         |
| ---------- | ------ | ------------------- |
| type       | String | Valeurs en ordonnée |

#### roseVent

> Création d'un diagramme 'Rose des vents'

##### Params

| Param name | Type  | Description           |
| ---------- | ----- | --------------------- |
| abscisses  | Array | Valeurs des abscisses |
| ordonnees  | Array | Valeurs des ordonnées |

#### roseVentAffichage

> Récupération des données et affichage d'un diagramme 'Rose des vents'

#### histogramm

> Création d'un diagramme histogramme en fonction du type données

##### Params

| Param name | Type   | Description           |
| ---------- | ------ | --------------------- |
| type       | String | Valeurs en ordonnée   |
| abscisses  | Array  | Valeurs des abscisses |
| ordonnees  | Array  | Valeurs des ordonnées |

#### histogrammeAffichage

> Récupération des données et affichage d'un histogramme empilé en fonction du type choisi par l'utilisateur

##### Params

| Param name | Type   | Description         |
| ---------- | ------ | ------------------- |
| type       | String | Valeurs en ordonnée |

#### sendData

> Fonction non utilisé dans l'application car le diagramme n'a pas été réalisé
> Permet d'envoyer des données sur l'url suivante : 127.0.0.1:5000/api/data pour réaliser des traitements sur les données envoyées en Python

##### Params

| Param name | Type   | Description                                        |
| ---------- | ------ | -------------------------------------------------- |
| data       | String | Valeurs à mettre sur l'url 127.0.0.1:5000/api/data |

#### heatMap

> Création d'une carte de chaleur

##### Params

| Param name | Type  | Description           |
| ---------- | ----- | --------------------- |
| abscisses  | Array | Valeurs des abscisses |
| ordonnees  | Array | Valeurs des ordonnées |

#### heatMapAffichage

> Récupération des données et affichage d'une carte de chaleur

#### TD1

> Création d'un diagramme 3D en fonction du type données

##### Params

| Param name | Type   | Description           |
| ---------- | ------ | --------------------- |
| type       | String | Valeurs en ordonnée   |
| abscisses  | Array  | Valeurs des abscisses |
| ordonnees  | Array  | Valeurs des ordonnées |

#### TD1Affichage

> Récupération des données et affichage d'un diagramme 3D en fonction du type choisi par l'utilisateur

##### Params

| Param name | Type   | Description         |
| ---------- | ------ | ------------------- |
| type       | String | Valeurs en ordonnée |

---

---

## Card

### Slots

| Name     | Description | Bindings |
| -------- | ----------- | -------- |
| header   |             |          |
| title    |             |          |
| subtitle |             |          |
| content  |             |          |
| footer   |             |          |

---

## ScrollPanel

### Props

| Prop name | Description | Type   | Values | Default |
| --------- | ----------- | ------ | ------ | ------- |
| step      |             | number | -      | 5       |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
