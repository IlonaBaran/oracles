# Code permettant de convertir un fichier .dat en .csv et un fichier .csv en .json

import string
import csv
import json
import os

def datToCsv(nameFileDat, nameFileCsv):
    
    fileDat = open(nameFileDat, "r")
    fileCsv = open(nameFileCsv, "w")

    lines=fileDat.readlines()
    addColumn = False
    columns = ['Id']
    id = 1

    for line in lines:
    
        info=line.split()
        
        # Récupération des lignes qui sont des colonnes
        if(info[0] == "Column"):
            
            columns.append(''.join(info[2:]))          
        
        # Ajout de la ligne des colonnes
        elif(info[0] != "Column" and addColumn == False ):
            
            fileCsv.write(','.join(columns))
            addColumn = True
            
        # Ajout des lignes
        else:
            fileCsv.write('\n'+ str(id) + ','+ ','.join(info))
            id += 1

    fileDat.close()        
    fileCsv.close()
            


 
def csvToJson(csvFilePath, jsonFilePath):
    
  # create a dictionary
    data = {}
     
    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
         
        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
             
            # Assuming a column named 'No' to
            # be the primary key
            key = rows['Id']
            data[key] = rows
 
    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
 
def datToJson(datFilePath, jsonFilePath):
    
    datToCsv(datFilePath ,  "temp.csv" )
    csvToJson("temp.csv",jsonFilePath)
    os.remove("temp.csv")

#Besoin de faire en sorte que les nouveaux fichiers soient enregistrés dans le dossier correspondant
def datToJsonFolder(folderName):
    for filename in os.listdir(folderName):
        with open(os.path.join(folderName, filename), 'w') as f: 
            new = filename.split('.')
            new[-1] = 'json'
            print(filename)
            print('.'.join(new))
            datToJson(filename,'.'.join(new) )    
    
#### Main
  
# datToCsv("data.dat","test.csv")
# csvToJson("test.csv","test.json" )

datToJson("data.dat", "testBis.json")
