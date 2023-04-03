# -*- coding: utf-8 -*-
"""
Created on Wed Mar 29 11:49:01 2023
@author: wanti
"""

from flask import Flask, jsonify, request
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

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


@app.route('/api/data', methods=['POST', 'GET'])
def heatmapV2F():
    # data = request.get_json()
    
    # print(data)
    # # print(data[0])
    # print(type(data))
    
    # data1 = data.copy()  # copie la liste dans une nouvelle case mémoire
    
    # result = {}

    # for state, capital in data1.items():
    #     print(state, " : ", capital)
    #     result[state] = capital
    
        
    # response = jsonify(result)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    # return response
    
    my_data = {}  # initialisation de la variable avec un dictionnaire vide

    if request.method == 'POST':
        data = request.get_json()
        data1 = data.copy()
        # traitement des données ici
        my_data = data1  # mise à jour de la variable avec data1
    
        response = jsonify({'status': 'ok', 'test': my_data})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    # if request.method == 'GET':
    #     response = jsonify(my_data)  # renvoie la variable my_data
    #     response.headers.add('Access-Control-Allow-Origin', '*')
    #     return response


    


# @app.route('/heatmap')
# def heatmapF2V():
#     dataFile = heatmapV2F()
    # for cle, valeur in dataFile.items():
    #    print("l'élément de clé", cle, "vaut", valeur)
    # print(dataFile)
    # print(type(dataFile))
    # return dataFile
    # response = jsonify(dataFile)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    # return response
    
    # response = jsonify(test)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    # return response


if __name__ == "__main__":
    app.run(debug=True)