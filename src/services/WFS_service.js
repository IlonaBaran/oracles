import { THREE, WFSSource, FeatureGeometryLayer, Style } from "../../node_modules/itowns/dist/itowns";

function setAltitude(properties) {
    return properties.z_min - properties.hauteur;
}

function setExtrusion(properties) {
    return properties.hauteur;
}

function setColor() {
    return new THREE.Color(0xaaaaaa);
}

var bati3DSource = new WFSSource({
    url: 'http://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wfs?',
    typeName: 'BDTOPO_BDD_WLD_WGS84G:bati_indifferencie',
    crs: 'EPSG:4326',
});

export var bati3DLayer = new FeatureGeometryLayer('Buildings', {
    source: bati3DSource,
    zoom: { min: 14 },
    style: new Style({
        fill: {
            color: setColor,
            base_altitude: setAltitude,
            extrusion_height: setExtrusion,
        },
    }),
});