/* eslint-disable */
import "regenerator-runtime/runtime";
import * as THREE from "three";
import Feature from "ol/Feature";
import { VTController } from "./VTController";
import { mergedRender, singleRender } from "./VTThreeViewer";
import { planStyle, grisStyle, muetStyle } from "./OLViewer";
import proj4 from "proj4";
import { proj4326, proj3857 } from "./Utils";



//data can be imported like this or read from the data folder
import * as geotiff from "geotiff";

const width = window.innerWidth; // this makes the 3D canvas full screen
const height = window.innerHeight; // this makes the 3D canvas full screen

let gavreLatLon = [47.6942671, -3.35];
let gavreCenter = proj4(proj4326, proj3857, [gavreLatLon[1], gavreLatLon[0]]);

const paramsGavre = {
  center: gavreCenter,
  zoom: 16,
  layers: ["bati_surf", "bati_zai"],
  style: planStyle
};

let params = paramsGavre;
let controller = null;

export async function gavre() {
  // to read tiff file: https://geotiffjs.github.io/geotiff.js/. other files to be read should be added to the data folder
  // let tiffData = await geotiff.fromUrl("Hauteurs.tif");

  controller = new VTController(
    width,
    height,
    params.center, //center coordinates in webmercator
    params.zoom, //zoom level
    params.layers, //layers to be rendered as 3D features
    mergedRender, //render type, merged render more efficient but does not provide access to each feature
    params.style, //style for the tiles
    false
  );

  //addObjects();
}

function addObjects() {
  //example to add an object to the scene
  let worldCoords = controller.threeViewer.getWorldCoords(gavreCenter); // the getWorldCoords function transform webmercator coordinates into three js world coordinates
  var geometry = new THREE.BoxBufferGeometry(100, 100, 100);
  var material = new THREE.MeshStandardMaterial({ color: 0xff4500 });
  var cube = new THREE.Mesh(geometry, material); //a three js mesh needs a geometry and a material
  cube.position.x = worldCoords[0];
  cube.position.y = worldCoords[1];
  cube.position.z = 0;
  controller.threeViewer.scene.add(cube); //all objects have to be added to the threejs scene
}

