from scipy.io import loadmat
import numpy
import os
#import subprocess
import processing
from osgeo import gdal, osr


dir_path = 'D:\ENSG\PROJET_ORACLES\oracles_data\donnees\BDD_Simu_2022_02_17\Data'
output_path='D:\ENSG\PROJET_ORACLES\oracles_data\donnees\BDD_Simu_2022_02_17\output_rasters'
# =============================================================================
# output_path2='D:\ENSG\PROJET_ORACLES\oracles_data\donnees\BDD_Simu_2022_02_17\output_rasters_2'
# 
# shapefile = 'D:/ENSG/PROJET_ORACLES/oracles_data/donnees/BDD_Simu_2022_02_17/Zone_Extract/zone_extract_gavres.shp'
# driver = ogr.GetDriverByName('ESRI Shapefile')
# dataSource = driver.Open(shapefile, 0)
# layer = dataSource.GetLayer()
# 
# # Define output bounds as (xmin, ymin, xmax, ymax)
# mask_extent = layer.GetExtent()
# =============================================================================

list_raster_hmax = []

#Function to create a raster from an array, using GDAL
def create_raster(input_array,raster_path):
    driver = gdal.GetDriverByName("GTiff") #To use the tiff format
                  
    output_raster = driver.Create(raster_path, width, height, 1, gdal.GDT_Float32) #Creating the raster canvas so we can write the information on it later
    geo_transform = [origin_x, pixel_size, 0 , origin_y , 0 , pixel_size]
    output_raster.SetGeoTransform(geo_transform)
    
    #Setting the projection to georeference the raster
    srs = osr.SpatialReference() 
    srs.ImportFromEPSG(2154)
    output_raster.SetProjection(srs.ExportToWkt())
    
    #Writing on 1 band to create a b&w raster
    output_band = output_raster.GetRasterBand(1)
    output_band.WriteArray(input_array)
    output_band.FlushCache()
    
    #Closing the raster
    output_raster = None
                  
                  
                  
for path in os.listdir(dir_path):
    # check if current path is a file
    
    if os.path.isfile(os.path.join(dir_path, path)):
        pass
    else:
        if path != 'S_1448':
            print(path)
            matfile_hmax = loadmat(dir_path+'\{0}\IN_OUT\OUTPUT\hmax_land.mat'.format(path))
            matfile_hfin = loadmat(dir_path+'\{0}\IN_OUT\OUTPUT\hfin_land.mat'.format(path))
            #matfile_X = loadmat(r'C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\Data\{0}\IN_OUT\INPUT\X.mat'.format(path))
            
            #print(matfile_X)
            
            hmax_list = [[element for element in upperElement] for upperElement in matfile_hmax['hmax_land']]
            hfin_list = [[element for element in upperElement] for upperElement in matfile_hfin['hfin_land']]
            #X_list = [[element for element in upperElement] for upperElement in matfile_X['X_land']]
            
            np_array_hmax = numpy.array(hmax_list).astype('float64')
            #np_array_hmax = numpy.flipud(np_array_hmax).astype('float64')
            
            np_array_hfin = numpy.array(hfin_list).astype('float64')
            #np_array_hfin = numpy.flipud(np_array_hfin).astype('float64')
            
            #np_array_X = numpy.array(X_list)
            
            #Creating raster from arrays using rasterio
            #Defining georeferencing parameters
            pixel_size = 3
            height, width = np_array_hmax.shape
            origin_x = (222955.5000000000000000)  # Bottom left x-coordinate
            origin_y = (6750269.5000000000000000)  # Bottom left y-coordinate
                    
    
            #Creating folder for this specific scenario
            outpath = os.path.join(output_path,path)
            os.mkdir(outpath)
            
# =============================================================================
#             outpath2 = os.path.join(output_path2,path)
#             os.mkdir(outpath2)
# =============================================================================

            # Write hmax data to TIFF file
            myRaster_hmax = create_raster(np_array_hmax,outpath + "\{}_hmax".format(path)+".tif")
            
