from scipy.io import loadmat
import numpy
import os

import arcpy
from arcpy.sa import *


dir_path = r'C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\Data'

list_raster_hmax = []
for path in os.listdir(dir_path):
    # check if current path is a file
    
    if os.path.isfile(os.path.join(dir_path, path)):
        pass
    else:
        if path != 'S_1448':
            print(path)
            matfile_hmax = loadmat(r'C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\Data\{0}\IN_OUT\OUTPUT\hmax_land.mat'.format(path))
            matfile_hfin = loadmat(r'C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\Data\{0}\IN_OUT\OUTPUT\hfin_land.mat'.format(path))
            #matfile_X = loadmat(r'C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\Data\{0}\IN_OUT\INPUT\X.mat'.format(path))
            
            #print(matfile_X)
            
            hmax_list = [[element for element in upperElement] for upperElement in matfile_hmax['hmax_land']]
            hfin_list = [[element for element in upperElement] for upperElement in matfile_hfin['hfin_land']]
            #X_list = [[element for element in upperElement] for upperElement in matfile_X['X_land']]
            
            np_array_hmax = numpy.array(hmax_list)
            np_array_hmax = numpy.flipud(np_array_hmax)
            np_array_hfin = numpy.array(hfin_list)
            np_array_hfin = numpy.flipud(np_array_hfin)
            #np_array_X = numpy.array(X_list)
            
            
            myRaster_hmax = arcpy.NumPyArrayToRaster (np_array_hmax, arcpy.Point(222955.5000000000000000,6750269.5000000000000000), 3, 3)
            myRaster_hmax.save(r"C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\output_rasters\{}_hmax".format(path))
            
            myRaster_hfin = arcpy.NumPyArrayToRaster (np_array_hfin, arcpy.Point(222955.5000000000000000,6750269.5000000000000000), 3, 3)
            myRaster_hfin.save(r"C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\output_rasters\{}_hfin".format(path))
            
            #myRaster_X = arcpy.NumPyArrayToRaster (np_array_X, arcpy.Point(222955.5000000000000000,6750269.5000000000000000), 3, 3)
            #myRaster_X.save(r"C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\output_rasters\.{}_X.tiff".format(path))
            
            list_raster_hmax.append(myRaster_hmax)
        
        

sumRas = CellStatistics(list_raster_hmax, "SUM", "NODATA", "SINGLE_BAND")        
sumRas.save(r"C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\output_rasters\sum_hmax")

meanRas = CellStatistics(list_raster_hmax, "MEAN", "NODATA", "SINGLE_BAND")        
meanRas.save(r"C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\output_rasters\mean_hmax")

maxRas = CellStatistics(list_raster_hmax, "MAXIMUM", "NODATA", "SINGLE_BAND")        
maxRas.save(r"C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\output_rasters\max_hmax")

medianRas = CellStatistics(list_raster_hmax, "MEDIAN", "NODATA", "SINGLE_BAND")        
medianRas.save(r"C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\output_rasters\median_hmax")

STDRas = CellStatistics(list_raster_hmax, "STD", "NODATA", "SINGLE_BAND")        
STDRas.save(r"C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\output_rasters\STD_hmax")

## matfile is dictionary (in Python terms)
## one of of keys in this dictionary will be your XYZ variables
## For example, type the following tho see keys
## Now you can export the values to any format you want.
## I think ascii format would be easiest if it is a raster file
## I can write a short python routine if you post (or send) the mat file









#print(np_array)
#for e in con_list:
#    print(len(e))
#print(len(con_list))


#print(annots)



#import numpy as np
#import h5py
#f = h5py.File(r'C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\Data\S_1\IN_OUT\OUTPUT\hfin_land.mat','r')
#data = f.get('data/hfin_land')
#data = np.array(data) # For converting to a NumPy array
