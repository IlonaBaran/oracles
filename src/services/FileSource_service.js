/* eslint-disable */
import { FileSource, THREE, Style, FeatureGeometryLayer } from "../../node_modules/itowns/dist/itowns";

/**
 * Function that extrudes buildings from building height data
 * @param {Object} properties properties object from building layer
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
 * Function that sets building ground elevation from building height data
 * @param {Object} properties properties object from building layer
 */
function setExtrusion(properties) {
    //return the building height
    return properties.hauteur;
}

/**
 * //Function that set color of buildings to grey
 * @param {Object} properties properties object from building layer
 */
function setColor(properties) {
    //set the color to gray
    return new THREE.Color(0xaaaaaa);
}

/**
 * Building FileSource
 */
const batSource = new FileSource({
    //retrieve building source from geojson file
    url: 'http://localhost:8080/gavres_bati.geojson',
    crs: 'EPSG:2154',
    format: 'application/json',
});

/**
 * Building FeatureGeometryLayer
 */
//create new FeatureGeometryLayer from building source
export let bati = new FeatureGeometryLayer('bati', {
    // Use a FileSource to load a single file once
    source: batSource,
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


