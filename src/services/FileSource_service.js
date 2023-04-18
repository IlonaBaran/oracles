/* eslint-disable */
import { FileSource, THREE, Style, FeatureGeometryLayer } from "../../node_modules/itowns/dist/itowns";

function setAltitude(properties) {
    if (properties.altitude_sol != null) {
        return properties.altitude_sol;
    } else {
        return 0;
    }
}

function setExtrusion(properties) {
    return properties.hauteur;
}

function setColor(properties) {

    return new THREE.Color(0xaaaaaa);
}

const batsource = new FileSource({
    url: 'http://localhost:8080/gavres_bati.geojson',
    crs: 'EPSG:2154',
    format: 'application/json',
});


export let bati = new FeatureGeometryLayer('bati', {
    // Use a FileSource to load a single file once
    source: batsource,
    transparent: true,
    opacity: 0.7,
    //zoom: { min: 10 },
    style: new Style({
        fill: {
            color: setColor,
            base_altitude: setAltitude,
            extrusion_height: setExtrusion,
        }
    })
});

