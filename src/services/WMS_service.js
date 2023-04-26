
/* eslint-disable */
import { FileSource, THREE, Style, Extent, FeatureGeometryLayer, WMSSource, ColorLayer, ElevationLayer } from "../../node_modules/itowns/dist/itowns";

/**
 * //Geographic view extent of Planar view
 */
const viewExtent = new Extent(
    "EPSG:2154",
    222955.5,
    224545.5,
    6750269.5,
    6752639.5
);

/**
 * //Satellite Image basemap WMSSource
 */
const sourceOrtho = new WMSSource({
    url: "https://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/r/wms",
    name: "HR.ORTHOIMAGERY.ORTHOPHOTOS",
    format: "image/png",
    crs: 'EPSG:2154',
    extent: viewExtent,
});

/**
 * //Satellite Image ColorLayer
 */
export const layerOrtho = new ColorLayer('Ortho', { source: sourceOrtho });

/**
 * //Elevation data WMSSource
 */
const sourceDEM = new WMSSource({
    url: "https://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/r/wms",
    name: "ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES",
    format: "image/x-bil;bits=32",
    crs: 'EPSG:2154',
    extent: viewExtent,
});

/**
 * //Elevation data ElevationLayer
 */
export const layerDEM = new ElevationLayer('DEM', { source: sourceDEM });

/**
 * //Topographic map WMSSource
 */
const sourcePLAN = new WMSSource({
    url: "https://wxs.ign.fr/cartes/geoportail/r/wms",
    name: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
    format: "image/png",
    crs: 'EPSG:2154',
    extent: viewExtent,
});

/**
 * //Topographic map layer
 */
export const layerPLAN = new ColorLayer('PLAN', { source: sourcePLAN });
