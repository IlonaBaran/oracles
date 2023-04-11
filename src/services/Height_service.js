/* eslint-disable */
import * as GeoTIFF from 'geotiff';
import { FileSource, THREE, Style, proj4, Extent, FeatureGeometryLayer, Coordinates, GlobeView, WMTSSource, WMSSource, ColorLayer, ElevationLayer, Copy, As } from "../../node_modules/itowns/dist/itowns";

export async function getHeightMesh(url) {
    return new Promise((resolve, reject) => {
        // Adding Geotiff of water heights (the localhost link is due to the use of http-server)
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = 'arraybuffer';
        xhr.onload = async function (e) {

            var buffer = await xhr.response;
            //Creating an image from the http response
            const tiff = await GeoTIFF.fromArrayBuffer(buffer);
            const image = await tiff.getImage();

            //Getting metadata and data from the image
            const bbox = await image.getBoundingBox();
            const width = await image.getWidth();
            const height = await image.getHeight();
            const data = await image.readRasters();

            /*     function flipElev(data) {
                  let maxElev = Math.max(data);
                  return data.map(elev => maxElev - elev);
                }
          
                const data2 = flipElev(data[0]);
          
                console.log(data2, data)
           */

            const Xo = bbox[0];
            const Xf = bbox[2];
            const Yo = bbox[1];
            const Yf = bbox[3];

            //Calculating the pixel size
            const Xsize = (Xf - Xo) / width;
            const Ysize = -(Yf - Yo) / height;

            //Specifying the origin of the image
            const origin = [Xo, Yf];
            let coord3 = new Coordinates('EPSG:2154', origin[0], origin[1]);

            //Creating the THREEJs Geometry
            let geometry = new THREE.BufferGeometry();

            const vertices = [];
            const indices = [];

            //Creating the indices table by pushing two triangles for each pixel

            for (let j = 0; j < width - 1; j++) {
                for (let i = 0; i < height - 1; i++) {

                    let topL = [(1 / width) * (j), 1 - (1 / height) * (i)];
                    let topR = [(1 / width) * (j), 1 - (1 / height) * (i + 1)];
                    let botL = [(1 / width) * (j + 1), 1 - (1 / height) * (i)];
                    let botR = [(1 / width) * (j + 1), 1 - (1 / height) * (i + 1)];

                    indices.push(topL);
                    indices.push(botL);
                    indices.push(topR);

                    indices.push(botL);
                    indices.push(topR);
                    indices.push(botR);

                };
            };

            function minuszero(value) {
                if (value <= 0) {
                    return -2
                } else {
                    return value
                }

            }
            //Creating the vertices table, pushing the coordinates 
            //and the height data extracted from the image

            for (let i = 0; i < width - 1; i++) {
                for (let j = 0; j < height - 1; j++) {

                    vertices.push(i * Xsize, j * Ysize, minuszero(data[0][i + j * width])), // top left
                        vertices.push((i + 1) * Xsize, j * Ysize, minuszero(data[0][(i + 1) + j * width])), // top right
                        vertices.push(i * Xsize, (j + 1) * Ysize, minuszero(data[0][i + (j + 1) * width])), // bottom left

                        vertices.push(i * Xsize, (j + 1) * Ysize, minuszero(data[0][i + (j + 1) * width])), // bottom left
                        vertices.push((i + 1) * Xsize, j * Ysize, minuszero(data[0][(i + 1) + j * width])), // top right
                        vertices.push((i + 1) * Xsize, (j + 1) * Ysize, minuszero(data[0][(i + 1) + (j + 1) * width]) // bottom right
                        );
                };
            };

            //Setting attributes to the geometry
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
            geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(indices), 3));


            // create material
            const material = new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0.8,
                color: 0xE0FFFF,
                side: THREE.DoubleSide
            });

            let mesh = new THREE.Mesh(geometry, material);
            //coord3.altitude = + 100;

            mesh.position.copy(coord3.as('EPSG:4978'));
            mesh.lookAt(new THREE.Vector3(0, 0, 0));
            mesh.rotateY(Math.PI);
            mesh.updateMatrixWorld();

            // Return the mesh
            resolve(mesh);
        };
        xhr.onerror = reject;
        xhr.send();
    });
}
