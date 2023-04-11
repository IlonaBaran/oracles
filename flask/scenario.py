# -*- coding: utf-8 -*-
"""
Created on Wed Mar 29 11:49:01 2023
@author: wanti
"""

from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

import shutil
import csv
import os

# import numpy as np
# from osgeo import gdal

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
CORS(app, resources={r"C:/ProgIlo/projettsi/oracles/flask/*": {"origins": "*"}})

@app.route('/test')
def index():
    data = {'message': 'Hello, World!'}
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/arboresance')
def arboresance():
    data = os.listdir('C:/Users/wanti/Downloads/oracles_data/donnees/BDD_Simu_2022_02_17/Data')
    dico = {}
    for i in range (len(data)):
        dico[i] = data[i]

    response = jsonify(dico)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/api/data', methods=['POST'])
def heatmapV2F():
    data = request.get_json()
    
    with open('nombres.csv', 'w') as f:
        writer = csv.writer(f)
        for name, simu in data.items():
            dico_simu = {name : simu}
            writer.writerow(dico_simu) 
    f.close()
    
    # nom du nouveau fichier CSV
    new_csv_file = 'nombreCopy.csv'
    # copier le fichier original vers le nouveau fichier
    shutil.copy('nombres.csv', new_csv_file)
    
    response = jsonify({'message': 'Hello, World!'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    # créer une réponse avec le contenu du nouveau fichier
    with open(new_csv_file, 'rb') as f2:
        responseCopy = make_response(f2.read())
        # ajouter l'en-tête Access-Control-Allow-Origin à la réponse
        responseCopy.headers.set('Access-Control-Allow-Origin', '*')
    f2.close()
    
    return response
    

# @app.route('/api/datatraiteesG3')
# def test3():
#     L = []
#     with open('C:/ProgIlo/projettsi/oracles/flask/nombres.csv', 'r') as f :
#         myReader = csv.reader(f)
#         for row in myReader:
#             if len(row) != 0 : 
#                 # data[row[0]] = row[0]
#                 L.append(row[0])
                
#     dataReturn = {"donnees" : moyenneTif(L)}
            
#     response = jsonify(dataReturn)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response



if __name__ == "__main__":
    app.run(debug=True)