/* eslint-disable */

import { VTThreeViewer, RENDER_MODE } from "./VTThreeViewer";
import * as THREE from "three";
import { OLViewer, IGN_STYLES } from "./OLViewer";
import Feature from "ol/Feature";
import { ZOOM_RES_L93 } from "./Utils";



export class VTController {

  constructor(
    width,
    height,
    center,
    zoom,
    layers,
    renderMode,
    style,
    tileZoom
  ) {
    this.width = width;
    this.height = height;
    this.renderMode = renderMode;
    this.features = new Map();
    this.layers = layers;
    this.zoomOlViewer = this.zoomOlViewer.bind(this);
    this.loadTileFeatures = this.loadTileFeatures.bind(this);
    this.render = this.render.bind(this);
    this.init(center, zoom, renderMode, style, tileZoom);
    this.state = { loading: 0 };
    this.tileZoom = tileZoom;
  }

  async init(center, zoom, renderMode, style, tileZoom) {
    this.threeViewer = new VTThreeViewer(
      this.width,
      this.height,
      0xffffff,
      !tileZoom,
      center,
      ZOOM_RES_L93[zoom]
    );
    this.olViewer = await new OLViewer(
      this.width,
      this.height,
      center,
      zoom,
      style
    );
    let self = this;
    this.olViewer.map.on("rendercomplete", function () {
      //console.log("map render complete!");
      var mapContainer = document.getElementById("map");
      var mapCanvas = mapContainer.getElementsByTagName("canvas")[0];
      self.threeViewer.setPlaneTexture(mapCanvas);
    });

    this.olViewer.layer.getSource().on("tileloadstart", function (evt) {
      self.state.loading++;
    });

    this.olViewer.layer.getSource().on("tileloadend", this.loadTileFeatures);

    if (this.tileZoom) {
      this.threeViewer.renderer.domElement.addEventListener("wheel", event => {
       //console.log("wheeeel ");
        self.zoomOlViewer(event);
      });
    }

    this.render();
  }

  render() {
    if (this.tileZoom && this.state.loading != 0) {
      //console.log("render ol!");
      var mapContainer = document.getElementById("map");
      var mapCanvas = mapContainer.getElementsByTagName("canvas")[0];
      this.threeViewer.setPlaneTexture(mapCanvas);
    }

    this.threeViewer.animate();
    requestAnimationFrame(this.render);
  }

  loadVTile() {
    return new Promise(function (resolve, reject) {
      this.olViewer.layer.getSource().on("tileloadend", resolve);
    });
  }

  zoomOlViewer(event) {
    //console.log("zoooooom!");
    //this.olViewer.domElement.dispatchEvent(
    this.olViewer.map.getViewport().dispatchEvent(
      new WheelEvent("wheel", {
        // deltaX: event.deltaX,
        // deltaY: event.deltaY,
        // clientX: this.width / 4,
        // clientY: this.height / 4
        clientX: event.clientX,
        clientY: event.clientY,
        screenX: event.screenX,
        screenY: event.screenY
      })
    );
    event.preventDefault();
  }

  loadTileFeatures(evt) {
    //console.log("tile load end!");
    var z = evt.tile.getTileCoord()[0];
    var features = evt.tile.getFeatures();
    let layer = "";
    let self = this;
    let tileFeatures = new Map();
    for (let feature of features) {
      for (let layerName of self.layers) {
        if (feature.getProperties().layer == layerName) {
          layer = feature.getProperties().layer;
          if (!self.features.has(layer)) {
            self.features.set(layer, new Map());
          }
          if (!tileFeatures.has(layer)) {
            tileFeatures.set(layer, []);
          }
          if (!self.features.get(layer).has(feature.ol_uid)) {
            self.features.get(layer).set(feature.ol_uid, feature);
            tileFeatures.get(layer).push(feature);
          }
        }
      }
    }
    tileFeatures.forEach((value, key) => {
      self.threeViewer.addFeatures(
        value,
        self.olViewer.map.getView().getCenter(),
        ZOOM_RES_L93[self.olViewer.map.getView().getZoom()],
        key,
        self.renderMode
      );
    });

    self.state.loading--;
    if (self.state.loading == 0) {
      this.olViewer.layer.getSource().on("tileloadend", evt => {
        self.state.loading--;
      });
    }
  }
}
