/* eslint-disable */
import * as GeoTIFF from 'geotiff';
import { THREE, Coordinates } from "../../node_modules/itowns/dist/itowns";

/**
 * Fonction utilisée pour obtenir une image tiff à partir d'une url
 * @param {string} url string de l'url
 */
export async function getImage(url) {
    return new Promise((resolve, reject) => {
        //Récupération de l'image à partir d'une url (dans ce cas, il s'agira d'une url localhost en raison de l'utilisation d'un serveur http).
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        //Définition de la réponse comme un tableau (arraybuffer) pour l'utiliser avec la bibliothèque GEOTIFF
        xhr.responseType = 'arraybuffer';
        xhr.onload = async function (e) {
            var buffer = await xhr.response;
            //Création d'une image à partir de la réponse http
            const tiff = await GeoTIFF.fromArrayBuffer(buffer);
            const image = await tiff.getImage();
            // Renvoi de l'image
            resolve(image);
        }
        xhr.onerror = reject;
        xhr.send();

    })
}

/**
 * Fonction permettant d'extraire des données Float32Array d'une image geotiff
 * @param {list} listOfImages listes des images objets
 */
export async function getData(listOfImages) {
    let datas = []
    const bbox = await listOfImages[0].getBoundingBox();
    const width = await listOfImages[0].getWidth();
    const height = await listOfImages[0].getHeight();

    for (let i = 0; i < listOfImages.length; i++) {
        //Obtenir des métadonnées et des données à partir de l'image
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
 * Fonction utilisée pour calculer les hauteurs moyennes des différents scénarios sélectionnés
 * @param {Array} lists Tableau de données de tous les scénarios sélectionnés
 */
export function averageLists(lists) {
    const numLists = lists.length;
    const listLength = lists[0].length;

    // Vérification que toutes les listes ont la même longueur
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
 * Fonction utilisée pour calculer les hauteurs minimales à partir des différents scénarios sélectionnés
 * @param {Array} lists Array de données de tous les scénarios sélectionnés
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
 * Fonction utilisée pour calculer les hauteurs maximales à partir des différents scénarios sélectionnés
 * @param {Array} lists Array de données de tous les scénarios sélectionnés
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
 * //Fonction utilisée pour calculer la couleur rgb de chaque sommet en fonction de la hauteur.
 * @param {float} x Hauteur à un certain point du tableau
 * @param {Array} colors Tableau avec les couleurs rgb représentées en pourcentage
 * @param {float} min Hauteur minimale du scénario
 * @param {float} max Hauteur maximale du scénario
 */
function rgbcolors(x, colors, min, max) {
    //Définition des points d'arrêt, dans ce cas en commençant par min, 20%, 40%, 60%, 80% et enfin max.
    const breakpoints = [
        0,
        max * 0.20,
        max * 0.40,
        max * 0.60,
        max * 0.80,
        max
    ];
    //La table de recherche renvoie à la couleur correspondant à chacun des points d'arrêt définis ci-dessus, les valeurs [R,G,B].
    const lookupTable = [
        [0.81, 0.90, 1],
        [0.16, 0.61, 0.95],
        [0.09, 0.48, 0.80],
        [0.01, 0.14, 0.29],
        [0.00, 0.00, 0.54]
    ];
    //Recherche de l'index correspondant à la hauteur sélectionnée
    const index = breakpoints.findIndex(b => x <= b);
    //Ajout de la couleur correspondante à la hauteur
    if (x < min || x > max || x == 0) {
        colors.push(0, 0, 0);
    } else {
        colors.push(...lookupTable[index - 1]);
    }
}

/**
 * Fonction qui crée un maillage 3D en prenant comme entrée une image tiff d'un scénario et le modèle numérique de surface.
 * @param {Image} image geotiff Format d'image récupéré par la fonction getData()
 */
export async function getHeightMesh(image) {
    let urlmns = 'http://localhost:8080/MNS_GAVRES.tif';
    const imagemns = await getImage(urlmns);
    const mnsdata = await imagemns.readRasters();

    //Obtenir des métadonnées et des données à partir de l'image
    const bbox = await image.getBoundingBox();
    const width = await image.getWidth();
    const height = await image.getHeight();
    const data = await image.readRasters();

    let dataArray = await Array.from(data[0]); // Convertir un tableau Float32Array en un array normal
    dataArray.sort((a, b) => a - b); // Trie de l'array par ordre croissant
    let sortedData = await new Float32Array(dataArray); // Convertir l'array trié en tableau Float32Array
    let lenghtdata = sortedData.length

    let min = Math.round(sortedData[0]);
    let max = Math.round(sortedData[lenghtdata - 1]);

    const Xo = bbox[0];
    const Xf = bbox[2];
    const Yo = bbox[1];
    const Yf = bbox[3];

    //Calcul de la taille des pixels
    let Xsize = (Xf - Xo) / width;
    let Ysize = -(Yf - Yo) / height;

    //Spécification l'origine de l'image
    const origin = [Xo, Yf];
    let coord3 = new Coordinates('EPSG:2154', origin[0], origin[1]);

    //Création de la géométrie THREEJs
    let geometry = new THREE.BufferGeometry();

    const vertices = [];
    const indices = [];
    const colors = [];


    //Création de la table des vertices, en ajoutant les coordonnées et les données de hauteur extraites de l'image
    for (let i = 0; i < width - 1; i++) {
        for (let j = 0; j < height - 1; j++) {

            //Création du tableau d'indices en ajoutant deux triangles pour chaque pixel
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

            rgbcolors(data[0][i + j * width], colors, min, max); // haut gauche
            rgbcolors(data[0][(i + 1) + j * width], colors, min, max);// haut droit
            rgbcolors(data[0][i + (j + 1) * width], colors, min, max);// bas gauche

            rgbcolors(data[0][i + (j + 1) * width], colors, min, max);// bas gauche
            rgbcolors(data[0][(i + 1) + j * width], colors, min, max);// haut right
            rgbcolors(data[0][(i + 1) + (j + 1) * width], colors, min, max);// bas right
        };

    };

    //Définition des attributs de la géométrie
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(indices), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    // creation du material
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
 * Fonction qui crée un mesh 3D en prenant comme entrée les données résultant des fonctions statistiques utilisées lors de la sélection de plusieurs scénarios.
 * @param {Array} bbox coordonnées xmin, ymin, xmax et ymax 
 * @param {int} width largeur de l'image data
 * @param {int} height hauteur de l'image data
 * @param {Array} data dValeurs des données de l'image ou calculées à partir de plusieurs scénarios
 */
export async function getHeightFromScenarios(bbox, width, height, data) {
    let urlmns = 'http://localhost:8080/MNS_GAVRES.tif';
    const imagemns = await getImage(urlmns);
    const mnsdata = await imagemns.readRasters();

    const Xo = bbox[0];
    const Xf = bbox[2];
    const Yo = bbox[1];
    const Yf = bbox[3];

    let dataArray = await Array.from(data[0]); //Conversion un tableau Float32Array en array
    dataArray.sort((a, b) => a - b); // Tri de l'array par ordre croissant
    let sortedData = await new Float32Array(dataArray); //Conversion d'un array en Float32Array 
    let lenghtdata = sortedData.length

    let min = Math.round(sortedData[0]);
    let max = Math.round(sortedData[lenghtdata - 1]);

    //Calcul de la taille des pixels
    let Xsize = (Xf - Xo) / width;
    let Ysize = -(Yf - Yo) / height;

    //Spécification de l'origine de l'image
    const origin = [Xo, Yf];
    let coord3 = new Coordinates('EPSG:2154', origin[0], origin[1]);

    //Création de la géométrie THREEJs
    let geometry = new THREE.BufferGeometry();

    const vertices = [];
    const indices = [];
    const colors = [];

    //Création de la table des vertices, en ajoutant les coordonnées et les données de hauteur extraites de l'image
    for (let i = 0; i < width - 1; i++) {
        for (let j = 0; j < height - 1; j++) {

            //Création du tableau d'indices en ajoutant deux triangles pour chaque pixel
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

            //Création de la table des vertices, en ajoutant les coordonnées et les données de hauteur extraites de l'image

            vertices.push(i * Xsize, j * Ysize, minuszero(data[0][i + j * width], mnsdata[0][i + j * width])); // top left
            vertices.push((i + 1) * Xsize, j * Ysize, minuszero(data[0][(i + 1) + j * width], mnsdata[0][(i + 1) + j * width])); // top right
            vertices.push(i * Xsize, (j + 1) * Ysize, minuszero(data[0][i + (j + 1) * width], mnsdata[0][i + (j + 1) * width])); // bottom left

            vertices.push(i * Xsize, (j + 1) * Ysize, minuszero(data[0][i + (j + 1) * width], mnsdata[0][i + (j + 1) * width])); // bottom left
            vertices.push((i + 1) * Xsize, j * Ysize, minuszero(data[0][(i + 1) + j * width], mnsdata[0][(i + 1) + j * width])); // top right
            vertices.push((i + 1) * Xsize, (j + 1) * Ysize, minuszero(data[0][(i + 1) + (j + 1) * width], mnsdata[0][(i + 1) + (j + 1) * width])); // bottom right

            rgbcolors(data[0][i + j * width], colors, min, max); // haut gauche
            rgbcolors(data[0][(i + 1) + j * width], colors, min, max);// haut droit
            rgbcolors(data[0][i + (j + 1) * width], colors, min, max);// bas gauche

            rgbcolors(data[0][i + (j + 1) * width], colors, min, max);// bas gauche
            rgbcolors(data[0][(i + 1) + j * width], colors, min, max);// haut droit
            rgbcolors(data[0][(i + 1) + (j + 1) * width], colors, min, max);// bas droit
        };
    };

    //Définition des attributs de la géométrie
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(indices), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    // Création du material
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
 * //Fonction utilisée pour créer une liste de fichiers utilisés lors de la sélection de plusieurs scénarios, créant soit hmax soit hfin en fonction de la sélection de l'utilisateur.
 * @param {Array} heightMapList list des scenarios selectionnés
 * @param {string} height Le type de hauteur choisi pour représenter ( hmax ou hfin )
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
 * Fonction qui envoie la valeur sous la surface, la rendant ainsi invisible, si sa hauteur est égale à 0 ou supérieure au point le plus haut de la terre.
 * @param {float} valuescenario valeur des données
 * @param {float} valuemns valeur du mns
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