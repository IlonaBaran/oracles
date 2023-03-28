/* eslint-disable */
import * as itowns from 'itowns';
import proj4 from 'proj4';


class MapViewer {

    constructor(viewerDivId, coords) {
        this.viewerDiv = viewerDivId;

        var placement = {
            coord: new itowns.Coordinates('EPSG:4326', coords[0], coords[1]),
            range: 2500
        };

        this.view = new itowns.GlobeView(viewerDiv, placement);


        proj4.defs(
            'EPSG:2154',
            '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
        );


        var orthoSource = new itowns.WMTSSource({
            url: 'https://wxs.ign.fr/essentiels/geoportail/wmts/',
            crs: "EPSG:3857",
            name: 'ORTHOIMAGERY.ORTHOPHOTOS',
            tileMatrixSet: 'PM',
            format: 'image/jpeg',
            style: 'normal'
        })

        var orthoLayer = new itowns.ColorLayer('Ortho', {
            source: orthoSource,
        });

        this.view.addLayer(orthoLayer);




    }

}



export default MapViewer;