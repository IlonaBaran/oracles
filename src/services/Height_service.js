/* eslint-disable */
import * as GeoTIFF from 'geotiff';
import { THREE, Coordinates } from "../../node_modules/itowns/dist/itowns";

/**
 * Function used to get tiff image from a tif url
 * @param {string} url string of url
 */
export async function getImage(url) {
    return new Promise((resolve, reject) => {
        //Fetching the mage from a url (In this case it will be a localhost url due to the use of http-server)
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        //Setting the response as an arraybuffer to use it with the GEOTIFF library
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

/**
 * Function to extract Float32Array of data from a geotiff image
 * @param {list} listOfImages list of image objets
 */
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

/**
 * Function used to calculate the average heights from the different scenarios selected
 * @param {Array} lists Array of data from all selected scenarios
 */
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

/**
 * Function used to calculate the minimum heights from the different scenarios selected
 * @param {Array} lists Array of data from all selected scenarios
 */
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

/**
 * Function used to calculate the maximum heights from the different scenarios selected
 * @param {Array} lists Array of data from all selected scenarios
 */
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

/**
 * //Function used to calculate the rgb color for each vertex based on the heiht
 * @param {float} x Height at a certain point of the array
 * @param {Array} colors Array with rgb colors represented as percentage
 * @param {float} min Minimum height of the scenario
 * @param {float} max Maximum height of the scenario
 */
function rgbcolors(x, colors, min, max) {
    //Setting the breakpoints, in this case starting at min, 20%, 40%, 60%, 80% and finally max
    const breakpoints = [
        0,
        max * 0.20,
        max * 0.40,
        max * 0.60,
        max * 0.80,
        max
    ];
    //The lookup table refers to the corresponding color to each one of the breakpoints defined above, [R,G,B] values
    const lookupTable = [
        [0.81, 0.90, 1],
        [0.16, 0.61, 0.95],
        [0.09, 0.48, 0.80],
        [0.01, 0.14, 0.29],
        [0.00, 0.00, 0.54]
    ];
    //Searching the index that corresponds to the height selected
    const index = breakpoints.findIndex(b => x <= b);
    //Ppushing the corresponding color to the height
    if (x < min || x > max || x == 0) {
        colors.push(0, 0, 0);
    } else {
        colors.push(...lookupTable[index - 1]);
    }
}

/**
 * Function that creates a 3d mesh taking as input a tiff image from a screnario and the digital surface model
 * @param {Image} image geotiff Image format retrieve from the getData() function
 */
export async function getHeightMesh(image) {
    let urlmns = 'http://localhost:8080/MNS_GAVRES.tif';
    const imagemns = await getImage(urlmns);
    const mnsdata = await imagemns.readRasters();

    //Getting metadata and data from the image
    const bbox = await image.getBoundingBox();
    const width = await image.getWidth();
    const height = await image.getHeight();
    const data = await image.readRasters();

    let dataArray = await Array.from(data[0]); // Convert Float32Array to a regular array
    dataArray.sort((a, b) => a - b); // Sort the regular array in ascending order
    let sortedData = await new Float32Array(dataArray); // Convert the sorted regular array back to a Float32Array
    let lenghtdata = sortedData.length

    let min = Math.round(sortedData[0]);
    let max = Math.round(sortedData[lenghtdata - 1]);

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
    const colors = [];


    //Creating the vertices table, pushing the coordinates and the height data extracted from the image
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

            //Creating the vertices table, pushing the coordinates and the height data extracted from the image
            vertices.push(i * Xsize, j * Ysize, minuszero(data[0][i + j * width], mnsdata[0][i + j * width])); // top left
            vertices.push((i + 1) * Xsize, j * Ysize, minuszero(data[0][(i + 1) + j * width], mnsdata[0][(i + 1) + j * width])); // top right
            vertices.push(i * Xsize, (j + 1) * Ysize, minuszero(data[0][i + (j + 1) * width], mnsdata[0][i + (j + 1) * width])); // bottom left

            vertices.push(i * Xsize, (j + 1) * Ysize, minuszero(data[0][i + (j + 1) * width], mnsdata[0][i + (j + 1) * width])); // bottom left
            vertices.push((i + 1) * Xsize, j * Ysize, minuszero(data[0][(i + 1) + j * width], mnsdata[0][(i + 1) + j * width])); // top right
            vertices.push((i + 1) * Xsize, (j + 1) * Ysize, minuszero(data[0][(i + 1) + (j + 1) * width], mnsdata[0][(i + 1) + (j + 1) * width])); // bottom right

            rgbcolors(data[0][i + j * width], colors, min, max); // top left
            rgbcolors(data[0][(i + 1) + j * width], colors, min, max);// top right
            rgbcolors(data[0][i + (j + 1) * width], colors, min, max);// bottom left

            rgbcolors(data[0][i + (j + 1) * width], colors, min, max);// bottom left
            rgbcolors(data[0][(i + 1) + j * width], colors, min, max);// top right
            rgbcolors(data[0][(i + 1) + (j + 1) * width], colors, min, max);// bottom right
        };

    };

    //Setting attributes to the geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(indices), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    // create material
    const material = new THREE.MeshBasicMaterial({
        transparent: true,
        vertexColors: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    });

    let mesh = new THREE.Mesh(geometry, material);
    //coord3.altitude += 3;
    mesh.position.copy(coord3.as('EPSG:2154'));
    mesh.updateMatrixWorld();

    return mesh;
}

/**
 * Function that creates a 3d mesh taking as input the data resulting from the statistics functions used when selecting several scenarios
 * @param {Array} bbox xmin, ymin, xmax and ymax coordinates
 * @param {int} width width of image data
 * @param {int} height height of image data
 * @param {Array} data data values from image, or computed from several scenarios
 */
export async function getHeightFromScenarios(bbox, width, height, data) {
    let urlmns = 'http://localhost:8080/MNS_GAVRES.tif';
    const imagemns = await getImage(urlmns);
    const mnsdata = await imagemns.readRasters();

    const Xo = bbox[0];
    const Xf = bbox[2];
    const Yo = bbox[1];
    const Yf = bbox[3];

    let dataArray = await Array.from(data[0]); // Convert Float32Array to a regular array
    dataArray.sort((a, b) => a - b); // Sort the regular array in ascending order
    let sortedData = await new Float32Array(dataArray); // Convert the sorted regular array back to a Float32Array
    let lenghtdata = sortedData.length

    let min = Math.round(sortedData[0]);
    let max = Math.round(sortedData[lenghtdata - 1]);

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
    const colors = [];

    //Creating the vertices table, pushing the coordinates and the height data extracted from the image
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

            //Creating the vertices table, pushing the coordinates and the height data extracted from the image

            vertices.push(i * Xsize, j * Ysize, minuszero(data[0][i + j * width], mnsdata[0][i + j * width])); // top left
            vertices.push((i + 1) * Xsize, j * Ysize, minuszero(data[0][(i + 1) + j * width], mnsdata[0][(i + 1) + j * width])); // top right
            vertices.push(i * Xsize, (j + 1) * Ysize, minuszero(data[0][i + (j + 1) * width], mnsdata[0][i + (j + 1) * width])); // bottom left

            vertices.push(i * Xsize, (j + 1) * Ysize, minuszero(data[0][i + (j + 1) * width], mnsdata[0][i + (j + 1) * width])); // bottom left
            vertices.push((i + 1) * Xsize, j * Ysize, minuszero(data[0][(i + 1) + j * width], mnsdata[0][(i + 1) + j * width])); // top right
            vertices.push((i + 1) * Xsize, (j + 1) * Ysize, minuszero(data[0][(i + 1) + (j + 1) * width], mnsdata[0][(i + 1) + (j + 1) * width])); // bottom right

            rgbcolors(data[0][i + j * width], colors, min, max); // top left
            rgbcolors(data[0][(i + 1) + j * width], colors, min, max);// top right
            rgbcolors(data[0][i + (j + 1) * width], colors, min, max);// bottom left

            rgbcolors(data[0][i + (j + 1) * width], colors, min, max);// bottom left
            rgbcolors(data[0][(i + 1) + j * width], colors, min, max);// top right
            rgbcolors(data[0][(i + 1) + (j + 1) * width], colors, min, max);// bottom right
        };
    };

    //Setting attributes to the geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(indices), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    // create material
    const material = new THREE.MeshBasicMaterial({
        transparent: true,
        vertexColors: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    });

    let mesh = new THREE.Mesh(geometry, material);
    //coord3.altitude += 3;
    mesh.position.copy(coord3.as('EPSG:2154'));
    mesh.updateMatrixWorld();

    return mesh;
}

/**
 * //Function used to create a list of files used when selecting more than one scenario, creating either hmax or hfin depending on user's selection
 * @param {Array} heightMapList list des scenarios selectionnés
 * @param {string} height The type of height chosen to represent ( hmax or hfin )
 */
export function concatenateHeightMapList(heightMapList, height) {
    let concatenatedList = [];

    for (let i = 0; i < heightMapList.length; i++) {
        let concatenated = "http://localhost:8080/output_rasters_clipped/" /* + heightMapList[i].name + "/" */ + heightMapList[i].name + "_" + height + ".tif";
        concatenatedList.push(concatenated);
    }
    return concatenatedList;
}


/**
 * Function that sends the value under the surface, thus making it invisible, if its height is equal to 0 or superior to the highest point on earth
 * @param {float} valuescenario data value
 * @param {float} valuemns mns value
 */
function minuszero(valuescenario, valuemns) {
    let valueh = valuescenario + valuemns;
    let valuehfixed = valueh - 3;
    if (valuescenario <= 0) {
        return -10
    } else if (valuescenario > 8848) {
        return -10
    } else {
        if ((valuemns - valuescenario) > 4) {
            return valuehfixed
        } else {
            return valueh
        }
    }
}