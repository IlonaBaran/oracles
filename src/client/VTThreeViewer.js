import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ZOOM_RES_L93 } from "./Utils";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils";

export const mergedRender = "Merged";
export const singleRender = "Single";

export class VTThreeViewer {

  constructor(
    width,
    height,
    backgroundColor,
    zoomEnabled,
    mapCenter,
    zoomFactor
  ) {
    this.width = width;
    this.height = height;
    this.zoomEnabled = zoomEnabled;
    this.mapCenter = mapCenter;
    this.zoomFactor = zoomFactor;
    this.planes = new THREE.Group();
    this.rayCaster = new THREE.Raycaster();
    this.featuresGroup = new Map();
    this.animate = this.animate.bind(this);
    this.doubleClick = this.doubleClick.bind(this);
    this.initThree(backgroundColor);
    this.addHemisphereLights2();
  }

  initThree(backgroundColor) {

    //create a renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.position = "absolute";
    this.renderer.domElement.style.top = "0px";

    //create a scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(backgroundColor);

    var depht_s = Math.tan(((45 / 2.0) * Math.PI) / 180.0) * 2.0;
    let z = this.height / depht_s;


    //create camera : 
    // orthographic camera <=> object's size is constsregardless of its distance from the camera
    this.orthoCamera = new THREE.OrthographicCamera(
      this.width / -2,
      this.width / 2,
      this.height / 2,
      this.height / -2,
      1,
      1000
    );
    this.orthoCamera.position.set(0, 0, z);


    //create camera : perspective camera <=> human eyes
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      10,
      1000000
    );
    this.perspectiveCamera.up.set(0, 0, 1);
    this.perspectiveCamera.position.set(0, 0, z);

    //create controls 
    this.controls = new OrbitControls(
      this.perspectiveCamera,
      this.renderer.domElement
    );
    if (!this.zoomEnabled) {
      this.controls.enableZoom = false;
    }
    this.controls.maxPolarAngle = Math.PI / 2;
    //this.controls.enabled = false;

    var geometry = new THREE.PlaneBufferGeometry(
      this.width * 2,
      this.height * 2,
      100
    );

