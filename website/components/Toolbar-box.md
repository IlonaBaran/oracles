# Toolbar-box

## Props

<!-- @vuese:Toolbar-box:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|selectedScenario|-|`Object`|`true`|-|

<!-- @vuese:Toolbar-box:props:end -->


## Events

<!-- @vuese:Toolbar-box:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|change-building|Si le bouton est cliqué on emet "change-building" au composant parent Map.vue La fonction alors appelé affichera ou non la couche de bâtiments en fonction de la valeur de this.visibleBuilding|-|
|reinit-view|Si le bouton est cliqué on emet "reinit-view" au composant parent Map.vue On replace la caméra aux coordonnées d'origines|-|
|vue-2d|Code to switch to 2D view|-|
|vue-3d|Code to switch to 3D view|-|
|updateScenarios|-|-|

<!-- @vuese:Toolbar-box:events:end -->


