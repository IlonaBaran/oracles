/* eslint-disable */
import { FileSource, THREE, Style, FeatureGeometryLayer } from "../../node_modules/itowns/dist/itowns";

/**
 * Fonction permettant d'extruder les bâtiments à partir des données relatives à leur hauteur
 * @param {Object} properties objet de propriété de la couche bâtiment
 */
function setAltitude(properties) {
    //si la propriété altitude_sol existe dans la couche et qu'elle n'est pas nulle, elle est utilisée
    if (properties.altitude_sol != null) {
        return properties.altitude_sol;
    } else {
        //sinon renvoie une valeur fixe, 0 est bon pour l'océan proche
        return 0;
    }
}

/**
 * Fonction qui définit l'élévation du sol du bâtiment à partir des données relatives à la hauteur du bâtiment
 * @param {Object} properties objet de propriété de la couche bâtiment
 */
function setExtrusion(properties) {
    //retourner la hauteur du bâtiment
    return properties.hauteur;
}

/**
 * Fonction qui fixe la couleur des bâtiments en gris
 * @param {Object} properties objet de propriété de la couche bâtiment
 */
function setColor(properties) {
    //définir la couleur en gris
    return new THREE.Color(0xaaaaaa);
}

/**
 * création de FileSource
 */
const batSource = new FileSource({
    //récupération des bâtiments à partir d'un fichier geojson
    url: 'http://localhost:8080/gavres_bati.geojson',
    crs: 'EPSG:2154',
    format: 'application/json',
});

/**
 * Construction de la couche FeatureGeometryLayer
 */
//création d'un nouveau FeatureGeometryLayer à partir d'une source de construction
export let bati = new FeatureGeometryLayer('bati', {
    // Utiliser un FileSource pour charger un seul fichier en une seule fois
    source: batSource,
    //Création du style
    transparent: true,
    opacity: 0.7,
    //zoom: { min: 10 },
    style: new Style({
        fill: {
            //utilisation des fonctions d'extrusion
            color: setColor,
            base_altitude: setAltitude,
            extrusion_height: setExtrusion,
        }
    })
});


