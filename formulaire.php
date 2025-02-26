<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/formulaire.css">
    <title>Réservation</title>
</head>
<body>
    <header>
        <div>
            <p>LOGO</p>
        </div>
        <nav>
            <ul>
                <li><a href="index.php">Accueil</a></li>
                <li><a href="infos_pratiques.php">Infos pratiques</a></li>
                <li><a href="formulaire.php">Réserver un billet</a></li>
                <li>FR/EN</li>
            </ul>
        </nav>
    </header>

        <section>
        <h1>Acheter un billet</h1>

        <!-- Dates & horaires  -->
        <form action="">
            <div class="container">
                <div class="bigMarginBottom">
                    <h2 class="tinyMarginBottom">Dates & horaires</h2>
                    <p class="minuscule tinyMarginTop">Les champs suivis d'un <span class="red">*</span> sont obligatoires.</p>
                </div>

                <div class="bigMarginBottom">
                    <label for="date">Choisissez une date <span class="red">*</span></label><br>
                    <input type="date" id="date" class="date" required><br>
                </div>

                <div class="bigMarginBottom">
                    <label>Choisissez un horaire <span class="red">*</span></label>
                    <div class="buttons">
                        <button>10:00</button>
                        <button>11:00</button>
                        <button>12:00</button>
                        <button>14:00</button>
                        <button>15:00</button>
                        <button>16:00</button>
                        <button>17:00</button>
                        <button>18:00</button>
                    </div>
                </div>
                
                <button class="validate">Valider</button>
            </div>
        </form>

        <div class="ticket">
            <div class="pointilles">
                <img src="images/img_ticket.jpg" alt="">
                <div class="ticketInfos">
                    <p>Lorem ipsum dolor sit</p>
                    <p>Mode d'obtention : e-ticket (gratuit)</p>
                </div>
            </div>
            

        </div>



        <!-- Nombre de billets -->
        <form action="">

        </form>



        <!-- Coordonnées -->
        <form action="">

        </form>


        </section>

   <?php require_once('footer.php'); ?>

</body>
</html>