    var testmaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide
    });

    var material = new THREE.MeshBasicMaterial({
      transparent: true
      //color: 0xffff00
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, -0.1);

    this.planes.add(plane);
    this.scene.add(this.planes);

    this.currentCamera = this.perspectiveCamera;


    this.renderer.domElement.addEventListener(
      "dblclick",
      this.doubleClick,
      false
    );
    this.animate();
  }

  animate() {
    this.renderer.render(this.scene, this.currentCamera);
  }

  enableOrbitControls() {
    this.controls.enabled = true;
  }

  disableOrbitControls() {
    this.controls.enabled = false;
  }

  setPlaneTexture(canvas) {
    var texture = new THREE.CanvasTexture(canvas);
    let plane = this.planes.children[0];
    plane.material.map = texture;
    plane.material.map.anisotropy = 0;
    plane.material.map.magFilter = THREE.LinearFilter;
    plane.material.map.minFilter = THREE.LinearFilter;
    plane.material.needsUpdate = true;
  }

  addTestBox(coords, width, height, depth) {
    let x = (coords[0] - this.mapCenter[0]) / this.zoomFactor;
    let y = (coords[1] - this.mapCenter[1]) / this.zoomFactor;
    var geometry = new THREE.BoxBufferGeometry(width, height, depth);
    var material = new THREE.MeshStandardMaterial({ color: 0xff4500 });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = 0;
    this.scene.add(cube);
    return cube;
  }

  //transforms webmercator coords into three "world" coords
  getWorldCoords(coords) {
    let x = (coords[0] - this.mapCenter[0]) / this.zoomFactor;
    let y = (coords[1] - this.mapCenter[1]) / this.zoomFactor;
    return [x, y];
  }

  addFeatures(features, mapCenter, zoomFactor, layer, renderMode) {
    this.mapCenter = mapCenter;
    this.zoomFactor = zoomFactor;
    let material = new THREE.MeshStandardMaterial({
      color: 0xf1ecdb,
      flatShading: true,
      side: THREE.DoubleSide
    });
    var extrudeSettings = {
      steps: 2,
      depth: 1,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1
    };
    if (!this.featuresGroup.has(layer)) {
      this.featuresGroup.set(layer, new THREE.Group());
      this.scene.add(this.featuresGroup.get(layer));
    }
    if (renderMode == mergedRender) {
      let geometries = [];
      for (let feature of features) {
        geometries.push(
          this.createGeometryForMergedMesh(
            feature,
            mapCenter,
            zoomFactor,
            extrudeSettings
          )
        );
        // }
      }
      const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
        geometries,
        false
      );
      const mesh = new THREE.Mesh(mergedGeometry, material);
      if (mesh != null) {
        this.featuresGroup.get(layer).add(mesh);
      }
    } else if (renderMode == singleRender) {
      for (let feature of features) {
        this.addFeature(feature, layer, mapCenter, zoomFactor);
      }
    }
  }

  createGeometryForMergedMesh(feature, mapCenter, zoomFactor, extrudeSettings) {
    let coords = feature.getGeometry().getCoordinates()[0];
    let points = [];

    for (let coordinate of coords) {
      let x = (coordinate[0] - mapCenter[0]) / zoomFactor;
      let y = (coordinate[1] - mapCenter[1]) / zoomFactor;
      points.push(new THREE.Vector2(x, y));
    }
    let threeShape = new THREE.Shape(points);
    for (let j = 1; j < feature.getGeometry().getCoordinates().length; j++) {
      let holeCoords = [];
      for (let coordinate of feature.getGeometry().getCoordinates()[j]) {
        let x = (coordinate[0] - mapCenter[0]) / zoomFactor;
        let y = (coordinate[1] - mapCenter[1]) / zoomFactor;
        holeCoords.push(new THREE.Vector2(x, y));
      }
      let holeShape = new THREE.Shape(holeCoords);
      threeShape.holes.push(holeShape);
    }

    var shapegeometry = new THREE.ExtrudeBufferGeometry(threeShape, {
      ...extrudeSettings,
      depth:
        feature.getProperties().hauteur != undefined
          ? feature.getProperties().hauteur / zoomFactor
          : 0
    });
    return shapegeometry;
  }

  addFeature(feature, layer, mapCenter, zoomFactor) {
    let material = new THREE.MeshStandardMaterial({
      color: 0xf1ecdb,
      flatShading: true,
      side: THREE.DoubleSide
    });
    var extrudeSettings = {
      steps: 2,
      depth: 1,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1
    };
    let coords = feature.getGeometry().getCoordinates()[0];
    let points = [];

    for (let coordinate of coords) {
      let x = (coordinate[0] - mapCenter[0]) / zoomFactor;
      let y = (coordinate[1] - mapCenter[1]) / zoomFactor;
      points.push(new THREE.Vector2(x, y));
    }
    let threeShape = new THREE.Shape(points);
    for (let j = 1; j < feature.getGeometry().getCoordinates().length; j++) {
      let holeCoords = [];
      for (let coordinate of feature.getGeometry().getCoordinates()[j]) {
        let x = (coordinate[0] - mapCenter[0]) / zoomFactor;
        let y = (coordinate[1] - mapCenter[1]) / zoomFactor;
        holeCoords.push(new THREE.Vector2(x, y));
      }
      let holeShape = new THREE.Shape(holeCoords);
      threeShape.holes.push(holeShape);
    }

    var shapegeometry = new THREE.ExtrudeBufferGeometry(
      threeShape,
      extrudeSettings
    );
    shapegeometry.computeBoundingBox();
    var center = new THREE.Vector3();
    shapegeometry.boundingBox.getCenter(center);
    shapegeometry.center();

    shapegeometry.translate(0, 0, 0.5);
    shapegeometry.verticesNeedUpdate = true;
    var mesh = new THREE.Mesh(shapegeometry, material);
    mesh.position.copy(center);
    mesh.scale.set(1, 1, feature.getProperties().hauteur / zoomFactor);
    this.featuresGroup.get(layer).add(mesh);
  }

  addHemisphereLights2() {
    var light = new THREE.HemisphereLight(0xf1ecdb, 0x777788, 1);
    light.position.set(5, 7.5, 10);
    this.scene.add(light);

    var floorGeometry = new THREE.PlaneBufferGeometry(1000, 1000, 10, 10);

    var groundMat = new THREE.MeshLambertMaterial({ color: 0x808080 });
    var floor = new THREE.Mesh(floorGeometry, groundMat);
    floor.position.set(0, 0, 0);
  }

  doubleClick(event) {
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1;
    let self = this;
    this.rayCaster.setFromCamera(new THREE.Vector2(x, y), this.currentCamera);
    var intersects = this.rayCaster.intersectObjects(this.planes.children);
    console.log(intersects);
    console.log(
      "point",
      intersects[0].point.x * this.zoomFactor + this.mapCenter[0],
      " ",
      intersects[0].point.y * this.zoomFactor + this.mapCenter[1]
    );
  }
}
