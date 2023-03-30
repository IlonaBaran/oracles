import { WMTSSource, ColorLayer, ElevationLayer } from "itowns";

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

//Reseau Hydo
var hydroSource = new WMTSSource({
    url: 'https://wxs.ign.fr/topographie/geoportail/wmts',
    crs: "EPSG:3857",
    name: 'HYDROGRAPHY.HYDROGRAPHY',
    tileMatrixSet: 'PM',
    format: 'image/png',
})

export var hydroLayer = new ColorLayer('hydro', {
    source: hydroSource,
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

//ORTHOPHOTO
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

//BUILDINGS 
var batiSource = new WMTSSource({
    url: 'https://wxs.ign.fr/topographie/geoportail/wmts',
    crs: "EPSG:3857",
    name: 'BUILDINGS.BUILDINGS',
    tileMatrixSet: 'PM',
    format: 'image/png',
    style: 'normal'
})

export var batiLayer = new ColorLayer('Bati', {
    source: batiSource,
});


//PARCELLAIRE 
var pciSource = new WMTSSource({
    url: 'https://wxs.ign.fr/parcellaire/geoportail/wmts',
    crs: "EPSG:3857",
    name: 'CADASTRALPARCELS.PARCELLAIRE_EXPRESS',
    tileMatrixSet: 'PM',
    format: 'image/png',
    style: 'normal'
})

export var pciLayer = new ColorLayer('pci', {
    source: pciSource,
});

//Elevation high res ... super slow!!
var demHRSource = new WMTSSource({
    url: 'https://wxs.ign.fr/altimetrie/geoportail/wmts',
    crs: "EPSG:4326",
    name: 'ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES',
    tileMatrixSet: 'WGS84G',
    format: 'image/x-bil;bits=32',
    style: 'normal'
})

export var demHRLayer = new ElevationLayer('demHR', {
    source: demHRSource,
});


//Elevation low res ... super slow!!
var demSource = new WMTSSource({
    url: 'https://wxs.ign.fr/altimetrie/geoportail/wmts',
    crs: "EPSG:4326",
    name: 'ELEVATION.ELEVATIONGRIDCOVERAGE',
    tileMatrixSet: 'WGS84G',
    format: 'image/x-bil;bits=32',
    style: 'normal'
})

export var demLayer = new ElevationLayer('dem', {
    source: demSource,
});

//CourbeDeNiveau
var courbeNiveauSource = new WMTSSource({
    url: 'https://wxs.ign.fr/altimetrie/geoportail/wmts',
    crs: "EPSG:3857",
    name: 'ELEVATION.CONTOUR.LINE',
    tileMatrixSet: 'PM',
    format: 'image/png',
    style: 'normal'
})

export var courbeNiveauLayer = new ColorLayer('courbeNiveau', {
    source: courbeNiveauSource,
});

