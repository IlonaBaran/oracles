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
    dico = {}
    for i in range (len(data)):
        dico[i] = data[i]

    response = jsonify(dico)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run()