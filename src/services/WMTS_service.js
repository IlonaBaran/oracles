import { WMTSSource, ColorLayer } from "itowns";

//Reseau Routier
var routeSource = new WMTSSource({
    url: 'https://wxs.ign.fr/topographie/geoportail/wmts',
    crs: "EPSG:3857",
    name: 'TRANSPORTNETWORKS.ROADS',
    tileMatrixSet: 'PM',
    format: 'image/png',
})

export var routeLayer = new ColorLayer('Ortho', {
    source: routeSource,
});

//Carte Topo
var planIGNv2Source = new WMTSSource({
    url: 'https://wxs.ign.fr/decouverte/geoportail/wmts',
    crs: "EPSG:3857",
    name: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
    tileMatrixSet: 'PM',
    format: 'image/png',
})

export var planIGNv2Layer = new ColorLayer('Ortho', {
    source: planIGNv2Source,
});

var orthoSource = new WMTSSource({
    url: 'https://wxs.ign.fr/essentiels/geoportail/wmts/',
    crs: "EPSG:3857",
    name: 'ORTHOIMAGERY.ORTHOPHOTOS',
    tileMatrixSet: 'PM',
    format: 'image/jpeg',
    style: 'normal'
})

export var orthoLayer = new ColorLayer('Ortho', {
    source: orthoSource,
});

