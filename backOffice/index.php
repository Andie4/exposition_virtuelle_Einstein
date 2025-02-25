<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./styles/nav.css"> 
    <script src="./scripts/nav.js" defer></script> 
    <link rel="stylesheet" href="./styles/index_BO.css">
    <!-- <link rel="stylesheet" href="./styles/nav_admin.css"> -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="scripts/index_BO.js" defer></script>


</head>
<body>

    <h1>Tableau de bord</h1>
    <section class="center">
        <div class="blocInfos">
            <div class="grid">
                <div class="dataSite color1 colL1">
                    <p class="grand">15</p><br>
                    <p>Réservations aujourd’hui</p>
                </div>
                <div class="dataSite color2 colL2">
                    <p class="grand">15</p><br>
                    <p>Réservations au total</p>
                </div>
                <div class="dataSite color3 colR1">
                    <p class="grand">15</p><br>
                    <p>visite en cours</p>
                </div>
                <div class="colR2">
                    <p class="linkSite color4"><a href="">Site de réservation</a></p>
                    <p class="linkSite color4"><a href="">Exposition virtuelle</a></p>
                </div>
    
            </div>
        </div>

        <div class="multiColumn">
            <div class="myChart1">
                <h2>Visite par jour de la semaine</h2>
                <div data class="chart myChart1">
                    <canvas id="myChart"></canvas>
                </div>
            </div>
    
        
        
            <div class="myChart2">
                <h2>Visite par tranche horaire</h2>
                <div data class="chart ">
                    <canvas id="myChart2" width="400" height="400"></canvas>
                </div>
            </div>
    
        
        
            <div class="myChart3">
                <h2>Billets par tarifs</h2>
                <div data class="chart myChart3">
                    <canvas id="myChart3" width="400" height="400"></canvas>
                </div>
            </div>
        
        
            <div class="myChart4">
                <h2>Nombre de place par réservations</h2>
                <div  data class="chart myChart4">
                    <canvas id="myChart4" width="400" height="400"></canvas>    
                </div>
            </div>

        </div>
    
    </section>

    
    
</body>
</html>