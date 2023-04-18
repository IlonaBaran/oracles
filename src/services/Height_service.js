/* eslint-disable */
import * as GeoTIFF from 'geotiff';
import { FileSource, THREE, Style, proj4, Extent, FeatureGeometryLayer, Coordinates, GlobeView, WMTSSource, WMSSource, ColorLayer, ElevationLayer, Copy, As } from "../../node_modules/itowns/dist/itowns";
import { async } from 'regenerator-runtime';


export async function getImage(url) {
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
            // Return the image
            resolve(image);
        }
        xhr.onerror = reject;
        xhr.send();

    })
}

export async function getData(listOfImages) {

    let datas = []

    const bbox = await listOfImages[0].getBoundingBox();
    const width = await listOfImages[0].getWidth();
    const height = await listOfImages[0].getHeight();

    for (let i = 0; i < listOfImages.length; i++) {
        //Getting metadata and data from the image
        const data = await listOfImages[i].readRasters();
        datas.push(data[0]);
    }

    let scenarios = {
        bbox: bbox,
        width: width,
        height: height,
        datas: datas
    }

    return scenarios;
}

export function averageLists(lists) {
    const numLists = lists.length;
    const listLength = lists[0].length;

    // Check that all lists have the sa>me length
    if (!lists.every(list => list.length === listLength)) {
        throw new Error('averageLists: all lists must have the same length');
    }

    const sums = new Float32Array(listLength).fill(0);

    for (let i = 0; i < listLength; i++) {
        for (let j = 0; j < numLists; j++) {
            const value = lists[j][i];
            if (!isNaN(value)) {
                sums[i] += value;
            }
        }
    }

    return sums.map(sum => sum / numLists);
}

export function minLists(lists) {
    const listLength = lists[0].length;
    const mins = new Float32Array(listLength).fill(Number.MAX_SAFE_INTEGER);
    return lists.reduce((mins, list) => {
        for (let i = 0; i < listLength; i++) {
            mins[i] = Math.min(mins[i], list[i]);
        }
        return mins;
    }, mins);
}

export function maxLists(lists) {
    const listLength = lists[0].length;
    const maxes = new Float32Array(listLength).fill(Number.MIN_SAFE_INTEGER);
    return lists.reduce((maxes, list) => {
        for (let i = 0; i < listLength; i++) {
            maxes[i] = Math.max(maxes[i], list[i]);
        }
        return maxes;
    }, maxes);
}

export async function getHeightMesh(image) {

    //Getting metadata and data from the image
    const bbox = await image.getBoundingBox();
    const width = await image.getWidth();
    const height = await image.getHeight();
    const data = await image.readRasters();

    console.log('image read Raster', data)

    const Xo = bbox[0];
    const Xf = bbox[2];
    const Yo = bbox[1];
    const Yf = bbox[3];

    //Calculating the pixel size
    let Xsize = (Xf - Xo) / width;
    let Ysize = -(Yf - Yo) / height;


    //Specifying the origin of the image
    const origin = [Xo, Yf];
    let coord3 = new Coordinates('EPSG:2154', origin[0], origin[1]);

    //Creating the THREEJs Geometry
    let geometry = new THREE.BufferGeometry();

    const vertices = [];
    const indices = [];

    function minuszero(value) {
        if (value <= 0) {
            return -2
        } else if (value > 8848) {
            return -2
        } else {
            return value
        }

    }
    //Creating the vertices table, pushing the coordinates 
    //and the height data extracted from the image

    for (let i = 0; i < width - 1; i++) {
        for (let j = 0; j < height - 1; j++) {

            //Creating the indices table by pushing two triangles for each pixel
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

            //Creating the vertices table, pushing the coordinates 
            //and the height data extracted from the image

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


    console.log(vertices)


    // create material
    const material = new THREE.MeshBasicMaterial({
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        color: 0x0000FF,
        side: THREE.DoubleSide
    });

    let mesh = new THREE.Mesh(geometry, material);
    coord3.altitude += 5;
    mesh.position.copy(coord3.as('EPSG:2154'));
    mesh.updateMatrixWorld();

    return mesh;
}

export async function getHeightFromScenarios(bbox, width, height, data) {

    const Xo = bbox[0];
    const Xf = bbox[2];
    const Yo = bbox[1];
    const Yf = bbox[3];

    //Calculating the pixel size
    let Xsize = (Xf - Xo) / width;
    let Ysize = -(Yf - Yo) / height;


    //Specifying the origin of the image
    const origin = [Xo, Yf];
    let coord3 = new Coordinates('EPSG:2154', origin[0], origin[1]);

    //Creating the THREEJs Geometry
    let geometry = new THREE.BufferGeometry();

    const vertices = [];
    const indices = [];

    function minuszero(value) {
        if (value <= 0) {
            return -2
        } else if (value > 8848) {
            return -2
        } else {
            return value
        }

    }
    //Creating the vertices table, pushing the coordinates 
    //and the height data extracted from the image

    for (let i = 0; i < width - 1; i++) {
        for (let j = 0; j < height - 1; j++) {

            //Creating the indices table by pushing two triangles for each pixel
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

            //Creating the vertices table, pushing the coordinates 
            //and the height data extracted from the image

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
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        color: 0x0000FF,
        side: THREE.DoubleSide
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(coord3.as('EPSG:2154'));
    mesh.updateMatrixWorld();

    return mesh;
}

export function concatenateHeightMapList(heightMapList) {
    let concatenatedList = [];

    for (let i = 0; i < heightMapList.length; i++) {
        let concatenated = "http://localhost:8080/output_rasters/" + heightMapList[i].name + "/" + heightMapList[i].name + "_hmax.tif";
        concatenatedList.push(concatenated);
    }

    return concatenatedList;
}


