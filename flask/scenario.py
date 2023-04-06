# -*- coding: utf-8 -*-
"""
Created on Wed Mar 29 11:49:01 2023
@author: wanti
"""

from flask import Flask, jsonify
import os


app = Flask(__name__)

@app.route('/arboresance')
def arboresance():
    cwd = os.getcwd()
    data = os.listdir( cwd +'/data')
    dico = {}
    for i in range (len(data)):
        dico[i] = data[i]

    response = jsonify(dico)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run()