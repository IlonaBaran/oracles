BDD Simulations num�riques G�vres, 17/02/2022, D. Idier
-------------------------------------------------------
- fichier .xlsx : fichier utilis� pour le suivi des simulations num�riques (pas forc�ment utile pour ORACLES, si ce n'est pour identifier quels sc�narios correspondent � des �v�nements historiques)
- fichier .nc : contient les longitudes et latitudes correspondant aux matrices r�sultats hmax. Coordonn�es en Lambert93.
- Zone_extract : contient geotiff (Zone_Extract_Flood_v3.tif) o� on d�finit la zone � terre d'int�r�t (*). Lambert 93.
- Data : contient les donn�es d'entr�es et sorties pour chaque scenario S_"i", suivant la structure suivante : 
	- S_"i"/IN_OUT/INPUT : contient :
		- X.dat : fichier pour retrouver � quel �v�nement correspond le sc�nario
		- X.mat et Xt.dat : series temporelles des donn�es X (sur 6h, centr� sur la pleine-mer)
	- S_"i"/IN_OUT/OUTPUT : contient :
		- le fichier hmax_land.mat (hauteur d'eau maximal � terre). Ce fichier est une matrice obtenue de la mani�re suivante : 
			- extraction des hauteurs d'eau maximales en chaque pixel au cours des 6h de simulation -> grille de hmax, mais du coup, contenant aussi des valeurs en mer.
			- filtre avec le fichier Zone_Extract_Flood_v3.tif -> les pixels en dehors de la zone d'int�r�t � terre prennent une valeur de 0. 
		- nb: j'ai mis aussi le fichier hfin_land (hauteur d'eau final � terre en fin de simulation), mais a priori pas utile dans ORACLES

	 