#            # Write hfin data to TIFF file
            myRaster_hfin = create_raster(np_array_hfin,outpath+ "\{}_hfin".format(path)+".tif")
            
# =============================================================================
#             input_clip_hmax = outpath+ "\{}_hmax".format(path)+".tif"
#             output_clip_hmax = outpath2+ "\{}_hmax".format(path)+".tif"
# 
#             
#             input_clip_hfin = outpath+ "\{}_hfin".format(path)+".tif"
#             output_clip_hfin = outpath2+ "\{}_hmax".format(path)+".tif"
#             
#             # set the command as a list of strings
#             command_max = ['gdalwarp', '-overwrite', '-of', 'GTiff', '-cutline', shapefile, '-cl', 'zone_extract_gavres', '-crop_to_cutline', input_clip_hmax, output_clip_hmax]
#             
#             command_fin = ['gdalwarp', '-overwrite', '-of', 'GTiff', '-cutline', shapefile, '-cl', 'zone_extract_gavres', '-crop_to_cutline', input_clip_hfin, output_clip_hfin]
#             
#             # run the command
#             subprocess.run(command_max, check=True)
#             subprocess.run(command_fin, check=True)
# 
# =============================================================================



            
#            #myRaster_X = arcpy.NumPyArrayToRaster (np_array_X, arcpy.Point(222955.5000000000000000,6750269.5000000000000000), 3, 3)
#            #myRaster_X.save(r"C:\Users\jgautier\Desktop\oracles\data\5_DONNEES\BDD_RISCOPE\BDD_Simu_2022_02_17\output_rasters\.{}_X.tiff".format(path))
            


             #Adding hmax rasters to a list
            list_raster_hmax.append(outpath + "\{}_hmax".format(path)+".tif")
             
 #Creating Raster statistics
 #Sum
processing.run("native:cellstatistics",
                {'IGNORE_NODATA' : False, 'INPUT' : list_raster_hmax, 'OUTPUT' : output_path + "\sum_hmax.tif", 'OUTPUT_NODATA_VALUE' : 0, 'REFERENCE_LAYER' : outpath + "\{}_hmax".format(path)+".tif", 'STATISTIC' : 0})
 #Mean
processing.run("native:cellstatistics", 
                {'IGNORE_NODATA' : False, 'INPUT' : list_raster_hmax, 'OUTPUT' : output_path + "\mean_hmax.tif", 'OUTPUT_NODATA_VALUE' : 0, 'REFERENCE_LAYER' : outpath + "\{}_hmax".format(path)+".tif", 'STATISTIC' : 2})
 #Max
processing.run("native:cellstatistics", 
                {'IGNORE_NODATA' : False, 'INPUT' : list_raster_hmax, 'OUTPUT' : output_path + "\max_hmax.tif", 'OUTPUT_NODATA_VALUE' : 0, 'REFERENCE_LAYER' : outpath + "\{}_hmax".format(path)+".tif", 'STATISTIC' : 7})
 #Median
processing.run("native:cellstatistics",
                {'IGNORE_NODATA' : False, 'INPUT' : list_raster_hmax, 'OUTPUT' : output_path + "\median_hmax.tif", 'OUTPUT_NODATA_VALUE' : 0, 'REFERENCE_LAYER' : outpath + "\{}_hmax".format(path)+".tif", 'STATISTIC' : 3})
 #STD
processing.run("native:cellstatistics", 
               {'IGNORE_NODATA' : False, 'INPUT' : list_raster_hmax, 'OUTPUT' : output_path + "\STD_hmax.tif", 'OUTPUT_NODATA_VALUE' : 0, 'REFERENCE_LAYER' : outpath + "\{}_hmax".format(path)+".tif", 'STATISTIC' : 4})
 
