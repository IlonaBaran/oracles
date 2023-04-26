/* eslint-disable */
import { FileSource, THREE, Style, FeatureGeometryLayer } from "../../node_modules/itowns/dist/itowns";

/**
 * TODO
 * @param {TODO} properties TODO
 */
function setAltitude(properties) {
    //if there is altitude_sol property in layer && it's not null use it
    if (properties.altitude_sol != null) {
        return properties.altitude_sol;
    } else {
        //else return a fixed value, 0 is good for near ocean
        return 0;
    }
}

/**
 * TODO
 * @param {TODO} properties TODO
 */
function setExtrusion(properties) {
    //return the building height
    return properties.hauteur;
}

/**
 * TODO
 * @param {TODO} properties TODO
 */
function setColor(properties) {
    //set the color to gray
    return new THREE.Color(0xaaaaaa);
}

/**
 * TODO
 */
const batsource = new FileSource({
    //retrieve building source from geojson file
    url: 'http://localhost:8080/gavres_bati.geojson',
    crs: 'EPSG:2154',
    format: 'application/json',
});

/**
 * TODO
 */
//create new FeatureGeometryLayer from building source
export let bati = new FeatureGeometryLayer('bati', {
    // Use a FileSource to load a single file once
    source: batsource,
    //set style
    transparent: true,
    opacity: 0.7,
    //zoom: { min: 10 },
    style: new Style({
        fill: {
            //use the extrusion functions
            color: setColor,
            base_altitude: setAltitude,
            extrusion_height: setExtrusion,
        }
    })
});


