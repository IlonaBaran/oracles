# PFA TSI 2022-2023 : ANR Oracles - VTTHREE : "Visualisation de scénarios de submersion côtière"**    

Manuel d'utilisation
=======

## Table des matières
1. [Informations](#Informations)
2. [Accès à l'application](#Accès-à-la-page-WEB)
3. [Fonctionnalités de l'application](#Fonctionnalité)
4. [Sources](####Sources)

***
# Informations
###### Authors and acknowledgment
Ilona Baran, Léa Fredoc, Jacqueline Williams & Fernando Rico Quintero
###### Commanditaires
Sidonie Christophe et Jacques Gautier
###### Project status
Development & Maintenance will cease on 28/04/2023
###### URL du site
localhost:8080
###### Pré-requis
+ Connection internet pour l'affichage de la carte  
+ Utilisation d'un navigateur


***
# Accès à la page web
Pour accéder à la page web, il vous suffit de rentrer l’URL du site dans n’importe quel navigateur web, de préférence Mozilla Firefox car c’est le navigateur utilisé pour son développement.


# Fonctionnalités 
L'application est composée :
+ d'un pied de page (espace des options de la page (aide, crédits, plan du site, etc)) ;
+ d'une en-tête permettant le choix de la zone d'étude ainsi que les scénarios et graphiques à visualiser
+ d'un fond de carte au milieu et d'un bouton permettant de visualiser la scène et 2D ou 3D
+ d'un widget sur la droite proposant plusieurs options pour l'utilisateur (changement du fond de carte, visualisation des bâtiments...)
![Page WEB de OUTDOORVISIONDataviz](img/readme_manuelUtilisation/pageAccueil.png)


## Changement de la zone d'étude
Dans l'en-tête de la page à droite, vous toruverez deux boutons 'Gâvres' et 'Arcachon'. Pour changer de zone d'étude, vous devez cliquer sur la zone que vous souhaitez.
Dans ce prototype, nous n'avons pas de données pour Arcachon, ce bouton est donc désactivé.


## Visualisation en 2D et 3D
Dans la partie principale de l'applicaiton, vous trouverez en bas à droite deux boutons '2D' et '3D'. La vue sur laquelle vous êtes en en vert. Pour changer de dimension, vous devez simplement cliquer sur la dimension voulue.
-->  rajouter comment naviguer en 2D ET 3D

## Autres options 
A droite, dans la partie principale, vous trouverez un bouton vert +. Lorsque vous cliquez dessus, plusieurs icônes apparaissent :
+ Changement de fond de carte
+ Affichage ou supression des bâtiments
+ Recentrer la vue  


## Affichage des hauteurs d'eau maximale et finale
#### Pour un scénario
#### Pour plusieurs scénarios


## Visualisation des graphiques
Pour visualiser un graphique, il vous suffit de choisir un ou plusieurs scénarios dans l'en-tête de la page. Ensuite, vous devez choisir un graphique parmi ceux proposés et valider
votre séléction. Sur la gauche, un panel s'ouvrira avec le graphique que vous avez choisi.

Si vous voulez changer de graphique, vous pouvez le faire en choississant un autre graphique.
Si vous voulez modifier les graphiques séléctionnés, vous devez cliquer sur le bouton de réinitialisation.

#### Diagramme 1 : Diagramme linéaire
Quatre graphiques sont affichés : la hauteur des vagues, la surcote, la vitesse du vent en fonction du temps
Il est possible de séléctionner un ou plusieurs scénarios.
![PojetWeb](img/imagettes/Diagramme1.png)

#### Diagramme 2 : Rose des vents
Ce graphique présente la distribution de la vitesse du vent pour une simulation.
Les données pour une même simulation sont très proches en terme :
+ de vitesse de vent (écart d’environ 3 m/s entre la valeur minimale et maximale) ;
+ de direction du vent (écart d’environ 10° entre la valeur minimale et maximale). 
Il peut donc être difficle d'obtenir un résultat exploitable.
![PojetWeb](img/imagettes/Diagramme2.png)

#### Diagramme 3 : Histogramme empilé
Quatre graphiques sont affichés : la hauteur des vagues, la surcote, la vitesse du vent en fonction du temps
Il est possible de séléctionner un ou plusieurs scénarios.
![PojetWeb](img/imagettes/Diagramme3.png)

#### Diagramme 4 : Carte de chaleur
La carte de chaleur montre la hauteur de l'eau en fonction du temps. 
Il est possible de séléctionner un ou plusieurs scénarios.
![PojetWeb](img/imagettes/Diagramme4.png)

#### Diagramme 5 : Linéaire 3D
La carte de chaleur peut être difficilement exploitable car les valeurs au sein d'un même scénario varient peu. Pour avoir une autre représentation, nous avons réalisé ce diagramme 3D. 
Il est possible de séléctionner un ou plusieurs scénarios.
![PojetWeb](img/imagettes/Diagramme5.png)

