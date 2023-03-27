BDD Simulations numériques Gâvres, 17/02/2022, D. Idier
-------------------------------------------------------
- fichier .xlsx : fichier utilisé pour le suivi des simulations numériques (pas forcément utile pour ORACLES, si ce n'est pour identifier quels scénarios correspondent à des évènements historiques)
- fichier .nc : contient les longitudes et latitudes correspondant aux matrices résultats hmax. Coordonnées en Lambert93.
- Zone_extract : contient geotiff (Zone_Extract_Flood_v3.tif) où on définit la zone à terre d'intérêt (*). Lambert 93.
- Data : contient les données d'entrées et sorties pour chaque scenario S_"i", suivant la structure suivante : 
	- S_"i"/IN_OUT/INPUT : contient :
		- X.dat : fichier pour retrouver à quel évènement correspond le scénario
		- X.mat et Xt.dat : series temporelles des données X (sur 6h, centré sur la pleine-mer)
	- S_"i"/IN_OUT/OUTPUT : contient :
		- le fichier hmax_land.mat (hauteur d'eau maximal à terre). Ce fichier est une matrice obtenue de la manière suivante : 
			- extraction des hauteurs d'eau maximales en chaque pixel au cours des 6h de simulation -> grille de hmax, mais du coup, contenant aussi des valeurs en mer.
			- filtre avec le fichier Zone_Extract_Flood_v3.tif -> les pixels en dehors de la zone d'intérêt à terre prennent une valeur de 0. 
		- nb: j'ai mis aussi le fichier hfin_land (hauteur d'eau final à terre en fin de simulation), mais a priori pas utile dans ORACLES

	 