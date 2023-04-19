
/* eslint-disable */
import { FileSource, THREE, Style, Extent, FeatureGeometryLayer, WMSSource, ColorLayer, ElevationLayer } from "../../node_modules/itowns/dist/itowns";

//defining the views geographic extent, how far does it go
const viewExtent = new Extent(
    "EPSG:2154",
    222955.5,
    224545.5,
    6750269.5,
    6752639.5
);

// Define the source of the ortho-images
const sourceOrtho = new WMSSource({
    url: "https://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/r/wms",
    name: "HR.ORTHOIMAGERY.ORTHOPHOTOS",
    format: "image/png",
    crs: 'EPSG:2154',
    extent: viewExtent,
});
// Create the ortho-images ColorLayer and add it to the view
export const layerOrtho = new ColorLayer('Ortho', { source: sourceOrtho });


// Define the source of the dem data
const sourceDEM = new WMSSource({
    url: "https://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/r/wms",
    name: "ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES",
    format: "image/x-bil;bits=32",
    crs: 'EPSG:2154',
    extent: viewExtent,
});
// Create the dem ElevationLayer and add it to the view
export const layerDEM = new ElevationLayer('DEM', { source: sourceDEM });


// Define the source of the dem data
const sourcePLAN = new WMSSource({
    url: "https://wxs.ign.fr/cartes/geoportail/r/wms",
    name: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
    format: "image/png",
    crs: 'EPSG:2154',
    extent: viewExtent,
});
// Create the dem ElevationLayer and add it to the view
export const layerPLAN = new ColorLayer('PLAN', { source: sourcePLAN });

function setAltitude(properties) {
    return properties.altitude_sol - properties.hauteur;
}

function setExtrusion(properties) {
    return properties.hauteur;
}

function setColor() {
    return new THREE.Color(0xffaaaa);
}


// Define the source of the dem data
const sourceBATI = new FileSource({
    url: "http://localhost:8080/gavres_bati.geojson",
    format: "application/json",
    crs: 'EPSG:2154',
});
// Create the dem ElevationLayer and add it to the view
export const layerBATI = new FeatureGeometryLayer('BATI', {
    source: sourceBATI,
    transparent: true,
    opacity: 0.7,
    zoom: { min: 14 },
    style: new Style({
        fill: {
            color: new THREE.Color(0xffaaaa),
            base_altitude: 10,
            extrusion_height: 40,
        },
    }),
});




