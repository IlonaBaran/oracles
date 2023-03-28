# Code permettant de convertir un fichier .dat en .csv et un fichier .csv en .json

import string
import csv
import json
import os
import shutil

def datToCsv(nameFileDat, nameFileCsv):
    
    fileDat = open(nameFileDat, "r")
    fileCsv = open(nameFileCsv, "w")

    lines=fileDat.readlines()
    addColumn = False
    columns = ['Id']
    id = 1

    for line in lines:
    
        info=line.split()
        if(info):
        
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
    with open(csvFilePath, encoding='utf-8', errors='ignore') as csvf:
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


def datToJsonFolder(folderName, outputFolder):
    for filename in os.listdir(folderName):
        with open(os.path.join(folderName, filename), 'r') as f: # ouverture des fichiers en mode lecture
            
            # Création du nom du fichier .json
            new = filename.split('.')
            new[-1] = 'json'
            
            # Création du fichier .json
            os.chdir(folderName)
            datToJson(filename,'.'.join(new))
         
            # Copie du fichier .json dans le fichier de sortie
            path = os.getcwd()
            os.chdir(os.path.abspath(os.path.join(os.getcwd(), os.pardir)))
            shutil.copyfile(folderName+'\\'+'.'.join(new), outputFolder +'\\' +'.'.join(new))

            #Suppresion du fichier .json présent dans le dossier des fichiers .dat
            os.remove(folderName+'\\'+'.'.join(new))

def extractDataFolder(folderName,outputFolder):
    for filename in os.listdir(folderName):
        new = [filename+".dat"]
        shutil.copyfile(folderName+'\\' +filename +"\IN_OUT\INPUT\Xt.dat", outputFolder +'\\' +''.join(new))

#### Main
  
# datToCsv("data.dat","test.csv")
# csvToJson("test.csv","test.json" )

# datToJson("data.dat", "testBis.json")


extractDataFolder("Data","XtData")


#Convertit tout les fichiers présent dans le dossier datData en .json
datToJsonFolder('XtData','jsonData')