import "ol/ol.css";
import Map from "ol/Map";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import View from "ol/View";
import { createXYZ } from "ol/tilegrid";
import MVT from "ol/format/MVT";
import * as olms from "ol-mapbox-style";
import Feature from "ol/Feature";

export const planStyle = "Plan";
export const grisStyle = "Gris";
export const muetStyle = "Muet";

let ignStyleMap = new Map();
ignStyleMap.set(
  planStyle,
  "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/standard.json"
);
ignStyleMap.set(
  grisStyle,
  "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/gris.json"
);
ignStyleMap.set(
  muetStyle,
  "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/sans_toponymes.json"
);

export class OLViewer {

  constructor(width, height, center, zoom, style) {
    this.initOL(width, height, center, zoom, style);
  }


  async initOL(width, height, center, zoom, styleName) {

    //Init map element Index.html
    this.domElement = document.getElementById("map");
    //console.log(this.domElement)
    document.getElementById("map").style.visibility = "hidden";
    document.getElementById("map").style.width = width * 2 + "px";
    document.getElementById("map").style.height = height * 2 + "px";

    //Init Map with camera positioning
    this.map = new Map({
      layers: [],
      target: "map",
      view: new View({
        center: center,
        zoom: zoom
      })
    });

    //Create Vector Tile Layer using IGN flux WMTS
    this.layer = new VectorTileLayer({
      title: "Plan IGN vecteur",
      source: new VectorTileSource({
        tilePixelRatio: 1,
        tileGrid: createXYZ({ maxZoom: 21 }),
        format: new MVT({ featureClass: Feature }),
        //projection: new Projection({ code: "EPSG:3857" }),
        url:
          "https://wxs.ign.fr/essentiels/geoportail/tms/1.0.0/PLAN.IGN/{z}/{x}/{y}.pbf"
      }),
      minResolution: 0,
      maxResolution: 200000,
      declutter: true
    });

    //get by style
    var defaultUrl = ignStyleMap.get(styleName);
    let response = await fetch(defaultUrl);
    let style = await response.json();

    for (let layer of style.layers) {
      if (layer.type == "background") {
       // console.log("BACKGROUND");
      }
    }

    //Awaiting style
    await olms.applyStyle(this.layer, style, "plan_ign");

    //adding layer to map
    this.map.addLayer(this.layer);
  }
}
