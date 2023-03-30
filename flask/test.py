# -*- coding: utf-8 -*-
"""
Created on Wed Mar 29 11:49:01 2023

@author: wanti
"""

from flask import Flask, jsonify
import os


app = Flask(__name__)


@app.route('/test')
def index():
    data = {'message': 'Hello, World!'}
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/arboresance')
def arboresance():
    data = os.listdir('C:/Users/wanti/Downloads/oracles_data/donnees/BDD_Simu_2022_02_17/Data')
    chars = '"'

    L = "["
    for i in range(len(data) - 2):
        texte = "{name: '" + data[i] + "', code: '" + data[i] + "'},"
        # L.append(texte.translate(str.maketrans('', '', chars)))
        L += texte

    L += "{name:'" + data[-1] + ",code:" + data[-1] + "}]"
    
    response = jsonify(L)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run()
